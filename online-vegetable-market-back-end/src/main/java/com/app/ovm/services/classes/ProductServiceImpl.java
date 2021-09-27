package com.app.ovm.services.classes;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.ICategoryRepository;
import com.app.ovm.dao.IProductRepository;
import com.app.ovm.pojos.entity.Product;
import com.app.ovm.services.interfaces.IProductService;
@Service
@Transactional
public class ProductServiceImpl implements IProductService {
	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public List<Product> fetchAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product fetchProductById(int productId) {
		return  productRepository.findById(productId).get();
	}
	
	@Override
	public Product addProduct(Product product, int catId) {
		product.setCategory(categoryRepository.findById(catId).get());
		return productRepository.save(product);
	}

	@Override
	public Product updateOldProduct(Product product, int productId) {
		Product oldProduct = productRepository.findById(productId).get();
		oldProduct.setId(productId);
		oldProduct.setProductName(product.getProductName());
		oldProduct.setImage(product.getImage());
		oldProduct.setDiscountOffer(product.getDiscountOffer());
		oldProduct.setFinalPrice(product.getFinalPrice());
		oldProduct.setDescription(product.getDescription());
		oldProduct.setAvailableQuantity(product.getAvailableQuantity());
		return productRepository.save(oldProduct);
	}

	@Override
	public Product deleteProduct(int productId) {
		Product oldProduct = productRepository.findById(productId).get();
		productRepository.deleteById(productId);
		return oldProduct;
	}

	@Override
	public List<Product> fetchEquipmentByCategoryId(int catId) {
		 return productRepository.findByCategory(categoryRepository.findById(catId).get());
	}

}
