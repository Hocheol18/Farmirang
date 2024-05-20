package com.cg.farmirang.design.feature.design.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFarmCoordinate is a Querydsl query type for FarmCoordinate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFarmCoordinate extends EntityPathBase<FarmCoordinate> {

    private static final long serialVersionUID = -384869439L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFarmCoordinate farmCoordinate = new QFarmCoordinate("farmCoordinate");

    public final NumberPath<Integer> col = createNumber("col", Integer.class);

    public final QDesign design;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> row = createNumber("row", Integer.class);

    public final NumberPath<Integer> sequence = createNumber("sequence", Integer.class);

    public QFarmCoordinate(String variable) {
        this(FarmCoordinate.class, forVariable(variable), INITS);
    }

    public QFarmCoordinate(Path<? extends FarmCoordinate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFarmCoordinate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFarmCoordinate(PathMetadata metadata, PathInits inits) {
        this(FarmCoordinate.class, metadata, inits);
    }

    public QFarmCoordinate(Class<? extends FarmCoordinate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.design = inits.isInitialized("design") ? new QDesign(forProperty("design"), inits.get("design")) : null;
    }

}

