package com.app.ovm.services.interfaces;

import java.util.List;

import com.app.ovm.dto.ProductCartUserIdDTO;
import com.app.ovm.pojos.entity.Cart;

public interface ICartService {


	List<Cart> updateCartByUserId(int userId);

	List<Cart> getCartByUserId(int userId);

	Cart addToCart(ProductCartUserIdDTO productCartUserIdDTO, int quantity);

	Cart removeFromRent(int rentId);

	double getCartTotalSavingAmt(int userId);

	double getCartTotalAmt(int userId);

}
