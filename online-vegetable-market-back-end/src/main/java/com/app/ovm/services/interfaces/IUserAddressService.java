package com.app.ovm.services.interfaces;

import com.app.ovm.pojos.entity.UserAddress;

public interface IUserAddressService {

	UserAddress addUserAddress(UserAddress userAddress, int userId);

	UserAddress getUserAddress(int userId);

}
