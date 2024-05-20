package com.cg.farmirang.design.feature.design.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCrop is a Querydsl query type for Crop
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCrop extends EntityPathBase<Crop> {

    private static final long serialVersionUID = -1955144765L;

    public static final QCrop crop = new QCrop("crop");

    public final StringPath companionPlant = createString("companionPlant");

    public final StringPath competitivePlant = createString("competitivePlant");

    public final NumberPath<Integer> cropSpacing = createNumber("cropSpacing", Integer.class);

    public final StringPath harvestingTime = createString("harvestingTime");

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath isRepeated = createBoolean("isRepeated");

    public final NumberPath<Double> maxFieldHumidity = createNumber("maxFieldHumidity", Double.class);

    public final NumberPath<Double> maxHumidity = createNumber("maxHumidity", Double.class);

    public final NumberPath<Double> maxTemperature = createNumber("maxTemperature", Double.class);

    public final NumberPath<Double> minFieldHumidity = createNumber("minFieldHumidity", Double.class);

    public final NumberPath<Double> minHumidity = createNumber("minHumidity", Double.class);

    public final NumberPath<Double> minTemperature = createNumber("minTemperature", Double.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> ridgeSpacing = createNumber("ridgeSpacing", Integer.class);

    public final StringPath sowingTime = createString("sowingTime");

    public QCrop(String variable) {
        super(Crop.class, forVariable(variable));
    }

    public QCrop(Path<? extends Crop> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCrop(PathMetadata metadata) {
        super(Crop.class, metadata);
    }

}

