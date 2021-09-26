package com.app.ovm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ovm.pojos.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {

}
