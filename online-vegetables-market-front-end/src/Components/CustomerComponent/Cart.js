import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import AllServices from '../../Services/AllServices';
import UserServices from '../../Services/UserServices';
import Navbar from './../Animation Component/Navbar';

const Cart = (props) => {
    let counter = 0;
    const [cart, setCart] = useState([])
    const [cartTotalAmt, setCartTotalAmt] = useState(0);
    const [cartTotalSavingAmt, setCartTotalSavingAmt] = useState(0);
    const [userAddress, setUserAddress] = useState(null);

    const [userId, setUserId] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState();
    const [aggrement, setAggrement] = useState({
        aggrement1: false,
        aggrement2: false,
        aggrement3: false,
        aggrement4: false,
    })
    const onChange = (event, value1) => {
        const { name, value } = event.target;
        setAggrement((preValue) => {
            return {
                ...preValue,
                [name]: value1,
            };
        })
    }

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };



    const addMore = () => {
        props.history.push("/all-products")
    }

    const removeFromCart = (id) => {
        AllServices.removeFromCart(id).then((res) => {
            res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", (JSON.parse(window.localStorage.getItem("cart_size")) - 1)));
            res.data.result !== null && window.location.reload();
        })
    }

    const getPaybleAmount = () => {
        console.log(cartTotalAmt+" "+cartTotalSavingAmt)
        return parseFloat(cartTotalAmt - cartTotalSavingAmt);
    }

    const acceptAggrement = () => {
        let cartSize = JSON.parse(window.localStorage.getItem("cart_size"));
        if (cartSize === 0) {
            alert(" Please add product then procced 😞")
        }
        else {
            status && showModal();
            !status && props.history.push('/login-page')
        }
    }

    const proceedToBuy = () => {
        console.log(JSON.stringify(aggrement));
        window.localStorage.setItem("add", userAddress)
        if (status === true) {
            if (userAddress !== null) {
                window.localStorage.setItem("total_price", parseFloat(getPaybleAmount()).toFixed(2))
                props.history.push('/order-now');
            }
            else if (userAddress === null) {
                alert(" !!! Enter Valid Address !!!");
                hideModal();
            }
        }
        else {
            props.history.push('/sign-in');
        }
    }

    const loadCart = () => {
        AllServices.loadCart(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            console.log(JSON.stringify(res.data))
            setCart(res.data);
        })
    }

    const getCartTotalAmt = () => {
        console.log(window.localStorage.getItem("user_id"))
        AllServices.getCartTotalAmt(JSON.parse(window.localStorage.getItem("user_id"))).then((res) => {
            setCartTotalAmt(res.data);
        })
    }

    const getCartTotalSavingAmt = () => {
        console.log(window.localStorage.getItem("user_id"))
        AllServices.getCartTotalSavingAmt(window.localStorage.getItem("user_id")).then((res) => {
            setCartTotalSavingAmt(res.data);
        })
    }

    const getUserAddress = () => {
        UserServices.getUserAddress(window.localStorage.getItem("user_id")).then((res) => {
            let address = res.data;
            setUserAddress(address);
        })
    }

    useEffect(() => {
        setStatus(JSON.parse(window.localStorage.getItem("status")));
        setUserId(JSON.parse(window.localStorage.getItem("user_id")))
        let size = JSON.parse(window.localStorage.getItem("cart_size"))
        if (size !== 0) {
            getUserAddress();
            loadCart();
            getCartTotalAmt();
            getCartTotalSavingAmt();
        }
    }, [])

    return (
        <div>
        <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">
                    <div className="card-mb-3 mt-1 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center font-weight-bold">Cart Items </h2>
                            <hr />
                        </div>
                        <div className="card-body mt-n5">
                            <div className="card-body mt-0 mb-n4">
                                <div className="row" >
                                    <table className="table table-hover" >
                                        <thead >
                                            <tr className="h5">
                                                <th> Sr.No. </th>
                                                <th> Product Name </th>
                                                <th> Quantity </th>
                                                <th> Price Per Kg </th>
                                                <th> Discount </th>
                                                <th> Final Cart </th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                cart.map(
                                                    product =>
                                                        <tr key={product.id}>
                                                            <td>{++counter}</td>
                                                            <td>{product.productName}</td>
                                                            <td>{product.availableQuantity}</td>
                                                            <td>{product.pricePerKg}</td>
                                                            <td>{product.discountOffer}</td>
                                                            <td>{parseFloat(product.finalPrice).toFixed(2)}</td>
                                                            <td>
                                                                <button className="btn btn-outline-danger  ml-2" style={{ width: "115px", borderRadius: "10px" }} onClick={() => removeFromCart(product.id)} >Remove <i class="fas fa-trash-alt"></i></button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <button className="btn btn-outline-success mt-2 mb-2 h-100" style={{ width: "130px", borderRadius: "10px" }} onClick={() => addMore()}>Add More <i class="fas fa-plus-circle"></i></button>
                                </div>
                            </div>
                            {JSON.parse(window.localStorage.getItem("cart_size")) > 0 &&
                                <div className="card float-right mt-3">
                                    <h5 className="text-right font-weight-bold ml-4 mr-4 mt-3">Total Amount  :  <strike className="text-danger"><i class="far fa-times-circle"></i>{cartTotalAmt}</strike></h5>
                                    <h5 className="text-right font-weight-bold ml-4 mr-4">Saving Amount :  <i class="fas fa-minus-circle"></i>{ parseFloat(cartTotalSavingAmt).toFixed(2)}</h5>
                                    <h5 className="text-right font-weight-bold text-success ml-4 mr-4">Payble Amount :  <i class="fas fa-rupee-sign"></i>{parseFloat(getPaybleAmount()).toFixed(2)}</h5>
                                    <button className="btn btn-outline-info font-weight-bold mr-4 mt-1 mb-4 ml-4 " autofocus="autofocus" onClick={acceptAggrement}>Proceed to Book now ({counter} item) <i class="fas fa-arrow-circle-right"></i></button>
                                </div>
                            }
                        </div>
                 
                        {/* popup for accepet aggrement */}
                        <Modal className="modal-open" show={isOpen} onHide={hideModal} size="lg" backdrop="static">
                            <div className="modal-header" >
                                <h5 className="modal-title"> * Terms And Conditions</h5>
                                <button class="btn btn-outline-danger btn-sm" onClick={hideModal}>X</button>
                            </div>
                            <div className="modal-body">
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2 " name="aggrement1" value="aggrement1" onChange={(e) => onChange(e, (!aggrement.aggrement1))} />
                                <label for="aggrement1" > If you break the equipment then you have to total amount of equipment</label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement2" value="aggrement2" onChange={(e) => onChange(e, (!aggrement.aggrement2))} />
                                <label for="aggrement2" > If you have to submit deposit/Security amount at the time of pikup equipment</label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement3" value="aggrement3" onChange={(e) => onChange(e, (!aggrement.aggrement3))} />
                                <label for="aggrement3"> You have to return equipment within 24 hours only. </label><br />
                                <input type="checkbox" className="custom-checkbox ml-2 mr-2" name="aggrement4" value="aggrement4" onChange={(e) => onChange(e, (!aggrement.aggrement4))} />
                                <label for="aggrement4" > If you have extended time then you are applicable for extra charges.</label><br />
                            </div>
                            <div className="modal-footer">
                                {aggrement.aggrement1 && aggrement.aggrement2 && aggrement.aggrement3 && aggrement.aggrement4 &&
                                    <button class="btn btn-success" onClick={proceedToBuy}><i class="far fa-check-circle"></i> Agree With All  </button>}
                                <button class="btn btn-danger" onClick={hideModal}>Cancel</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart;
