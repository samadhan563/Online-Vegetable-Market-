import React, { useEffect, useState } from 'react';
import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';

const ShowProductDetails = (props) => {
    const [product, setProduct] = useState();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [categoryId, setCategoryId] = useState();



    const getProductById = () => {
        AllServices.getProductById(props.match.params.id).then((res) => {
            setProduct(res.data);
            console.log(JSON.stringify(products));
        })
    }



    const buyNow = () => {
        props.history.push(`/rent-line`);
    }

    const backPage = () => {
        window.history.back();
    }

    const addToRent = (id, equipName) => {
        let productCartId = {
            userId: JSON.parse(window.localStorage.getItem("user_id")),
            ProductId: product.id
        };
        AllServices.addProductToCart(productCartId)
            .then((res) => {
                alert(res.data.message + " 😄");
                res.data.result !== null && JSON.stringify(window.localStorage.setItem("cart_size", JSON.parse(window.localStorage.getItem("cart_size")) + 1));
            });
        setInterval(() => { window.location.reload() }, 1000);
    }

    useEffect(() => {
        setCategoryId(props.match.params.id);
        getProductById();
    }, [])
    return (
        <div style={{ backgroundImage: `url(${""})` }} >
        <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col center mt-2">
                    <div className="card border-dark rounded">
                        <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                            <h4 className="card-title text-center mt-2">Details of Product, {product.productName}</h4>
                        </div>
                        <div class="card" >
                            <div className="row ">
                                <div className="col-md-3 ml-2 mb-3 mr-0 hover-zoom">
                                    <img className="rounded mt-2 border border-dark " src={product.image} style={{ width: "100%", height: "100%" }} alt="..." />
                                </div>
                                <div class="col ml-0  mt-2 mr-2" >
                                    <div class="card-body border border-dark rounded mb-2" style={{ backgroundColor: "lightyellow" }}>
                                        <div className="col mr-2">

                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Price :</div>
                                                <h5 className="col card-title"> <strike className="text-danger">{product.finalPrice} Rs.</strike></h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Offer :</div>
                                                <h5 className="col card-title"> {product.discountOffer} %</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Final Price :</div>
                                                <h5 className="col card-title"> {product.finalPrice} Rs.</h5>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-3 h5 ml-4 font-weight-bold">Decription :</div>
                                                <h5 className="col card-title"> {product.decription}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            {(JSON.parse(window.localStorage.getItem("cart_size")) > 0) && <button className="btn btn-outline-info custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={buyNow} >Buy Now <i class="fas fa-arrow-circle-right"></i></button>}
                            <button className="btn btn-outline-success custom-btn btn-lg btn-lg ml-2 mr-2 mt-0 mb-2 float-right" onClick={addToRent} ><i class="fas fa-cart-plus"></i>| Add To Cart</button>
                            <button className="btn btn-outline-secondary custom-btn btn-lg ml-2 mr-2 mt-0 mb-2 float-left" onClick={backPage}><i class="fas fa-arrow-circle-left"></i>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProductDetails;

