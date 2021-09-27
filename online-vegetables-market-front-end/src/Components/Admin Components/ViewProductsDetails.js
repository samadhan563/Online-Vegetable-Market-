import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductServices from '../../Services/Admin Services/ProductServices';
import AdminNavbar from './AdminNavbar'

const ViewProductsDetails = (props) => {
    const [product, setProduct] = useState([]);

    const back = () => {
        window.history.back();
    }

    const getProductById = () => {
        ProductServices.getProductById(props.match.params.id).then((res) => {
            setProduct(res.data);
        })
    }

    const deleteOldProduct = () => {
        ProductServices.deleteProduct(props.match.params.id).then((res) => {
            setProduct(res.data);
            //this.setState({ equipments: this.state.equipments.filter(products => products.id !== id) });
            // window.location.reload();
        });
    }

    useEffect(() => {
        getProductById();
    }, [])

    return (
        <div className="main ml-0 mr-0" >
        <AdminNavbar/>
            <div className="row ">
                <div className="col center mt-2">
                    <div className="card border-dark rounded">
                        <div className="card-header" style={{ backgroundColor: "lightcyan" }}>
                            <h4 className="card-title text-center mt-2">Details of Product, {product.productName}</h4>
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
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-outline-secondary btn-lg" onClick={back} ><i class="fas fa-backward"></i>Back</button>
                        <Link to={`/update-product-details/${props.match.params.id}`} className="btn btn-outline-primary btn-lg float-right">Update <i class="fas fa-edit"></i></Link>
                        <button className="btn btn-outline-danger btn-lg float-right mr-4" onClick={deleteOldProduct} >Delete <i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProductsDetails;
