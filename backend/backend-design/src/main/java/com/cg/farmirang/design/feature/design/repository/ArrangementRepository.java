package com.cg.farmirang.design.feature.design.repository;

import com.cg.farmirang.design.feature.design.entity.Arrangement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArrangementRepository extends MongoRepository<Arrangement, String> {

}
