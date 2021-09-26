import React,{useEffect} from 'react';
import Navbar from './../Animation Component/Navbar';

const LogoutPage = (props) => {

    const Logout=()=>{
        window.localStorage.removeItem("status");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("user_name");
        window.localStorage.removeItem("user_role");
        window.localStorage.removeItem("user_fname");
        window.localStorage.removeItem("user_lname");
        window.localStorage.removeItem("user_email");
        window.localStorage.removeItem("user_dob");
        window.localStorage.removeItem("user_phone");
        window.localStorage.removeItem("user_image");
        window.localStorage.removeItem("add");
        window.localStorage.removeItem("user_idNum");
        window.localStorage.removeItem("total_price");
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("orderId");
        
        alert("Sign ou successfully ! take care........")
        props.history.push('/');
    }
    useEffect(() => {
        Logout();
    }, [])


    return (
        <div>
        <Navbar />
            
        </div>
    );
}

export default LogoutPage;
