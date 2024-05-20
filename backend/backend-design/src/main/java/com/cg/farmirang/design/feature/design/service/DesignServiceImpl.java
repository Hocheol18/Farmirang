package com.cg.farmirang.design.feature.design.service;

import com.cg.farmirang.design.feature.design.dto.response.CustomDesignCreateResponseDto;
import com.cg.farmirang.design.feature.design.dto.*;
import com.cg.farmirang.design.feature.design.dto.request.*;
import com.cg.farmirang.design.feature.design.dto.response.*;
import com.cg.farmirang.design.feature.design.entity.*;
import com.cg.farmirang.design.feature.design.repository.*;
import com.cg.farmirang.design.global.common.code.ErrorCode;
import com.cg.farmirang.design.global.exception.BusinessExceptionHandler;
import com.google.gson.Gson;
import jakarta.persistence.EntityManager;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DesignServiceImpl implements DesignService {

    private final EntityManager em;
    private final DesignRepository designRepository;
    private final ArrangementRepository arrangementRepository;
    private final CropRepository cropRepository;
    private final CropSelectionRepository cropSelectionRepository;

    /**
     * 빈 밭 생성
     *
     * @param memberId
     * @param request
     * @return
     */
    @Override
    @Transactional
    public EmptyFarmCreateResponseDto insertEmptyFarm(@NotBlank Integer memberId, EmptyFarmCreateRequestDto request) {

        Member reference = em.getReference(Member.class, memberId);

        // DB에 design 저장
        Design design = Design.builder()
                .member(reference)
                .totalArea(request.getArea())
                .startMonth(request.getStartMonth())
                .ridgeWidth(request.getRidgeWidth())
                .furrowWidth(request.getFurrowWidth())
                .isVertical(request.getIsVertical())
                .build();

        Design savedDesign = designRepository.save(design);

        // 배열 생성
        List<FarmCoordinateDto> coordinates = request.getCoordinates();
        Collections.sort(coordinates);

        int minX = 50;
        int maxX = 0;
        int minY = 50;
        int maxY = 0;

        // X, Y 최대 최소 구하기
        for (FarmCoordinateDto coordinate : coordinates) {
            minX = Math.min(minX, coordinate.getColumn());
            maxX = Math.max(maxX, coordinate.getColumn());
            minY = Math.min(minY, coordinate.getRow());
            maxY = Math.max(maxY, coordinate.getRow());
        }

        int row = maxY - minY;
        int column = maxX - minX;

        char[][] farm = new char[row][column];
        Polygon polygon = new Polygon();

        // 좌표값에서 최소값 빼고 좌표 DB에 저장
        saveFarmCoordinate(coordinates, minX, minY, polygon, savedDesign);
        // 이랑 배열 생성
        RecommendedDesignInfoDto designInfo = savedDesign.getDesignInfo();

        Integer furrowWidth = designInfo.getFurrowWidth();
        Integer ridgeWidth = designInfo.getRidgeWidth();
        int farmWidthCell = farm[0].length;
        int farmHeightCell = farm.length;
        List<FarmCoordinate> farmCoordinates = savedDesign.getFarmCoordinates();

        // 두둑인지 고랑인지 확인 후 R(두둑), E(두둑줄이지만 범위에 벗어나서 빈 곳), F(고랑) 표시
        farm = checkRidgeAndFurrow(farm, polygon, farmWidthCell, farmHeightCell, ridgeWidth / 10, furrowWidth / 10, designInfo.getIsVertical(), farmCoordinates);
        // Boolean 2차원 배열로 변환
        boolean[][] booleanArrangement = getBooleanArrangement(farm.length, farm[0].length, farm);

        // 몽고DB에 배열 저장
        Arrangement arrangement = arrangementRepository.save(
                Arrangement.builder()
                        .arrangement(farm)
                        .designArrangement(new int[farm.length][farm[0].length])
                        .booleanFarmArrangement(booleanArrangement)
                        .build()
        );

        // design에 arrangementId과 두둑 넓이 추가
        Gson gson = new Gson();
        String jsonFarm = gson.toJson(arrangement.getArrangement());

        Integer count = (int) jsonFarm.chars().filter(ch -> ch == 'R').count();
        savedDesign.updateArrangementIdAndRidgeArea(arrangement.getId(), count * 100);
        designRepository.save(savedDesign);

        return EmptyFarmCreateResponseDto.builder()
                .designId(savedDesign.getId())
                .farm(arrangement.getBooleanFarmArrangement())
                .designArray(arrangement.getDesignArrangement())
                .build();
    }

    /**
     * 좌표값에서 최소값 빼고 FarmCoordinate에 저장
     */
    private void saveFarmCoordinate(List<FarmCoordinateDto> coordinates, int minX, int minY, Polygon polygon, Design savedDesign) {
        for (FarmCoordinateDto coordinate : coordinates) {
            int c = coordinate.getColumn() - minX;
            int r = coordinate.getRow() - minY;

            polygon.addPoint(c, r);
            FarmCoordinate farmCoordinate = FarmCoordinate.builder()
                    .design(savedDesign)
                    .col(c)
                    .row(r)
                    .sequence(coordinate.getSequence())
                    .build();
            savedDesign.addFarmCoordinate(farmCoordinate);
        }
        designRepository.save(savedDesign);
    }


    /**
     * 이랑, 고랑, 그리고 빈칸 체크
     */
    private char[][] checkRidgeAndFurrow(char[][] farm, Polygon polygon, int farmWidthCell, int farmHeightCell, int ridgeLengthCell, int furrowLengthCell, Boolean isVertical, List<FarmCoordinate> farmCoordinates) {

        int widthCell = isVertical ? farmHeightCell : farmWidthCell; // 세로면 두둑의 가로는 밭의 세로
        int heightCell = isVertical ? farmWidthCell : farmHeightCell;
        int C = isVertical ? farmHeightCell : farmWidthCell;
        int R = isVertical ? farmWidthCell : farmHeightCell;
        int limit = isVertical ? farmWidthCell : farmHeightCell; // 가장 밑

        int check = 0; // 각 줄 체크
        int currentCount = 0; // 두둑, 고랑 체크
        boolean isRidge = true; // 기본으로는 두둑부터 시작
        while (check < limit) {
            for (int i = 0; i < R && check < limit; i++) {
                for (int j = 0; j < C; j++) {

                    // row, col 지정
                    int row, col;
                    if (isVertical) {
                        row = j;
                        col = i;
                    } else {
                        row = i;
                        col = j;
                    }
                    if (isRidge) {
                        if (isRidgeOrEmpty(row, col, polygon, R, C, farmCoordinates)) {
                            farm[row][col] = 'R';
                        } else {
                            farm[row][col] = 'E';
                        }
                    } else {
                        farm[row][col] = 'F';
                    }
                }
                check++;
                currentCount++;

                if (isRidge && currentCount == ridgeLengthCell) {
                    currentCount = 0;
                    isRidge = false;
                } else if (!isRidge && currentCount == furrowLengthCell) {
                    currentCount = 0;
                    isRidge = true;
                }


            }
        }

        return farm;
    }

    /**
     * 도형 안에 있는지 확인
     */
    private boolean isRidgeOrEmpty(int row, int col, Polygon polygon, int height, int width, List<FarmCoordinate> farmCoordinates) {
        // 네군데 시계방향 확인
        int[] changeX = {0, 1, 1, 0};
        int[] changeY = {0, 0, 1, 1};

        for (int i = 0; i < 4; i++) {
            int newX = col + changeX[i];
            int newY = row + changeY[i];

            if ((0 <= newX && newX <= width) && (0 <= newY && newY < height) && !polygon.contains(newX, newY) && !isPointInPolygon(newX, newY, farmCoordinates)) {
                return false;

            }
        }
        return true;
    }

    /**
     * 꼭지점에 있는지 확인
     */
    private boolean isPointInPolygon(int newX, int newY, List<FarmCoordinate> farmCoordinates) {
        for (FarmCoordinate farmCoordinate : farmCoordinates) {
            if (farmCoordinate.getCol() == newX && farmCoordinate.getRow() == newY) return true;
        }
        return false;
    }

    /**
     * 작물 리스트 조회 - 심는 시기에 맞는 작물 우선 정렬
     *
     * @param memberId
     * @param designId
     * @return
     */
    @Override
    public CropGetResponseDto selectCropList(@NotBlank Integer memberId, Long designId) {
        Design design = getDesign(designId);
        checkMember(memberId, design);
        // 시작 달이 추천 파종시기인 작물부터 정렬
        List<Object> list = getCropInfoListAndRidgeAreaLength(design);
        return CropGetResponseDto.builder()
                .cropList((List<CropDataDto>) list.get(0))
                .totalRidgeArea((Integer) list.get(1))
                .ridgeWidth((Integer) list.get(2))
                .ridgeHeight((Integer) list.get(3))
                .build();
    }

    /**
     * 작물 정보 리스트, 전체 넓이, 이랑 너비 불러오기
     */
    private List<Object> getCropInfoListAndRidgeAreaLength(Design design) {
        List<CropDataDto> list = getCropDataDtoList(design);

        List<Object> returnList = new ArrayList<>();

        Arrangement selectedArrangement = getSelectedArrangement(design);
        char[][] arrangement = selectedArrangement.getArrangement();
        Integer ridgeWidth = 0;
        Integer ridgeHeight = 0;

        // 세로밭일 때
        if (design.getIsVertical()) {
            ridgeWidth = arrangement.length * 10;
        } else {
            ridgeWidth = arrangement[0].length * 10;
        }
        ridgeHeight = design.getRidgeWidth();

        returnList.add(list);
        returnList.add(design.getRidgeArea());
        returnList.add(ridgeWidth);
        returnList.add(ridgeHeight);

        return returnList;
    }

    private List<CropDataDto> getCropDataDtoList(Design design) {
        List<Object[]> results = em.createQuery("SELECT t.id,t.name, " +
                        "CASE WHEN :substring IN (SELECT UNNEST(FUNCTION('string_to_array', t.sowingTime, ',')) AS st) THEN true ELSE false END AS isRecommended, " +
                        "t.ridgeSpacing, t.cropSpacing,t.ridgeSpacing * t.cropSpacing AS area " +
                        "FROM Crop t " +
                        "ORDER BY " +
                        "CASE WHEN :substring IN (SELECT UNNEST(FUNCTION('string_to_array', t.sowingTime, ',')) AS st) THEN 0 ELSE 1 END, " +
                        "t.sowingTime")
                .setParameter("substring", design.getStartMonth().toString())
                .getResultList();

        List<CropDataDto> list = new ArrayList<>();

        for (Object[] result : results) {
            CropDataDto cropDto = CropDataDto.builder()
                    .cropId((Integer) result[0])
                    .name((String) result[1])
                    .isRecommended((boolean) result[2])
                    .cropLengthAndAreaDto(CropLengthAndAreaDto.builder()
                            .cropHeight((Integer) result[3])
                            .cropWidth((Integer) result[4])
                            .area((Integer) result[5])
                            .build()
                    )
                    .build();
            list.add(cropDto);
        }
        return list;
    }

    /**
     * 디자인 추천 생성
     *
     * @param memberId
     * @param designId
     * @param request
     * @return
     */
    @Override
    @Transactional
    public RecommendedDesignCreateResponseDto insertRecommendedDesign(@NotBlank Integer memberId, Long designId, @NotBlank RecommendedDesignCreateRequestDto request) {
        Design design = getDesign(designId);
        checkMember(memberId, design);
        // 밭 불러오기
        Arrangement selectedArrangement = getSelectedArrangement(design);
        List<Integer> cropIds = new ArrayList<>();
        List<CropIdAndQuantityAndPriorityDto> cropList = request.getCropList();

        // 선택작물 DB 저장
        for (CropIdAndQuantityAndPriorityDto selectedCrop : cropList) {
            cropIds.add(selectedCrop.getCropId());
            Crop crop = cropRepository.findById(selectedCrop.getCropId()).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.CROP_NOT_FOUND));
            CropSelection cropSelection = CropSelection.builder()
                    .crop(crop)
                    .quantity(selectedCrop.getQuantity())
                    .priority(selectedCrop.getPriority())
                    .design(design)
                    .build();

            design.addCropSelection(cropSelection);
        }

        designRepository.save(design);
        // 두둑에서 알고리즘으로 배치하기
        RecommendedDesignCreateResponseDto response = createDesign(design);

        // 밭 좌표 추가
        List<FarmCoordinateDto> farmCoordinateList = new ArrayList<>();
        for (FarmCoordinate farmCoordinate : design.getFarmCoordinates()) {
            farmCoordinateList.add(FarmCoordinateDto.toDto(farmCoordinate));
        }
        response.setFarmCoordinateList(farmCoordinateList);

        // 몽고디비에 다시 업데이트
        selectedArrangement.setDesignArrangement(response.getDesignArray());
        selectedArrangement.setCropNumberAndCropIdDtoList(response.getCropNumberAndCropIdDtoList());
        arrangementRepository.save(selectedArrangement);

        return response;
    }

    /**
     * 디자인 추천 배치
     */
    private RecommendedDesignCreateResponseDto createDesign(Design design) {
        Long designId = design.getId();
        // 작물 길이, 그리고 1m 기준으로 그룹 생성 후 연작 가능한 것, 파종 시기 있는 것, 우선순위 순으로 나열
        List<CropSelectionOrderedByCropDto> cropList = cropSelectionRepository.findByCropHeightGreaterThanEqual100(designId, design.getStartMonth().toString());
        // 1m 미만
        cropList.addAll(cropSelectionRepository.findByCropHeightLesserThan100(designId, design.getStartMonth().toString()));

        char[][] arrangement = getSelectedArrangement(design).getArrangement();

        Boolean isVertical = design.getIsVertical();

        // 밭 가로, 세로
        int farmHeight = arrangement.length; // row 개수
        int farmWidth = arrangement[0].length; // column 개수

        int[][] cropArray = new int[farmHeight][farmWidth];
        List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList = new ArrayList<>();

        // 방향에 맞는 이랑의 가로, 세로
        int number = 1;
        // 작물을 꺼냄
        for (CropSelectionOrderedByCropDto crop : cropList) {
            Integer quantity = crop.getQuantity();
            Integer cropWidth = crop.getCropSpacing() / 10;
            Integer cropHeight = crop.getRidgeSpacing() / 10;

            int height, width;
            // 작물 시작 부분의 범위 정하기
            if (isVertical) {
                //세로밭인 경우 세로의 범위는 밭의 가로에서 작물의 세로를 뺀 곳까지
                height = farmWidth - cropHeight; // column 범위 제한
                width = farmHeight - cropWidth; // row 범위 제한
            } else {
                height = farmHeight - cropHeight; // row 범위 제한
                width = farmWidth - cropWidth; // column 범위 제한
            }
            // 좌표 이동
            outer:
            for (int i = 0; i <= height; i++) { // 가로일 땐 col, 세로일 땐 row
                for (int j = 0; j <= width; j++) {
                    // 작물 개수만큼 다 심거나 다 안 줄어도 좌표가 끝으로 갔으면 break
                    if (quantity <= 0) break outer;

                    int row = isVertical ? j : i;
                    int col = isVertical ? i : j;

                    if (canPlantCrop(arrangement, farmWidth, farmHeight, cropArray, cropWidth, cropHeight, col, row, isVertical)) {
                        plantCrop(crop, cropHeight, cropWidth, col, row, cropArray, number, cropNumberAndCropIdDtoList, isVertical);
                        number++;
                        quantity--;
                    }

                }

            }
        }

        return RecommendedDesignCreateResponseDto.builder()
                .designArray(cropArray)
                .cropNumberAndCropIdDtoList(cropNumberAndCropIdDtoList)
                .build();
    }

    /**
     * 작물 배치
     */
    private static void plantCrop(CropSelectionOrderedByCropDto crop, Integer cropHeight, Integer cropWidth, int col, int row, int[][] cropArray, int number, List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList, Boolean isVertical) {
        cropNumberAndCropIdDtoList.add(
                CropNumberAndCropIdDto.builder()
                        .cropId(crop.getCropId())
                        .number(number)
                        .build()
        );
        for (int addHeight = 0; addHeight < cropHeight; addHeight++) {
            for (int addWidth = 0; addWidth < cropWidth; addWidth++) {
                int r, c;
                if (isVertical) {
                    r = row + addWidth;
                    c = col + addHeight;
                } else {
                    r = row + addHeight;
                    c = col + addWidth;
                }
                cropArray[r][c] = number;
            }
        }
    }

    /**
     * 배치 가능한 지 확인
     */
    private boolean canPlantCrop(char[][] arrangement, int farmWidth, int farmHeight, int[][] cropArray, Integer cropWidth, Integer cropHeight, int col, int row, Boolean isVertical) {
        if (isVertical) {
            if (row + cropWidth >= farmHeight || col + cropHeight >= farmWidth) return false;
        } else {
            if (row + cropHeight >= farmHeight || col + cropWidth >= farmWidth) return false;
        }

        for (int addHeight = 0; addHeight < cropHeight; addHeight++) {
            for (int addWidth = 0; addWidth < cropWidth; addWidth++) {
                int r, c;
                if (isVertical) {
                    r = row + addWidth;
                    c = col + addHeight;
                } else {
                    r = row + addHeight;
                    c = col + addWidth;
                }

                if (arrangement[r][c] != 'R' || cropArray[r][c] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 유저 디자인 리스트 불러오기
     *
     * @param memberId
     * @return
     */
    @Override
    public DesignListResponseDto selectDesignList(@NotBlank Integer memberId) {
        List<DesignForListDto> list = new ArrayList<>();

        Optional<List<Design>> optionalDesignList = designRepository.findAllByMemberIdOrderByIsThumbnailDescCreateAtDesc(memberId);

        // 디자인 리스트 있는 경우만 추가
        if (optionalDesignList.isPresent()) {
            List<Design> designList = optionalDesignList.get();

            for (Design design : designList) {
                Arrangement selectedArrangement = getSelectedArrangement(design);
                ifBooleanArrangementNullThenGetAndSave(selectedArrangement);
                list.add(DesignForListDto.toDto(design, selectedArrangement));
            }
        }

        return DesignListResponseDto.builder().designList(list).build();
    }

    /**
     * boolean[][] 없으면 구한 후 저장
     */
    private void ifBooleanArrangementNullThenGetAndSave(Arrangement selectedArrangement) {
        if (selectedArrangement.getBooleanFarmArrangement() == null) {
            char[][] arrangement = selectedArrangement.getArrangement();
            boolean[][] booleanArrangement = getBooleanArrangement(arrangement.length, arrangement[0].length, arrangement);
            selectedArrangement.setBooleanFarmArrangement(booleanArrangement);
            arrangementRepository.save(selectedArrangement);
        }
    }

    /**
     * 디자인 상세보기
     *
     * @param memberId
     * @param designId
     * @return
     */
    @Override
    public DesignDetailResponseDto selectDesign(@NotBlank Integer memberId, Long designId) {
        Design design = getDesign(designId);

        // 유효성 검사
        checkMember(memberId, design);
        Arrangement selectedArrangement = getSelectedArrangement(design);
        List<String> cropList = new ArrayList<>();

        List<CropSelection> cropSelections = design.getCropSelections();

        for (CropSelection cropSelection : cropSelections) {
            cropList.add(cropSelection.getCrop().getName());
        }
        ifBooleanArrangementNullThenGetAndSave(selectedArrangement);

        LocalDateTime savedTime = design.getModifiedAt();

        return DesignDetailResponseDto.toDto(selectedArrangement, design.getName(), savedTime, cropList);
    }

    /**
     * 디자인 이름, 배치 수정
     *
     * @param memberId
     * @param designId
     * @param request
     * @return
     */
    @Override
    @Transactional
    public Boolean updateDesign(@NotBlank Integer memberId, Long designId, DesignUpdateRequestDto request) {
        // 이름 수정
        Design design = getDesign(designId);
        checkMember(memberId, design);
        design.updateName(request.getName());

        // 배치, CropSelection 수정
        updateArrangementAndCropSelection(design, request.getDesignArray(), request.getCropNumberAndCropIdDtoList(), request.getCropIdAndQuantityDtoList());
        return true;
    }

    /**
     * 커스텀 디자인 추가
     *
     * @param memberId
     * @param designId
     * @param request
     * @return
     */
    @Override
    @Transactional
    public CustomDesignCreateResponseDto insertCustomDesign(@NotBlank Integer memberId, Long designId, CustomDesignCreateRequestDto request) {
        Design design = getDesign(designId);
        checkMember(memberId, design);

        Arrangement arrangement = updateArrangementAndCropSelection(design, request.getDesignArray(), request.getCropNumberAndCropIdDtoList(), request.getCropIdAndQuantityDtoList());
        ifBooleanArrangementNullThenGetAndSave(arrangement);

        return CustomDesignCreateResponseDto.builder()
                .designId(designId)
                .farm(arrangement.getBooleanFarmArrangement())
                .build();
    }

    /**
     * 작물 배치도, CropSelection 수정
     */
    private Arrangement updateArrangementAndCropSelection(Design design, int[][] designArrangement, List<CropNumberAndCropIdDto> cropNumberAndCropIdDtoList, List<CropIdAndQuantityDto> cropIdAndQuantityDtoList) {
        Arrangement selectedArrangement = getSelectedArrangement(design);
        selectedArrangement.setDesignArrangement(designArrangement);
        selectedArrangement.setCropNumberAndCropIdDtoList(cropNumberAndCropIdDtoList);

        // CropSelection 새로 추가
        getNewCropSelectionList(cropIdAndQuantityDtoList, design);
        try {
            Arrangement arrangement = arrangementRepository.save(selectedArrangement);
            return arrangement;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.INSERT_ERROR);
        }
    }

    /**
     * CropSelection 추가
     */
    private void getNewCropSelectionList(List<CropIdAndQuantityDto> list, Design design) {
        List<CropSelection> designCropSelectionList = design.getCropSelections();

        // 이미 CropSelection이 있을 때
        if (!designCropSelectionList.isEmpty()) {
            designCropSelectionList.clear();
            designRepository.save(design);
        }
        for (CropIdAndQuantityDto cropIdAndQuantityDto : list) {
            Crop crop = cropRepository.findById(cropIdAndQuantityDto.getCropId()).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.CROP_NOT_FOUND));
            designCropSelectionList.add(CropSelection.builder()
                    .design(design)
                    .crop(crop)
                    .quantity(cropIdAndQuantityDto.getQuantity())
                    .build());
        }
        try {
            designRepository.save(design);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.UPDATE_ERROR);
        }
    }

    /**
     * 디자인 삭제
     *
     * @param memberId
     * @param designId
     * @return
     */
    @Override
    @Transactional
    public Boolean deleteDesign(@NotBlank Integer memberId, Long designId) {
        Design design = getDesign(designId);
        checkMember(memberId, design);

        String arrangementId = design.getArrangementId();

        try {
            designRepository.delete(design);
            arrangementRepository.deleteById(arrangementId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.DELETE_ERROR);
        }

    }


    /**
     * 커스텀용 조회
     *
     * @param memberId
     * @param designId
     * @return
     */
    @Override
    public FarmForCustomGetResponseDto selectEmptyFarm(@NotBlank Integer memberId, Long designId) {
        Design design = getDesign(designId);
        checkMember(memberId, design);

        Arrangement selectedArrangement = getSelectedArrangement(design);
        char[][] arrangement = selectedArrangement.getArrangement();
        int R = arrangement.length;
        int C = arrangement[0].length;

        List<CropDataDto> cropList = getCropDataDtoList(design);
        return FarmForCustomGetResponseDto.builder()
                .cropList(cropList)
                .build();
    }

    /**
     * 디자인 이름 수정
     *
     * @param memberId
     * @param designId
     * @param request
     * @return
     */
    @Override
    @Transactional
    public Boolean updateDesignName(@NotBlank Integer memberId, Long designId, DesignNameUpdateRequestDto request) {
        Design design = getDesign(designId);
        checkMember(memberId, design);
        design.updateName(request.getName());
        try {
            designRepository.save(design);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.UPDATE_ERROR);
        }
    }

    /**
     * 대표 디자인 수정
     *
     * @param designId
     * @param memberId
     * @return
     */
    @Override
    @Transactional
    public Boolean updateThumbnailDesign(Long designId, @NotBlank Integer memberId) {
        Design design = getDesign(designId);

        // memberId로 유효성 검사
        checkMember(memberId, design);

        // 선택한 디자인 찾아오기
        Design newThumbnailDesign = designRepository.findByMemberIdAndId(memberId, designId)
                .orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.DESIGN_NOT_FOUND));
        // 기존 대표 디자인 찾기
        Optional<Design> oldThumbnailOptional = getThumbnailDesign(memberId);

        try {
            if (oldThumbnailOptional.isPresent()) {
                Design oldThumbnailDesign = oldThumbnailOptional.get();
                if (!oldThumbnailDesign.getId().equals(newThumbnailDesign.getId())) {
                    // 대표 이미지가 있는데 다른 걸 누른 경우는 그걸로 대표이미지 변경
                    oldThumbnailDesign.updateIsThumbnail();
                    newThumbnailDesign.updateIsThumbnail();
                } else {
                    // 이미 선택된 대표 이미지를 취소하는 경우
                    oldThumbnailDesign.updateIsThumbnail();
                }
            } else {
                // 대표 이미지가 없는 경우면 바로 대표이미지 설정을 하기
                newThumbnailDesign.updateIsThumbnail();
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessExceptionHandler(ErrorCode.UPDATE_DESIGN_THUMBNAIL_ERROR);
        }
    }


    /**
     * 대표 디자인 조회
     *
     * @param memberId
     * @return
     */
    @Override
    public ThumbnailDesignResponseDto selectThumbnailDesign(@NotNull Integer memberId) {
        Optional<Design> thumbnailDesign = getThumbnailDesign(memberId);
        if (thumbnailDesign.isEmpty()) return null;
        else {
            Design design = thumbnailDesign.get();
            Arrangement selectedArrangement = getSelectedArrangement(design);
            ifBooleanArrangementNullThenGetAndSave(selectedArrangement);
            return ThumbnailDesignResponseDto.builder()
                    .designArray(selectedArrangement.getDesignArrangement())
                    .booleanFarmArrangement(selectedArrangement.getBooleanFarmArrangement())
                    .cropNumberAndCropIdDtoList((selectedArrangement.getCropNumberAndCropIdDtoList() != null) ? selectedArrangement.getCropNumberAndCropIdDtoList() : new ArrayList<>())
                    .build();
        }
    }

    /**
     * 밭 배열을 boolean으로 변환
     */
    private boolean[][] getBooleanArrangement(int R, int C, char[][] arrangement) {
        boolean[][] booleanArrangement = new boolean[R][C];
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                switch (arrangement[i][j]) {
                    case 'R':
                        booleanArrangement[i][j] = true;
                        break;
                    default:
                        booleanArrangement[i][j] = false;
                        break;
                }
            }
        }
        return booleanArrangement;
    }

    /**
     * 유저 유효성 검사
     */
    private static void checkMember(Integer memberId, Design design) {
        if (!Objects.equals(memberId, design.getMember().getId())) {
            throw new BusinessExceptionHandler(ErrorCode.FORBIDDEN_MEMBER);
        }
    }

    /**
     * 대표 디자인 Optional 불러오기
     */
    private Optional<Design> getThumbnailDesign(@NotBlank Integer memberId) {
        return designRepository.findByMemberIdAndIsThumbnailTrue(memberId);
    }

    /**
     * 배치 불러오기
     */
    private Arrangement getSelectedArrangement(Design design) {
        return arrangementRepository.findById(design.getArrangementId()).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.ARRANGEMENT_NOT_FOUND));
    }

    /**
     * 디자인 불러오기
     */
    private Design getDesign(Long designId) {
        return designRepository.findById(designId).orElseThrow(() -> new BusinessExceptionHandler(ErrorCode.DESIGN_NOT_FOUND));
    }
}
