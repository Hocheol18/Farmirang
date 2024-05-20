package com.cg.farmirang.design.feature.design.entity;

import com.cg.farmirang.design.feature.design.dto.RecommendedDesignInfoDto;
import com.cg.farmirang.design.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Design extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "design_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "design", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE},
            orphanRemoval = true)
    private List<FarmCoordinate> farmCoordinates;

    private String arrangementId;
    private Integer totalArea;
    private Integer ridgeArea;

    @Column(columnDefinition = "varchar(255) default '제목 없음'")
    private String name;

    private Integer startMonth;
    private Integer ridgeWidth;
    private Integer furrowWidth;
    private Boolean isVertical;

    @ColumnDefault("false")
    private Boolean isThumbnail;

    @Getter
    @OneToMany(mappedBy = "design", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<CropSelection> cropSelections;

    @Builder
    public Design(Member member, String arrangementId, Integer totalArea, Integer ridgeArea, String name, Integer startMonth, Integer ridgeWidth, Integer furrowWidth, Boolean isVertical, Boolean isThumbnail) {
        this.member = member;
        this.arrangementId = arrangementId;
        this.totalArea = totalArea;
        this.ridgeArea = ridgeArea;
        this.name = "제목 없음";
        this.startMonth = startMonth;
        this.ridgeWidth = ridgeWidth;
        this.furrowWidth = furrowWidth;
        this.isVertical = isVertical;
        this.isThumbnail = false;
        this.farmCoordinates = new ArrayList<>();
        this.cropSelections = new ArrayList<>();
    }

    public void addFarmCoordinate(FarmCoordinate farmCoordinate) {
        this.farmCoordinates.add(farmCoordinate);
        farmCoordinate.updateDesign(this);
    }

    public void addCropSelection(CropSelection cropSelection) {
        this.cropSelections.add(cropSelection);
        cropSelection.updateDesign(this);
    }

    public RecommendedDesignInfoDto getDesignInfo() {
        return RecommendedDesignInfoDto.builder()
                .furrowWidth(this.furrowWidth)
                .ridgeWidth(this.ridgeWidth)
                .isVertical(this.isVertical)
                .startMonth(this.startMonth)
                .build();
    }

    public void updateArrangementIdAndRidgeArea(String arrangementId, Integer ridgeArea) {
        this.arrangementId = arrangementId;
        this.ridgeArea = ridgeArea;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateIsThumbnail() {
        this.isThumbnail = !isThumbnail;
    }
}
