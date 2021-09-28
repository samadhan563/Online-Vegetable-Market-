package com.app.ovm.services.classes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.ICartRepository;
import com.app.ovm.dao.IOrderDetailsRepository;
import com.app.ovm.dao.IOrderRepository;
import com.app.ovm.dao.IPaymentRepository;
import com.app.ovm.dao.IProductRepository;
import com.app.ovm.dao.IUserRepository;
import com.app.ovm.dto.InChargeRequestDto;
import com.app.ovm.dto.PaymentDto;
import com.app.ovm.pojos.entity.Cart;
import com.app.ovm.pojos.entity.OrderDetails;
import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.Payment;
import com.app.ovm.pojos.entity.Product;
import com.app.ovm.pojos.entity.User;
import com.app.ovm.pojos.enums.Currency;
import com.app.ovm.pojos.enums.Gateway;
import com.app.ovm.pojos.enums.OrderStatus;
import com.app.ovm.pojos.enums.PaymentStatus;
import com.app.ovm.services.interfaces.IOrderService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {
	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private IOrderRepository orderRepository;

	@Autowired
	private IOrderDetailsRepository detailsRepository;

	@Autowired
	private ICartRepository cartRepository;

	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private IPaymentRepository paymentRepository;

	@Value("${STRIPE_SECRET_KEY}")
	private String secretKey;

	@PostConstruct
	public void init() {
		Stripe.apiKey = secretKey;
	}

	@Override
	public List<OrderDetails> addOrderDetails(int userId, int orderId) {
		List<OrderDetails> orderDetails = new ArrayList<OrderDetails>();
		Orders orders = orderRepository.findById(orderId).get();
		User user = userRepository.findById(userId).get();
		List<Cart> lineItems = cartRepository.getCartByUserId(userId);
		for (Cart line : lineItems) {
			Product product = productRepository.findByProductName(line.getProductName()).get();
			if (product.getAvailableQuantity() > 0 && product.getAvailableQuantity() >= line.getAvailableQuantity()) {
				int qty = product.getAvailableQuantity() - line.getAvailableQuantity();
				product.setAvailableQuantity(qty);
				OrderDetails booking = new OrderDetails();
				booking.setProductName(line.getProductName());
				booking.setPricePerKg(line.getPricePerKg());
				booking.setDiscountOffer(line.getDiscountOffer());
				booking.setAvailableQuantity(line.getAvailableQuantity());
				booking.setFinalPrice(line.getFinalPrice());
				booking.setSelectedUser(user);
				booking.setSelectedOrder(orders);
				booking.setDescription(line.getDescription());
				booking.setImage(line.getImage());
				orderDetails.add(detailsRepository.save(booking));
			}
		}
		cartRepository.deleteByUserId(userId);
		return orderDetails;
	}

	@Override
	public int addOrder(int userId, double totalPrice) {
		System.out.println("Orders");
		Orders orders = new Orders();
		orders.setOrderDeliveryStatus(OrderStatus.PENDING);
		orders.setOrderDate(LocalDate.now());
		orders.setDeliveryDate(LocalDate.now());
		orders.setSelectedUser(userRepository.findById(userId).get());
		orders.setTotalPrice(totalPrice);
		System.out.println(orders);
		int id = orderRepository.save(orders).getId();
		return id;
	}

	@Override
	public Payment addPaymentDetails(PaymentDto paymentDto) {
		System.out.println(paymentDto);
		Payment payment = new Payment();
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(PaymentStatus.PAID);
		if (paymentDto.getPaymentGatway().equals("CREDIT"))
			payment.setPaymentGatway(Gateway.CARD);
		if (paymentDto.getPaymentGatway().equals("COD")) {
			payment.setPaymentGatway(Gateway.CASH_ON_DELIVERY);
			payment.setPaymentStatus(PaymentStatus.PENDING);
		}
		User user = userRepository.findById(paymentDto.getUserId()).get();
		payment.setUser(user);
		Orders booking = orderRepository.findById(paymentDto.getOrderId()).get();
		payment.setOrders(booking);
		payment.setAmount(booking.getTotalPrice());
		return paymentRepository.save(payment);
	}

	@Override
	public Payment addPaymentDetailsCard(InChargeRequestDto chargeRequest) throws StripeException {
		List<Object> paymentMethodTypes = new ArrayList<>();
		paymentMethodTypes.add("card");
		Map<String, Object> chargeParams = new HashMap<>();
		chargeParams.put("amount", Math.round(chargeRequest.getAmount()));
		System.out.println(Math.round(chargeRequest.getAmount()));
		chargeParams.put("currency", chargeRequest.getCurrency());
		chargeParams.put("description", chargeRequest.getDescription());
		chargeParams.put("receipt_email", chargeRequest.getStripeEmail());
		chargeParams.put("source", chargeRequest.getStripeToken());
		Charge create = Charge.create(chargeParams);

		Payment payment = new Payment();
		payment.setAmount(create.getAmount());
		payment.setChId(create.getId());
		payment.setPaymentGatway(Gateway.CARD);
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(PaymentStatus.PAID);
		payment.setReciptEmail(create.getReceiptEmail());
		payment.setCurrency(Currency.INR);
		User user = userRepository.findById(chargeRequest.getUserId()).get();
		payment.setUser(user);
		Orders o = orderRepository.findById(chargeRequest.getOrderId()).get();
		payment.setOrders(o);
		return paymentRepository.save(payment);
	}

	@Override
	public List<Orders> loadOrderHistory(int userId) {
		User user = userRepository.findById(userId).get();
		System.out.println(orderRepository.findBySelectedUser(user));
		return orderRepository.findBySelectedUser(user);
	}

	@Override
	public Orders cancelOrder(int orderId) throws Exception {
		Orders booking = orderRepository.findById(orderId).get();
		System.out.println(booking);
		if (booking.getOrderDeliveryStatus() == OrderStatus.PENDING) {
			System.out.println(booking);
			List<OrderDetails> bookingDetails = booking.getOrderDetails();
			for (OrderDetails bookingDetail : bookingDetails) {
				Product product = productRepository.findByProductName(bookingDetail.getProductName()).get();
				product.setAvailableQuantity(bookingDetail.getAvailableQuantity() + product.getAvailableQuantity());
				productRepository.save(product);
			}
			booking.setOrderDeliveryStatus(OrderStatus.CANCELD);
			orderRepository.save(booking);
			return booking;
		}
		throw new Exception("Failed to cancel booking");
	}

	@Override
	public List<OrderDetails> viewOrderDetails(int orderId) {
		Orders booking = orderRepository.findById(orderId).get();
		return detailsRepository.findBySelectedOrder(booking);

	}

	@Override
	public Payment getPaymentDetailsByOrderId(int orderId) {
		return paymentRepository.findByOrders(orderRepository.findById(orderId).get());
	}

	@Override
	public List<Orders> loadAllOrders() {

		return orderRepository.findAll();
	}

	@Override
	public Orders acceptOrder(int id) throws Exception {
		Orders booking = orderRepository.findById(id).get();
		System.out.println(booking);
		if (booking.getOrderDeliveryStatus() == OrderStatus.PENDING
				&& (booking.getOrderDeliveryStatus() != OrderStatus.CANCELD)) {

			booking.setOrderDeliveryStatus(OrderStatus.ACCEPTED);
			orderRepository.save(booking);
			return booking;
		}
		throw new Exception("Failed to cancel booking");
	}

	@Override
	public Orders deliveredOrder(int id) throws Exception {
		Orders booking = orderRepository.findById(id).get();
		System.out.println(booking);
		if (booking.getOrderDeliveryStatus() == OrderStatus.ACCEPTED
				&& (booking.getOrderDeliveryStatus() != OrderStatus.DELIVERED)) {

			booking.setOrderDeliveryStatus(OrderStatus.DELIVERED);
			orderRepository.save(booking);
			return booking;
		}
		throw new Exception("Failed to cancel booking");
	}

}
