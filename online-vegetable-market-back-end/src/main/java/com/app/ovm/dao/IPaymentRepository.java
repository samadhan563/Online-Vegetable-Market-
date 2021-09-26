package com.app.ovm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.Payment;

public interface IPaymentRepository extends JpaRepository<Payment, Integer> {

	Payment findByOrders(Orders orders);

}
