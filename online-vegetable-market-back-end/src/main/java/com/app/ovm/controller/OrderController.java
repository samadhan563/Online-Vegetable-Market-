package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ovm.services.interfaces.ICategoryService;
import com.app.ovm.services.interfaces.ICloudinaryService;
import com.app.ovm.services.interfaces.IOrderService;

@RestController	
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {
	
	@Autowired
	private IOrderService orderService;


	@GetMapping("/fetch-all-orders")
	public ResponseEntity<?> loadAllOrders() {
		try {
			return new ResponseEntity<>(orderService.loadAllOrders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/accept-order/{id}")
	public ResponseEntity<?> acceptOrder(@PathVariable int id) {
		try {
			return new ResponseEntity<>(orderService.acceptOrder(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@GetMapping("/delived-order/{id}")
	public ResponseEntity<?> deliveredOrder(@PathVariable int id) {
		try {
			return new ResponseEntity<>(orderService.deliveredOrder(id), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
}
