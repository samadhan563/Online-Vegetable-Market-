package com.app.ovm.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.ovm.pojos.entity.Category;
import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.Product;
@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {

	List<Product> findByCategory(Category category);

	Optional<Product> findByProductName(String productName);

}
