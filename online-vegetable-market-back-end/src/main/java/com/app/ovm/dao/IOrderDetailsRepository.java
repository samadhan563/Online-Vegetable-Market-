package com.app.ovm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ovm.pojos.entity.OrderDetails;
import com.app.ovm.pojos.entity.Orders;

public interface IOrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

	List<OrderDetails> findBySelectedOrder(Orders booking);

}
