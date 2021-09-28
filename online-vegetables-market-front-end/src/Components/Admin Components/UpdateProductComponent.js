import React, { useState, useEffect } from 'react';
import ProductServices from '../../Services/Admin Services/ProductServices';
import Image from './Images/food-market-basket.jpg';
import AdminNavbar from './AdminNavbar';

const UpdateProductComponent = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [img, setImg] = useState('');
    const [product, setProduct] = useState({
        productName: '',
        availableQuantity: '',
        pricePerKg: '',
        discountOffer: '',
        finalPrice: '',
        description: '',
        image: '',
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setProduct((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        })
    }

    const changeImageUrlHandler = (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        ProductServices.fileUpload(formData).then(res => {
            res.data != null && setProduct((preValue) => {
                return {
                    ...preValue,
                    ['image']: res.data,
                };
            })
             setImg(res.data!=null?res.data:product.image);
            console.log(res.data);
        });
    }

    const changeFinalPriceCalculatetor = (discount, price) => {
        let tempPrice = parseFloat((price - ((price * discount) / 100))).toFixed(2)
        setProduct((preValue) => {
            return {
                ...preValue,
                ['finalPrice']: tempPrice,
            };
        });
    }
    const changeDiscountOfferHandler = (event) => {
        setProduct((preValue) => {
            return {
                ...preValue,
                ['discountOffer']: event.target.value,
            };
        });
        changeFinalPriceCalculatetor(event.target.value, product.pricePerKg)
    }

    const loadProduct = () => {
        ProductServices.getProductById(id).then((res) => {
            let prod = res.data;
            console.log(prod)
            setProduct({
                productName: prod.productName,
                availableQuantity: prod.availableQuantity,
                pricePerKg: prod.pricePerKg,
                discountOffer: prod.discountOffer,
                finalPrice: prod.finalPrice,
                description: prod.description,
                image: prod.image,
            })
        });
    }

    useEffect(() => {
        loadProduct();
    }, [])

    const saveProduct = (e) => {
        e.preventDefault();

        let prod = {
            productName: product.productName,
            availableQuantity: product.availableQuantity,
            pricePerKg: product.pricePerKg,
            discountOffer: product.discountOffer,
            finalPrice: product.finalPrice,
            description: product.description,
            image: (img!='')?img:product.image,
        };
        console.log('product => ' + JSON.stringify(prod))
        ProductServices.updateProduct(id, prod).then(res => {
            res.data!== null && alert(res.data.message + "😃");
            res.data=== null && alert(res.data.message + "🙃");
            props.history.push(`/product-under-category/${id}`)
        });
    }
    return (
        <div>
        <AdminNavbar/>
            <div className="col-md-6 offset-md-3 mt-4">
                <div className='row'>
                    <div className="col-md-4 mr-n4 ">
                        <div className="card h-100 w-100">
                            <img className='h-100 w-100' src={Image} alt="Image"></img>
                        </div>
                    </div>
                    <div className="col">
                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='text-center'>Update Product</h3>
                            </div>
                            <div className="card-body">
                                <div className="row mb-2 m-3">

                                    <div className="row mb-2 m-3">
                                        <div class="input-group input-group-lg">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2"><i class="far fa-images"></i></span>
                                            </div>
                                            <img src={product.image} alt="image" width="10%" />
                                            <input type="file"

                                                onChange={changeImageUrlHandler}
                                            />
                                        </div>
                                    </div>
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fab fa-product-hunt"></i></span>
                                        </div>
                                        <input type="text"
                                            name='productName'
                                            value={product.productName}
                                            class="form-control"
                                            placeholder="Product Name"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="far fa-user"></i></span>
                                        </div>
                                        <input type="text"
                                            name='availableQuantity'
                                            value={product.availableQuantity}
                                            class="form-control"
                                            placeholder="Available Quantity"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-rupee-sign"></i></span>
                                        </div>
                                        <input type="number"
                                            name='pricePerKg'
                                            value={product.pricePerKg}
                                            class="form-control"
                                            placeholder="Price per kg"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-percent"></i> </span>
                                        </div>
                                        <input type="text"
                                            name='discountOffer'
                                            value={product.discountOffer}
                                            class="form-control"
                                            placeholder="Discount"
                                            onChange={changeDiscountOfferHandler}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-rupee-sign"></i></span>
                                        </div>
                                        <input type="number"
                                            name='finalPrice'
                                            value={product.finalPrice}
                                            class="form-control"
                                            placeholder="Final price"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2 m-3">
                                    <div class="input-group input-group-lg">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2"><i class="fas fa-audio-description"></i></span>
                                        </div>
                                        <input type="text"
                                            name='description'
                                            value={product.description}
                                            class="form-control"
                                            placeholder="Description"
                                            onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='card-header'>
                                <div className="mr-1">
                                    <div className='col '>
                                        <button className=' btn btn-outline-primary btn-lg btn-block' onClick={saveProduct}>Save Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductComponent;
