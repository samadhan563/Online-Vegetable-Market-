import React, { useState, useEffect } from 'react';
import Image from './Images/food-market-basket.jpg'
import UserService from './../../Services/UserServices';
import { Link } from 'react-router-dom';
import Navbar from './../Animation Component/Navbar';

const RegistrationPage = (props) => {
    const [newUser, setNewUser] = useState({
        userName: "",
        password: "",
        confirmPassword: "",

    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setNewUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }

    const cancel = () => {
        props.history.push('/')
    }


    const registerUser = (r) => {
        console.log(JSON.stringify(newUser));
        UserService.registerNew(newUser).then(res => {
            if (res.data == null) {
                alert(" Sign up failed...............");
                setNewUser({ userName: "", password: "", confirmPassword: "" });
                props.history.push("/registration-page");
            } else {
                alert("Sign in successfully");
                props.history.push("/login-page");
            }
        })
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
                                <h3 className='text-center'>User Registration</h3>
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
                                            value={newUser.userName}
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
                                            value={newUser.password}
                                            onChange={onChange} />
                                    </div>

                                </div>
                                <div className="row mt-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password"
                                            name='confirmPassword'
                                            class="form-control"
                                            id="validationDefaultPassword"
                                            placeholder="Confirm Password"
                                            value={newUser.confirmPassword}
                                            onChange={onChange} />
                                    </div>

                                </div>
                            </div>
                            <div className='card-header'>
                                <div className="row mt-1">
                                    <div className="col-md-6 ">
                                        <button className="btn btn-outline-success btn-lg btn-block mt-2" onClick={registerUser} >Sign up <i class="fas fa-plus-circle"></i></button>
                                    </div>
                                    <div className="col-md-6 ">
                                        <button className="btn btn-outline-danger btn-lg btn-block mr-3 mt-2" onClick={cancel} ><i class="fas fa-arrow-circle-left"></i>Cancel</button>
                                    </div>
                                </div>
                                <div className="ml-1 mt-1 row col-form-label-lg">
                                    Already have an account?<Link to="/login-page" >Login here<i class="fas fa-sign-in-alt"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default RegistrationPage;
