import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from './Images/food-market-basket.jpg'
import AuthenticationServices from './../../Services/AuthenticationServices';
import AllServices from '../../Services/AllServices';
import UserServices from '../../Services/UserServices';
import Navbar from './../Animation Component/Navbar';


const LoginPage = (props) => {
    const [message, setMessage] = useState('');
    const [loginRequest, setLoginRequest] = useState({
        userName: "",
        password: "",
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setLoginRequest((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }


    const handleReset = () => {
        props.history.push('/')
    }

    const getCartSize = () => {
        setTimeout(() => {
            AllServices.getCartByUserId(window.localStorage.getItem("user_id"))
                .then((res) => {
                    console.log(res.data)
                    JSON.stringify(window.localStorage.setItem("cart_size", res.data.length));
                });
        }, 1000);
    }

    const updateUserCart = () => {
        let cartUserId = JSON.parse(window.localStorage.getItem("user_id"));
        let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
        if (cartSize > 0) {
            AllServices.updateCartUserId(cartUserId);
        }
        getCartSize();
    }

    const loadProfile = (userId) => {
        console.log(userId)
        UserServices.getUserProfile(userId).then(res => {
            console.log("Executed...")
            let user = res.data;
            console.log("Executed...")
            user == null && props.history.push('/user-profile-page');

            user != null && window.localStorage.setItem("user_fname", user.firstName);
            user != null && window.localStorage.setItem("user_lname", user.lastName);
            user != null && window.localStorage.setItem("user_email", user.email);
            user != null && window.localStorage.setItem("user_dob", user.dateOfBirth);
            user != null && window.localStorage.setItem("user_phone", user.phoneNumber);
            user != null && window.localStorage.setItem("user_image", user.profileImage);

        }).catch(err => {
            props.history.push('/user-profile-page');
        })
    }

    const authenticateUser = (e) => {
        console.log(JSON.stringify(loginRequest));
        AuthenticationServices.userLogin(loginRequest).then(res => {
            let user = res.data;
            console.log(user);
            user == null && setMessage('Invalid Login credentials', () => {
                setLoginRequest({ userName: "", password: "" });
            });
            user != null && alert("User Login successfully")
            user != null && setMessage('User Login successfully');
            user != null && window.localStorage.setItem("status", true);
            user != null && window.localStorage.setItem("user_id", user.id);
            user != null && window.localStorage.setItem("user_name", user.userName);
            user != null && window.localStorage.setItem("user_role", user.userRole);
            if (user.userRole === "ADMIN") { props.history.push('/admin-home'); }
            else {
                (user != null && user.userRole === "CUSTOMER") && loadProfile(user.id);
                (user != null && user.userRole === "CUSTOMER") && updateUserCart();
                (user != null && user.userRole === "CUSTOMER") && props.history.push('/home-page');
            }
        });
    }

    return (
        <div>
        <Navbar />
            <div className="col-md-6 offset-md-3 mt-4">
                <div className='row'>
                    <div className="col-md-4 mr-n4 ">
                        <div className="card h-100 w-100">
                            <img className='h-100 w-100' src={Image} alt="Image"></img>
                        </div>
                    </div>
                    <div className="col">
                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='text-center'>User Login</h3>
                            </div>
                            <div className="card-body">
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="far fa-user"></i></span>
                                        </div>
                                        <input type="text"
                                            name='userName'
                                            class="form-control"
                                            id="validationDefaultUsername"
                                            placeholder="User Name"
                                            value={loginRequest.userName}
                                            onChange={onChange} />
                                    </div>
                                </div>
                                <div className="row mt-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password"
                                            name='password'
                                            class="form-control"
                                            id="validationDefaultPassword"
                                            placeholder="Password"
                                            value={loginRequest.password}
                                            onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className="ml-3 mr-4 mt-2">
                                    <button className="btn btn-outline-success btn-lg btn-block" onClick={authenticateUser}>
                                        Login <i class="fas fa-arrow-circle-right"></i>  </button>
                                    <div className="row ml-1 h5 mt-3" >
                                        Click here to
                                        <Link className="nav-item " onClick={() => handleReset()} > <i class="fas fa-hammer ml-1"></i>Forgot Password</Link>
                                    </div>
                                    <div className="row ml-1 h5">
                                        New User? <Link to="/registration-page"><i class="fas fa-user-plus"></i>Create Account here</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
