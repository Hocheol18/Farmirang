package com.cg.farmirang.design.feature.design.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCropSelection is a Querydsl query type for CropSelection
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCropSelection extends EntityPathBase<CropSelection> {

    private static final long serialVersionUID = -232046327L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCropSelection cropSelection = new QCropSelection("cropSelection");

    public final QCrop crop;

    public final QDesign design;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> priority = createNumber("priority", Integer.class);

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public QCropSelection(String variable) {
        this(CropSelection.class, forVariable(variable), INITS);
    }

    public QCropSelection(Path<? extends CropSelection> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCropSelection(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCropSelection(PathMetadata metadata, PathInits inits) {
        this(CropSelection.class, metadata, inits);
    }

    public QCropSelection(Class<? extends CropSelection> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.crop = inits.isInitialized("crop") ? new QCrop(forProperty("crop")) : null;
        this.design = inits.isInitialized("design") ? new QDesign(forProperty("design"), inits.get("design")) : null;
    }

}

