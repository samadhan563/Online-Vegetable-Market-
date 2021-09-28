package com.app.ovm.services.interfaces;

import java.util.List;

import com.app.ovm.dto.InChargeRequestDto;
import com.app.ovm.dto.PaymentDto;
import com.app.ovm.pojos.entity.OrderDetails;
import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.Payment;
import com.stripe.exception.StripeException;

public interface IOrderService {


	int addOrder(int userId, double totalPrice);

	List<OrderDetails> addOrderDetails(int userId, int orderId);

	Payment addPaymentDetails(PaymentDto paymentDto);

	Payment addPaymentDetailsCard(InChargeRequestDto chargeRequest) throws StripeException;

	List<Orders> loadOrderHistory(int userId);

	Orders cancelOrder(int orderId) throws Exception;

	List<OrderDetails> viewOrderDetails(int orderId);

	Payment getPaymentDetailsByOrderId(int orderId);

	List<Orders> loadAllOrders();

	Orders acceptOrder(int id) throws Exception;

	Orders deliveredOrder(int id) throws Exception;

}
