import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
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
            <nav className="navbar navbar-expand-lg navbar-mainbg ">
                <Link className="nav-link navbar-brand navbar-logo" to="/home">
                    <img src="{Icon}" style={{ width: "50px", marginLeft: "20px", backgroundColor: "white" }}></img>
                </Link>


                <button
                    className="navbar-toggler"

                    type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div
                    className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/admin-home" exact>
                                <i className="fas fa-tachometer-alt"></i>Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/admin-home" exact>
                                <i class="fas fa-address-book"></i>Category
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/show-all-products" exact>
                                <i class="fab fa-product-hunt"></i>Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/all-orders" exact>
                                <i class="fab fa-product-hunt"></i>Orders
                            </Link>
                        </li>
                        

                        {st != true &&
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login-page" >
                                    <i class="fas fa-sign-in-alt"></i>Sign in
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
                    </ul>
                </div>
            </nav>
            <div className="d-flex flex-row flex-grow-0 flex-fill justify-content-center bg-info py-2 text-white px-0 news">
                <Marquee className="news-scroll" style={{ direction: "left", scrollamount: "30" }}><h5>Welcome to Online Vegetable Market </h5></Marquee>
            </div>
        </div>
    )
}

export default AdminNavbar;
