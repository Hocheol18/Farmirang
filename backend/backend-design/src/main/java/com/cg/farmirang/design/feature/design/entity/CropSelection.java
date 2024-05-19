package com.cg.farmirang.design.feature.design.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CropSelection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_selection_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id")
    private Design design;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    private Crop crop;

    private Integer priority;
    private Integer quantity;

    @Builder
    public CropSelection(Design design, Crop crop, Integer priority, Integer quantity) {
        this.design = design;
        this.crop = crop;
        this.priority = priority;
        this.quantity = quantity;
    }

    public void updateDesign(Design design) {
        this.design=design;
    }
}
