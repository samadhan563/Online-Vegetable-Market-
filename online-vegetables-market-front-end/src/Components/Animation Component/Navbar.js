import React, { useEffect, useState } from 'react';
// import icon from "./profile.png"
// import Icon from "./Icon.png"
import { Link } from 'react-router-dom';
import './Navbar.css';
import Marquee from "react-fast-marquee";
import { Dropdown } from 'react-bootstrap';
const Navbar = () => {

    const [st, setSt] = useState(window.localStorage.getItem("status"));
    const setStatus = () => {
        setSt(JSON.parse(window.localStorage.getItem("status")));
        console.log(st);
    }

    useEffect(() => {
        setStatus();


    }, []);
    return (
        <div>
            <div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-mainbg ">
                <Link className="nav-link navbar-brand navbar-logo" to="/home">
                    <img src="{Icon}" style={{ width: "50px", marginLeft: "20px", backgroundColor: "white" }}></img>
                </Link>

                {
                    st === true && (<Dropdown>
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic" >
                            <i class="fas fa-user-circle"></i> My Account
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors">
                            <Dropdown.Item href="/view-profile-page"><i class="fas fa-id-card"></i> Profile </Dropdown.Item>
                            <Dropdown.Item href="/update-profile-page"><i class="fas fa-user-edit"></i> Update Profile </Dropdown.Item>
                            <Dropdown.Item href="/update-password"><i class="fas fa-key"></i> Update Password</Dropdown.Item>
                            <Dropdown.Item href="/user-address-page"><i class="far fa-address-book"></i> Update Address</Dropdown.Item>
                            <Dropdown.Item href="/order-history"><i class="fab fa-jedi-order"></i> Order History</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/logout-page"><i class="fas fa-sign-out-alt"></i> Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    )}
                <button
                    className="navbar-toggler"

                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div
                    className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/" exact>
                                <i className="fas fa-tachometer-alt"></i>Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/about-us-page" exact>
                                <i class="fas fa-address-book"></i>About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/all-products" exact>
                                <i class="fab fa-product-hunt"></i>Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/contact-page" exact>
                                <i className="far fa-copy"></i>Contact Us
                            </Link>
                        </li>
                        {/*window.localStorage.getItem("status") === true &&*/}
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/cart" >
                                <i class="fas fa-cart-plus"></i>Cart
                            </Link>
                        </li>

                        {st != true &&
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login-page" >
                                    <i class="fas fa-sign-in-alt"></i>Sign in
                                </Link>
                            </li>
                        }
                        {st != true &&
                            <li className="nav-item ">
                                <Link className="nav-link text-light" to="/registration-page" >
                                    <i class="fas fa-user-plus"></i>Sign Up
                                </Link>
                            </li>
                        }
                        {st == true &&
                            <li className="nav-item" >
                                <Link className="nav-link text-light" to="/logout-page" >
                                    <i class="fas fa-sign-out-alt"></i>Sign out
                                </Link>
                            </li>
                        }
                        {st == true &&
                            <li className="nav-item " >
                                <Link className="nav-link text-light" to="/view-profile-page" >
                                    <i class="fas fa-id-card"></i><img src="{icon}" style={{ width: "35px" }}></img>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
            <div className="d-flex flex-row flex-grow-0 flex-fill justify-content-center bg-info py-2 text-white px-0 news">
                <Marquee className="news-scroll" style={{ direction: "left", scrollamount: "30" }}><h5>Welcome to Online Vegetable Market </h5></Marquee>
            </div>
        </div>
    );
}

export default Navbar;

