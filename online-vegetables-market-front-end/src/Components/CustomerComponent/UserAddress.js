import React, { useEffect, useState } from 'react';
import UserServices from '../../Services/UserServices';
import Navbar from './../Animation Component/Navbar';

const UserAddress = () => {
    const [updateStatus, setUpdateStatus] = useState(false);
    const [userAddress, setUserAddress] = useState({
        homeNumber: "",
        society: "",
        area: "",
        city: "",
        state: "",
        pinCode: "",
    })
    const onChange = (event) => {
        setUpdateStatus(true);
        const { name, value } = event.target;
        setUserAddress((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }

    const loadAddress = () => {
        UserServices.getUserAddress(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            res.data !== null && setUserAddress(res.data);
        })
    }

    const back = () => {
        window.history.back();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userAddress)
        UserServices.updateAddress(JSON.parse(window.localStorage.getItem("user_id")), userAddress).then((res) => {
            res.data !== null && window.history.back();
            res.data === null && alert("please retry...");
        });
    }

    useEffect(() => {
        loadAddress()
    }, [])

    return (
        <div>
        <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">

                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center">Update address</h2>
                            <hr />
                        </div>

                        <div className=" row ml-2 mt-2 mb-2 mr-2 ">
                            <div className="ripple col col-md-3 mt-0 mb-2 ">
                                <img
                                    src={""}
                                    alt="profile-img"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <div className="col mt-0">

                                <div className="card-body ml-5 mr-5 mb-0">
                                    <form onSubmit={handleSubmit} className="form-group">
                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg mt-2">Home Number</label>
                                            <div className="col-sm-8 mt-2">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="homeNumber"
                                                    value={userAddress.homeNumber}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">Society</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="society"
                                                    value={userAddress.society}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">Area</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="area"
                                                    value={userAddress.area}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">City</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="city"
                                                    value={userAddress.city}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">State</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="state"
                                                    value={userAddress.state}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="row mb-3 ml-2 mt-0">
                                            <label className="col-sm-4 col-form-label col-form-label-lg">Pin Code</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    className="form-control form-control-lg"
                                                    name="pinCode"
                                                    value={userAddress.pinCode}
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {updateStatus && <button className="btn btn-outline-primary custom-btn " type="submit">Submit <i class="fas fa-plus-circle"></i></button>}
                                        <button className="btn btn-outline-danger custom-btn mt-2 mb-2 ml-4" style={{ width: "130px", borderRadius: "5px" }} onClick={() => back()}>Back <i class="fas fa-arrow-circle-left"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAddress;
