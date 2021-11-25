package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ovm.pojos.entity.Product;
import com.app.ovm.services.interfaces.IProductService;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private IProductService productService;

	@GetMapping("/fetch-all-products")
	public ResponseEntity<?> fetchAllProducts() {
		try {
			return new ResponseEntity<>(productService.fetchAllProducts(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/get-product-by-id/{productId}")
	public ResponseEntity<?> fetchProductByIroddud(@PathVariable int productId) {
		try {
			return new ResponseEntity<>(productService.fetchProductById(productId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/add-new-product/{catId}")
	public ResponseEntity<?> addProduct( @PathVariable int catId,@RequestBody Product product) {
		try {
			System.out.println(product);
			return new ResponseEntity<>(productService.addProduct(product, catId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update-product/{productId}")
	public ResponseEntity<?> updateOldProduct(@RequestBody Product product, @PathVariable int productId) {
		try {
			System.out.println(product);
			return new ResponseEntity<>(productService.updateOldProduct(product, productId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/delete-old-product/{productId}")
	public ResponseEntity<?> deleteOldProduct(@RequestBody Product product, @PathVariable int productId) {
		try {
			System.out.println(product);
			return new ResponseEntity<>(productService.deleteProduct(productId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/fetch-product-by-cat-id/{catId}")
	public ResponseEntity<?> fetchEquipmentByCategoryId(@PathVariable int catId) {
		try {
			System.out.println(catId);
			return new ResponseEntity<>(productService.fetchEquipmentByCategoryId(catId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
