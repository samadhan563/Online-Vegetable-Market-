import React, { useState, useEffect } from 'react';
import UserServices from '../../Services/UserServices';
import Navbar from './../Animation Component/Navbar';

const UpdateProfilePage = (props) => {
    const [updateStatus, setUpdateStatus] = useState(false);
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        idNumber: "",
        phoneNumber: "",
        dateOfBirth: "",
        profileImage: "",
        message: "",
    })
    const [imageUrl, setImageUrl] = useState(window.localStorage.getItem("user_image"))

    const onChange = (event) => {
        setUpdateStatus(true)
        const { name, value } = event.target;
        setUserDetail((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }
    const loadUserDetail = () => {
        UserServices.getUserProfile(window.localStorage.getItem("user_id"))
            .then(res => {
                res.data != null && setUserDetail(res.data)
            });
    }

    const changeImageHandler = (e) => {
        setUpdateStatus(true)
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        UserServices.fileUpload(formData).then(res => {
            console.log(res.data)
            res.data != null && setImageUrl(res.data);
            res.data != null && window.localStorage.setItem("user_image", res.data);
        });
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        let saveUser = {
            userId: window.localStorage.getItem("user_id"),
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            dateOfBirth: userDetail.dateOfBirth,
            phoneNumber: userDetail.phoneNumber,
            email: userDetail.email,
            idNumber: userDetail.idNumber,
            profileImage: imageUrl,

        };
        UserServices.updateProfile(window.localStorage.getItem("user_id"), saveUser).then((res) => {
            res.data != null && setUserDetail(res.data);
            let user = res.data;
            user != null && window.localStorage.setItem("user_fname", user.firstName);
            user != null && window.localStorage.setItem("user_lname", user.lastName);
            user != null && window.localStorage.setItem("user_email", user.email);
            user != null && window.localStorage.setItem("user_dob", user.dateOfBirth);
            user != null && window.localStorage.setItem("user_phone", user.phoneNumber);
            user != null && window.localStorage.setItem("user_image", user.profileImage);
            res.data != null && alert("Updated");
            res.data == null && alert("Updation is failed");
            res.data != null && window.location.reload();
        });

    }
    useEffect(() => {
        loadUserDetail()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center font-weight-bold">Update profile </h2>
                            <hr />
                        </div>
                        <div className="card-body mt-n5 ">
                            <div className="card-body mt-n1 ">
                                <form  >
                                    <div className="text-center">
                                        <img style={{ width: "190px" }}
                                            src={userDetail.profileImage}
                                            alt="profile-img"
                                            className="profile-img-card rounded"
                                        />
                                        <div className="text-center mt-2 ml-5">
                                            <input type="file" placeholder="" onChange={changeImageHandler} />
                                        </div>
                                        {updateStatus && <button className='btn btn-outline-info mt-2' type='submit' onClick={handleSubmit}><i class="fas fa-upload"></i> Upload Image</button>}
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">User Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='username'
                                                name='userName'
                                                placeholder='Enter your email'
                                                value={window.localStorage.getItem('user_name')}
                                                onChange={onChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">First Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='firstName'
                                                name='firstName'
                                                placeholder='Enter your first name'
                                                value={userDetail.firstName}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.email && <p className="alert alert-danger ">{userDetail.errors.email}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Last Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='lastName'
                                                name='lastName'
                                                placeholder='Enter your last name'
                                                value={userDetail.lastName}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.email && <p className="alert alert-danger ">{userDetail.errors.email}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Email Id</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='email'
                                                name='email'
                                                placeholder='Enter your email'
                                                value={userDetail.email}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.password && <p className="alert alert-danger ">{userDetail.errors.password}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Id Number</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='text'
                                                name='idNumber'
                                                placeholder='Enter your confirm Password'
                                                value={userDetail.idNumber}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.confirmPassword && <p className="alert alert-danger  ">{userDetail.errors.confirmPassword}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Phone Number</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='text'
                                                name='phoneNumber'
                                                placeholder='Enter your phone number'
                                                value={userDetail.phoneNumber}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.phoneNumber && <p className="alert alert-danger  ">{userDetail.errors.phoneNumber}</p>} */}
                                        </div>
                                    </div>
                                    <div className="form-input row mt-4">
                                        <label className="col-sm-3 col-form-label col-form-label-lg ml-3">Date of Birth</label>
                                        <div className="col-sm-7">
                                            <input
                                                className="form-control form-control-lg"
                                                type='date'
                                                name='dateOfBirth'
                                                placeholder='Enter your date of birth'
                                                value={userDetail.dateOfBirth}
                                                onChange={onChange}
                                            />
                                            {/* {userDetail.errors.phoneNumber && <p className="alert alert-danger  ">{userDetail.errors.phoneNumber}</p>} */}
                                        </div>
                                    </div>
                                    {updateStatus && <button className='btn btn-success ml-3 mt-4' type='submit' onClick={handleSubmit}><i class="fas fa-upload"></i> Update</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default UpdateProfilePage;
