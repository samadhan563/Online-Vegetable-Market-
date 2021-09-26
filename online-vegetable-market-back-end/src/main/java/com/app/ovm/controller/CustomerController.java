package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ovm.dto.InChargeRequestDto;
import com.app.ovm.dto.PaymentDto;
import com.app.ovm.dto.ProductCartUserIdDTO;
import com.app.ovm.pojos.entity.Orders;
import com.app.ovm.pojos.entity.Payment;
import com.app.ovm.pojos.enums.Currency;
import com.app.ovm.services.interfaces.ICartService;
import com.app.ovm.services.interfaces.IOrderService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CustomerController {
	@Autowired
	private ICartService cartService;

	@Autowired
	private IOrderService orderService;

	@GetMapping("/cart/get-cart-user-id/{userId}")
	public ResponseEntity<?> getCartByUserId(@PathVariable int userId) {
		try {
			return new ResponseEntity<>(cartService.getCartByUserId(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/cart/update-cart-user-id/{userId}")
	public ResponseEntity<?> updateCartByUserId(@PathVariable int userId) {
		try {
			return new ResponseEntity<>(cartService.updateCartByUserId(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/cart/load-cart-user-id/{userId}")
	public ResponseEntity<?> loadCartByUserId(@PathVariable int userId) {
		try {
			return new ResponseEntity<>(cartService.getCartByUserId(userId), HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/cart/add-to-cart/quantity/{quantity}")
	public ResponseEntity<?> addToCart(@RequestBody ProductCartUserIdDTO productCartUserIdDTO,@PathVariable int quantity) {
		try {
			System.out.println(productCartUserIdDTO+" quantity"+quantity);
			
			return new ResponseEntity<>(cartService.addToCart(productCartUserIdDTO,quantity), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/cart/remove-from-cart/{cartId}")
	public ResponseEntity<?> removeFromRent(@PathVariable int cartId) {
		try {
			return new ResponseEntity<>(cartService.removeFromRent(cartId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// fatch total rent amount

	@GetMapping("/cart/get-total-cart-amount/{userId}")
	public ResponseEntity<?> getCartTotalAmt(@PathVariable int userId) {
		try {
			return new ResponseEntity<>(cartService.getCartTotalAmt(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// fatch total saving rent amount

	@GetMapping("/cart/get-total-saving-amount/{userId}")
	public ResponseEntity<?> getCartTotalSavingAmt(@PathVariable int userId) {
		try {
			return new ResponseEntity<>(cartService.getCartTotalSavingAmt(userId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/add-order/user/{userId}/price/{totalPrice}")
	public ResponseEntity<?> addBooking(@PathVariable int userId, @PathVariable double totalPrice) {
		System.out.println("in addBooking: " + userId + "  " + totalPrice);
		try {
			return new ResponseEntity<>(orderService.addOrder(userId, totalPrice), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("err in addOrder : " + e);
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/order-details/{userId}/order-id/{orderId}")
	public ResponseEntity<?> addBookingDetails(@PathVariable int userId, @PathVariable int orderId) {
		System.out.println("in addorderDetails: " + userId);
		try {
			return new ResponseEntity<>(orderService.addOrderDetails(userId, orderId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/payment/cod-payment")
	public ResponseEntity<?> addPaymentDetails(@RequestBody PaymentDto paymentDto) {
		System.out.println("in addpayment: " + paymentDto);
		try {
			Payment addPaymentDetails = orderService.addPaymentDetails(paymentDto);

			return new ResponseEntity<>(addPaymentDetails, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("err in addpayment : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/payment/card-payment")
	public ResponseEntity<?> addPaymentDetailsCard(@RequestBody InChargeRequestDto chargeRequest) {
		System.out.println("in addpayment: " + chargeRequest);
		chargeRequest.setDescription("Example charge");
		chargeRequest.setCurrency(Currency.INR);
		try {
			Payment addPaymentDetailsCard = orderService.addPaymentDetailsCard(chargeRequest);
			return new ResponseEntity<>(addPaymentDetailsCard, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("err in addpayment : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/order-history/{userId}")
	public ResponseEntity<?> loadOrderHistory(@PathVariable int userId) {
		try {
			System.out.println("Im invoked");
			return new ResponseEntity<>(orderService.loadOrderHistory(userId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/order-details/{orderId}")
	public ResponseEntity<?> loadOrderDetails(@PathVariable int orderId) {
		try {
			System.out.println("Im invoked");
			return new ResponseEntity<>(orderService.viewOrderDetails(orderId), HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/order-cancel/{orderId}")
	public ResponseEntity<?> cancelOrder(@PathVariable int orderId) {
		System.out.println("in addorderDetails: " + orderId);
		try {
			return new ResponseEntity<>(orderService.cancelOrder(orderId), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("err in addorderDetails : " + e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-payment-by-order/{orderId}")
	public ResponseEntity<?> getPaymentDetailsByOrderId(@PathVariable int orderId) {
		try {
			return new ResponseEntity<>(orderService.getPaymentDetailsByOrderId(orderId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
