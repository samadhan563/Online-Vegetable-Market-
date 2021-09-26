package com.app.ovm.services.interfaces;

import java.util.List;

import com.app.ovm.pojos.entity.Product;

public interface IProductService {

	List<Product> fetchAllProducts();

	Product addProduct(Product product, int catId);
	
	Product fetchProductById(int productId);

	Product updateOldProduct(Product product, int productId);

	Product deleteProduct(int productId);

	List<Product> fetchEquipmentByCategoryId(int catId);

}
