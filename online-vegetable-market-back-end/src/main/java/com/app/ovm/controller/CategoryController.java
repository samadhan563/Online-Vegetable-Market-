package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ovm.pojos.entity.Category;
import com.app.ovm.services.interfaces.ICategoryService;
import com.app.ovm.services.interfaces.ICloudinaryService;

@RestController	
@CrossOrigin
@RequestMapping("/api/category")
public class CategoryController {
	
	@Autowired
	private ICategoryService categoryService;

	@Autowired
	private ICloudinaryService cloudinaryService;

	@GetMapping("/fetch-all-category")
	public ResponseEntity<?> fetchAllProducts() {
		try {
			return new ResponseEntity<>(categoryService.fetchAllCategorys(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/fetch-category-by-id/{categoryId}")
	public ResponseEntity<?> fetchCategoryById(@PathVariable int categoryId) {
		try {
			return new ResponseEntity<>(categoryService.fetchCategoryById(categoryId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/add-new-category/{catName}")
	public ResponseEntity<?> addNewCategory(@PathVariable String catName, @RequestParam("file") MultipartFile file) {
		try {
			System.out.println("File is invoked");
			String url = cloudinaryService.uploadFile(file);
			System.out.println("File is invoked");
			return new ResponseEntity<>(categoryService.addCategory(catName, url), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/update-old-category/{productId}")
	public ResponseEntity<?> updateOldCategory(@RequestBody Category category, @PathVariable int categoryId) {
		try {
			System.out.println(category);
			return new ResponseEntity<>(categoryService.updateOldCategory(category, categoryId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/remove-old-category/{categoryId}")
	public ResponseEntity<?> deleteCategory(@PathVariable int categoryId) {
		try {
			System.out.println(categoryId);
			return new ResponseEntity<>(categoryService.deleteCategory(categoryId), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
