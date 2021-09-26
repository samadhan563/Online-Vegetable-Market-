package com.app.ovm.services.classes;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ovm.dao.ICartRepository;
import com.app.ovm.dao.IProductRepository;
import com.app.ovm.dto.ProductCartUserIdDTO;
import com.app.ovm.pojos.entity.Cart;
import com.app.ovm.pojos.entity.Product;
import com.app.ovm.services.interfaces.ICartService;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

	@Autowired
	private ICartRepository cartRepository;

	@Autowired
	private IProductRepository productRepository;

	@Override
	public Cart addToCart(ProductCartUserIdDTO productCartUserIdDTO,int quantity) {
		if (productCartUserIdDTO.getUserId() > 0) {
			Optional<Product> optionalEquipment = productRepository.findById(productCartUserIdDTO.getproductId());
			Product product = optionalEquipment.get();
			Cart newRent = new Cart(product.getId(), product.getProductName(), quantity*product.getPricePerKg(), quantity,
					product.getImage(), quantity*product.getFinalPrice(), product.getDiscountOffer(), product.getDescription(),
					productCartUserIdDTO.getUserId());
			return cartRepository.save(newRent);
		} else {
			throw new RuntimeException("Invalid user id....");
		}
	}

	@Override
	public List<Cart> updateCartByUserId(int userId) {
		List<Cart> list = cartRepository.getCartByUserId(9999);
		for (Cart cart : list) {
			cart.setUserId(userId);
		}
		return list;
	}

	@Override
	public List<Cart> getCartByUserId(int userId) {
		return cartRepository.getCartByUserId(userId);
		
	}



	@Override
	public Cart removeFromRent(int rentId) {
		Optional<Cart> optionalRentLine = cartRepository.findById(rentId);
		Cart rentLine = optionalRentLine.get();
		cartRepository.deleteById(rentId);
		return rentLine;
	}

	@Override
	public double getCartTotalSavingAmt(int userId) {
		double tamt = cartRepository.getCartTotalAmt(userId);
		double famt = cartRepository.getCartTotalFinalAmt(userId);
		return (tamt - famt);
	}

	@Override
	public double getCartTotalAmt(int userId) {
		return cartRepository.getCartTotalAmt(userId);
	}



}
