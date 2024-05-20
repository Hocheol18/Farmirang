package com.cg.farmirang.design.feature.design.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "design")
@Getter
public class FarmCoordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coordinate_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id")
    private Design design;

    private int col;
    private int row;
    private int sequence;

    @Builder
    public FarmCoordinate(Design design, int col, int row, int sequence) {
        this.design = design;
        this.col = col;
        this.row = row;
        this.sequence = sequence;
    }

    public void updateDesign(Design design) {
        this.design=design;
    }
}
