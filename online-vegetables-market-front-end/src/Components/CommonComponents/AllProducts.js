import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';

function AllProducts(props) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

  
    const addQuantity = (e, id) => {
        e.preventDefault()
        setId(id)
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


    const getAllCategories = () => {
        AllServices.getAllCategories().then((res) => {
            setCategories(res.data);
            console.log(JSON.stringify(categories));
        })
    }

    const getAllProducts = () => {
        AllServices.getAllProducts().then((res) => {
            setProducts(res.data);
            console.log(JSON.stringify(products));
        })
    }
    const viewProduct = (id, productName) => {
        props.history.push(`show-products-details/${id}/${productName}`);
    }
    const buyNow = () => {
        props.history.push(`/cart`);
    }

    
    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, [])
    return (
        <div>
        <Navbar/>
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">
                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center">All Avialable Product</h2>
                            <hr />
                        </div>

                        <div className="card-body h-100">
                            <div className="row row-cols-1 row-cols-md-4 g-4 ">
                                {
                                    products.map(product =>
                                        <div key={product.id}>
                                            <div className="col">
                                                <div className="card border border-dark mb-4">
                                                    <button className="btn btn-outline-secondary custom-btn ml-2 mr-2 mt-2 mb-0" onClick={() => viewProduct(product.id, product.productName)} >
                                                        <div className="text-center">
                                                            <img className="card-img-top float-center " src={product.image} alt="..." style={{ height: "300px" }} />
                                                        </div>
                                                        <div class="card-body">
                                                            <h4 className="card-title text-center">{product.productName}</h4>
                                                            <h5 className="card-title text-center text-danger"><strike><i class="fas fa-rupee-sign"></i>{product.pricePerKg}</strike></h5>
                                                            <h5 className="card-title text-center btn btn-success btn-md" style={{ height: "40px", borderRadius: "70px", paddingRight: "30px", paddingLeft: "30px" }}>{product.discountOffer} %</h5>
                                                            <h5 className="card-title text-center"><i class="fas fa-rupee-sign"></i>{product.finalPrice} <i class="fas fa-calendar-day"></i></h5>

                                                        </div>
                                                    </button>
                                                    {(JSON.parse(window.localStorage.getItem("cart_size")) > 0) && <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                                                    <button className="btn btn-outline-success custom-btn btn-lg ml-2 mr-2 mt-2 mb-2 h-120" onClick={(e) => addQuantity(e, product.id)} ><i class="fas fa-cart-plus"></i> | Add To Cart</button>
                                                    <button className="btn btn-outline-info custom-btn btn-lg ml-2 mr-2 mt-0 mb-2" onClick={() => viewProduct(product.id, product.productName)}><i class="fas fa-info-circle"></i> | View</button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>

                                    )}
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
                                {quantity !== "" && <button class="btn btn-success" onClick={(e) => addToCart(e, id)}><i class="far fa-check-circle"></i> Procced  </button>}
                                <button class="btn btn-danger" onClick={hideModal}>Cancel</button>
                            </div>
                        </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts



