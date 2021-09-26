
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';
const ViewProductsDetails = (props) => {
    const [product, setProduct] = useState({
        id: '',
        productName: '',
        availableQuantity: '',
        pricePerKg: '',
        discountOffer: '',
        finalPrice: '',
        description: '',
        image: '',
    });
    const [productName, setProductName] = useState();
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");


    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };


    const addQuantity = (e, id) => {
        e.preventDefault()
        showModal();
    }

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const addToCart = (e, id) => {
        e.preventDefault()

        let productCartId = {
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            productId: id
        };
        AllServices.addProductToCart(productCartId, quantity)
            .then((res) => {
                alert("");
                res.data !== null && JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
                setMessage(res.data.message)
            });
        console.log(message);
        setInterval(() => { window.location.reload() }, 1000);
        hideModal();
    }





    const getProductById = () => {
        setProductName(props.match.params.name)
        AllServices.getProductById(props.match.params.id).then((res) => {
            console.log(res.data)
            let p = res.data;
            setProduct({
                id:p.id,
                productName: p.productName,
                availableQuantity: p.availableQuantity,
                pricePerKg: p.pricePerKg,
                discountOffer: p.discountOffer,
                finalPrice: p.finalPrice,
                description: p.description,
                image: p.image
            });
        })
    }



    const buyNow = () => {
        props.history.push(`/rent-line`);
    }

    const backPage = () => {
        window.history.back();
    }

    useEffect(() => {
        getProductById();
       
    }, [])
    return (
        <div style={{ backgroundImage: `url(${""})` }} >
        <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col center mt-2">
                    <div className="card border-dark rounded">
                        <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                            <h4 className="card-title text-center mt-2">Details of Product, {productName}</h4>
                        </div>
                        <div className="card" >
                            <div className="row">
                                <div className="col-md-3 ml-2 mb-3">
                                    <img className="rounded mt-2 border border-dark " src={product.image} style={{ width: "100%", height: "100%" }} alt="..." />
                                </div>
                                <div class="col mt-2 mr-2">
                                    <div className="card">
                                        <div class="card-body border border-dark rounded mb-2" style={{ backgroundColor: "lightyellow" }}>
                                            <div className=" col mr-2">

                                                <h5 className="card-title mt-2 ml-4 ">Prize : <strike className="text-danger">{product.pricePerKg} Rs.</strike></h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Offer : {product.discountOffer} %</h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Available Quantity : {product.availableQuantity} kg</h5>
                                                <hr />
                                                <h5 className="card-title mt-2 ml-4">Final Price : {product.finalPrice} Rs.</h5>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-2 h5 ml-4 font-weight-bold">Decription :</div>
                                                    <h5 className="col card-title mt-2"> {product.description}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            {(JSON.parse(window.localStorage.getItem("cart_size")) > 0) && <button className="btn btn-outline-info custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                            <button className="btn btn-outline-success custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={(e) => addQuantity(e, product.id)} ><i class="fas fa-cart-plus"></i>| Add To Cart</button>
                            <button className="btn btn-outline-secondary custom-btn btn-lg ml-2 mr-2 mt-0 mb-2 float-left" onClick={backPage}><i class="fas fa-arrow-circle-left"></i>Back</button>
                        </div>


                        <Modal className="modal-open" show={isOpen} onHide={hideModal} size="" backdrop="static">
                            <div className="modal-header" >
                                <h5 className="modal-title"> * Confirmation</h5>
                                <button class="btn btn-outline-danger btn-sm" onClick={hideModal}>X</button>
                            </div>
                            <div className="modal-body">
                                <div class=" row mt-2 ml-4 mr-4">
                                    {/* <label className="form-label form-label-lg float-center col-md-4 ml-4">
                                        Pick time slot for booking :
                                    </label> */}
                                    <select className=" form-control form-control-lg col-md- float-center" type="text" placeholder="Select Time solt" value={quantity} onChange={handleChangeQuantity} >
                                        <option selected value="">Select Quantity</option>
                                        <option value="1">1 Kg</option>
                                        <option value="2">2 Kg</option>
                                        <option value="3">3 Kg</option>
                                        <option value="4">4 Kg</option>
                                        <option value="5">5 Kg</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {quantity !== "" && <button class="btn btn-success" onClick={(e) => addToCart(e, product.id)}><i class="far fa-check-circle"></i> Procced  </button>}
                                <button class="btn btn-danger" onClick={hideModal}>Cancel</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProductsDetails;