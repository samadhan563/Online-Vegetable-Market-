package com.app.ovm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.User;

public interface IOrderRepository extends JpaRepository<Orders, Integer> {

	List<Orders> findBySelectedUser(User user);

}
