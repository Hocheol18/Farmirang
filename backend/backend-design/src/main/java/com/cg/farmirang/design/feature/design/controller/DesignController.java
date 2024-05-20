package com.cg.farmirang.design.feature.design.controller;

import com.cg.farmirang.design.feature.design.dto.request.*;
import com.cg.farmirang.design.feature.design.dto.response.*;
import com.cg.farmirang.design.feature.design.service.DesignService;
import com.cg.farmirang.design.global.common.code.SuccessCode;
import com.cg.farmirang.design.global.common.response.ErrorResponse;
import com.cg.farmirang.design.global.common.response.SuccessResponse;
import com.cg.farmirang.design.global.common.service.JwtClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/designs")
@Tag(name = "design", description = "텃밭 디자인 API")
public class DesignController {

    private final DesignService designService;
    private final JwtClient jwtClient;

    /**
     * 빈 밭 생성
     *
     * @param request
     * @param accessToken
     * @return
     */
    @PostMapping
    @Operation(summary = "디자인용 텃밭 생성", description = "입력된 내용으로 디자인용 텃밭을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "디자인용 텃밭 생성을 성공하였습니다.", content = {@Content(schema = @Schema(implementation = EmptyFarmCreateResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "없는 배열입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> createEmptyFarm(@Validated @RequestBody EmptyFarmCreateRequestDto request, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result = jwtClient.validateAccessToken(accessToken);
        EmptyFarmCreateResponseDto response = designService.insertEmptyFarm(result.memberId(), request);

        return SuccessResponse.builder().data(response).status(SuccessCode.INSERT_SUCCESS).build();
    }

    /**
     * 작물 리스트 조회
     *
     * @param designId
     * @return
     */
    @GetMapping("/{designId}/crops")
    @Operation(summary = "작물 정보 조회", description = "작물 선택을 위해 작물 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "작물 정보 조회에 성공했습니다.", content = {@Content(array = @ArraySchema(schema = @Schema(implementation = CropGetResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> getCrops(@PathVariable("designId") Long designId, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result = jwtClient.validateAccessToken(accessToken);
        CropGetResponseDto response = designService.selectCropList(result.memberId(), designId);
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

    /**
     * 추천 디자인 생성 후 리턴
     *
     * @param designId
     * @param request
     * @return
     */
    @PostMapping("/{designId}/recommendations")
    @Operation(summary = "추천 디자인 생성", description = "입력된 내용으로 추천 디자인을 생성합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "추천 디자인 생성을 성공하였습니다.",
            content = {@Content(schema = @Schema(implementation = RecommendedDesignCreateResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> createRecommendedDesign(@PathVariable("designId") Long designId, @Validated @RequestBody RecommendedDesignCreateRequestDto request, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result = jwtClient.validateAccessToken(accessToken);
        RecommendedDesignCreateResponseDto response = designService.insertRecommendedDesign(result.memberId(), designId, request);

        return SuccessResponse.builder().data(response).status(SuccessCode.INSERT_SUCCESS).build();
    }

    /**
     * 빈 밭 조회
     *
     * @param designId
     * @return
     */
    @GetMapping("/{designId}/customs")
    @Operation(summary = "커스텀용 조회", description = "밭 커스텀을 위해 조회합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "커스텀용 조회에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = FarmForCustomGetResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> getFarm(@PathVariable("designId") Long designId, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        FarmForCustomGetResponseDto response = designService.selectEmptyFarm(result.memberId(), designId);
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

    /**
     * 커스텀 디자인 생성
     *
     * @param designId
     * @param request
     * @return
     */
    @PostMapping("/{designId}/customs")
    @Operation(summary = "커스텀 디자인 생성", description = "입력된 내용으로 커스텀 디자인을 생성합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "커스텀 디자인 생성을 성공하였습니다.",
            content = {@Content(schema = @Schema(implementation = CustomDesignCreateResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> createCustomDesign(@PathVariable("designId") Long designId, @Validated @RequestBody CustomDesignCreateRequestDto request, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        CustomDesignCreateResponseDto response = designService.insertCustomDesign(result.memberId(), designId, request);

        return SuccessResponse.builder().data(response).status(SuccessCode.INSERT_SUCCESS).build();
    }

    /**
     * 디자인 수정
     *
     * @param designId
     * @param request
     * @return
     */
    @PutMapping("/{designId}/updates")
    @Operation(summary = "디자인 수정", description = "디자인을 수정합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "디자인 수정에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = Boolean.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> updateDesign(@PathVariable("designId") Long designId, @Validated @RequestBody DesignUpdateRequestDto request, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        Boolean response = designService.updateDesign(result.memberId(), designId, request);
        return SuccessResponse.builder().data(response).status(SuccessCode.UPDATE_SUCCESS).build();
    }

    /**
     * 디자인 이름 수정
     *
     * @param designId
     * @param request
     * @return
     */
    @PutMapping("/{designId}/names")
    @Operation(summary = "디자인 이름 수정", description = "디자인 이름을 수정합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "디자인 이름 수정에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = Boolean.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> updateDesignName(@PathVariable("designId") Long designId, @Validated @RequestBody DesignNameUpdateRequestDto request, @Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        Boolean response = designService.updateDesignName(result.memberId(), designId, request);
        return SuccessResponse.builder().data(response).status(SuccessCode.UPDATE_SUCCESS).build();
    }

    /**
     * 디자인 리스트 조회
     *
     * @return
     */
    @GetMapping("/lists")
    @Operation(summary = "디자인 리스트 조회", description = "회원의 디자인 리스트를 조회합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "디자인 리스트 조회에 성공했습니다.",
            content = {@Content(array = @ArraySchema(schema = @Schema(implementation = DesignListResponseDto.class)))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> getDesignList(@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result=jwtClient.validateAccessToken(accessToken);
        DesignListResponseDto response=designService.selectDesignList(result.memberId());
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

    /**
     * 디자인 상세조회
     *
     * @param designId
     * @return
     */
    @GetMapping("/{designId}")
    @Operation(summary = "디자인 상세조회", description = "선택된 디자인을 상세조회합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "디자인 상세조회에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = DesignDetailResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> getDesignDetail(@PathVariable("designId") Long designId,@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        DesignDetailResponseDto response = designService.selectDesign(result.memberId(), designId);
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }

    /**
     * 디자인 삭제
     *
     * @param designId
     * @return
     */
    @DeleteMapping("/{designId}")
    @Operation(summary = "디자인 삭제", description = "선택된 디자인을 삭제합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "205", description = "디자인 수정에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = Boolean.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> deleteDesign(@PathVariable("designId") Long designId,@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
                var result=jwtClient.validateAccessToken(accessToken);
        Boolean response = designService.deleteDesign(result.memberId(), designId);
        return SuccessResponse.builder().data(response).status(SuccessCode.DELETE_SUCCESS).build();
    }

    /**
     * 대표 디자인 수정
     *
     * @param designId
     * @return
     */
    @PutMapping("/thumbnails/{designId}")
    @Operation(summary = "대표 디자인 수정", description = "대표 디자인을 수정합니다.")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "대표 디자인 수정에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = Boolean.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> updateThumbnailDesign(@PathVariable("designId") Long designId,@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result=jwtClient.validateAccessToken(accessToken);
        Boolean response = designService.updateThumbnailDesign(designId, result.memberId());
        return SuccessResponse.builder().data(response).status(SuccessCode.UPDATE_SUCCESS).build();
    }

    /**
     * 대표 디자인 조회
     *
     * @return
     */
    @GetMapping("/thumbnails")
    @Operation(summary = "대표 디자인 조회", description = "대표 디자인 조회")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "대표 디자인 조회에 성공했습니다.",
            content = {@Content(schema = @Schema(implementation = ThumbnailDesignResponseDto.class))}),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "서버 내부 문제입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    public SuccessResponse<?> selectThumbnailDesign(@Parameter(hidden = true) @RequestHeader("Authorization") String accessToken) {
        var result=jwtClient.validateAccessToken(accessToken);
        ThumbnailDesignResponseDto response=designService.selectThumbnailDesign(result.memberId());
        return SuccessResponse.builder().data(response).status(SuccessCode.SELECT_SUCCESS).build();
    }


}



