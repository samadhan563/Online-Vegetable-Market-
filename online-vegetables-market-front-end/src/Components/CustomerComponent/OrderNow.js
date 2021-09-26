import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';

const OrderNow = (props) => {
    const addOrder = (token) => {
        AllServices.addOrder(window.localStorage.getItem("total_price"), window.localStorage.getItem("user_id"))
            .then(res => {
                console.log(res.data)
                res.data !== null && window.localStorage.setItem("orderId", res.data)
                res.data !== null && addOrderDetails(token);
            });
    }

    const addOrderDetails = (token) => {
        AllServices.addOrderDetails(window.localStorage.getItem("user_id"), window.localStorage.getItem("orderId"))
            .then(res => {
                res.data !== null && paymentDetails(token);
            });
    }

    const paymentDetails = (token) => {
        if (token === null) {
            let codPayment = {
                paymentGatway: "COD",
                userId: JSON.parse(window.localStorage.getItem("user_id")),
                orderId: JSON.parse(window.localStorage.getItem("orderId"))
            };
            AllServices.addPaymentDetails(codPayment).then(res => {
                res.data !== null && alert("Please pay on pickup ........Thank you !!!");
                res.data === null && alert("Payment process failed........Sorry  !!!")
                res.data !== null && window.localStorage.removeItem("cart_size");
                res.data !== null && window.localStorage.removeItem("orderId");
                res.data !== null && window.localStorage.removeItem("total_price");
                res.data !== null && props.history.push('/home-page');
            });
        }
        else {
            let amount = (window.localStorage.getItem("total_price"));
            let cardPayment = ({
                stripeEmail: token.email,
                stripeToken: token.id,
                amount: amount,
                userId: JSON.parse(window.localStorage.getItem("user_id")),
                orderId: JSON.parse(window.localStorage.getItem("orderId"))
            })
            console.log(cardPayment);
            AllServices.addCardDetails(cardPayment).then(res => {
                res.data != null && alert("Payment done successfully........Thank you !!!")
                res.data === null && alert("Payment process failed........Sorry  !!!")
                res.data !== null && window.localStorage.removeItem("cart_size");
                res.data !== null && window.localStorage.removeItem("orderId");
                res.data !== null && window.localStorage.removeItem("total_price");
                res.data !== null && props.history.push('/home-page');
            });
        }
    }
    const handleToken = (token) => {
        addOrder(token);
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("orderId");
        props.history.push('/home-page');
    }

    const back = () => {
        props.history.push('/cart');
    }

    const paymentOnPickup = () => {
        addOrder(null);
    }

    return (
        <div>
        <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center">Payment Option</h2>
                            <hr />
                        </div>
                        <div className="col mt-0">
                            <div className="card-body ml-5 mr-5 mb-0">
                                <StripeCheckout
                                    amount={window.localStorage.getItem("total_price") * 100}
                                    name="E-CASS"
                                    image={""}
                                    panelLabel="Pay Now "
                                    currency="INR"
                                    stripeKey="pk_test_51IY0XeSHIBmpaOchlLj8aNBFtO49OjI3NqtKiRFXPAlpohH5f5tEZQgc2rmGxDpAdlIk3svp3USfostJd1V5n8YX00HpqnCWXf"
                                    token={handleToken}
                                >
                                    <button className="btn btn-outline-success" >
                                        Pay With Card <i class="fab fa-stripe-s"></i>
                                    </button>
                                </StripeCheckout>
                                <br />
                                <br />
                                <button className="btn btn-outline-info" onClick={() => paymentOnPickup()} > Cash On Delivery <i class="fas fa-rupee-sign"></i></button>
                            </div>
                            <hr />
                            <button className="btn btn-outline-danger float-start ml-5 " onClick={() => back()}> Back to Rent Line <i class="fas fa-arrow-circle-left"></i></button>
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default OrderNow;
