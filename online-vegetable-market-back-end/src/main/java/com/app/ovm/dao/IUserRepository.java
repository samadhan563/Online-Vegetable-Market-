package com.app.ovm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.ovm.pojos.entity.User;
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

	@Query(value = "select u from User u where u.userName=:userName and u.password=:password")
	Optional<User> autenticateUser(String userName, String password);
	
}
