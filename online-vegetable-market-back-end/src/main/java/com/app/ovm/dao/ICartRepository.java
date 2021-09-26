package com.app.ovm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ovm.pojos.entity.Cart;

public interface ICartRepository extends JpaRepository<Cart, Integer> {

	List<Cart> getCartByUserId(int i);

	@Query(value = "select sum(r.finalPrice) from Cart r where r.userId=:userId")
	double getCartTotalFinalAmt(int userId);
	
	@Query(value = "select sum(r.pricePerKg) from Cart r where r.userId=:userId")
	double getCartTotalAmt(int userId);

	void deleteByUserId(int userId);

}
