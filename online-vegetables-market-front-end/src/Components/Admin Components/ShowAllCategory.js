import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import CategoryServices from '../../Services/Admin Services/CategoryServices'

const ShowAllCategory = (props) => {
    var i = 0;
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const addCategory = (e) => {
        showModal();
    }

    const viewProducts = (id) => {
        props.props.history.push(`/product-under-category/${id}`);
    }

    const removeCategory=(id)=> {
        CategoryServices.removeCategory(id).then(res => {
            res.data === null && alert("Failed to remove......");
            res.data !== null && alert("Removed Successfully....");
            console.log(res.data);
        });
    }


    const addNewCategory = (e) => {
        e.preventDefault();
        showModal();
        if (categoryImage !== null) {
            console.log(categoryName, categoryImage);
            const formData = new FormData();

            formData.append('file', categoryImage);
            CategoryServices.addCategory(categoryName, formData).then(res => {
                res.data === null && alert("Failed to add......");
                res.data !== null && window.location.reload();
                console.log(res.data);
            });
        }
    }


    const getAllCategories = () => {
        CategoryServices.getAllCategories().then(res => {
            setCategories(res.data);
        })
    }
    useEffect(() => {
        getAllCategories()
    }, []);
    return (
        <div className="m-4">
            <button className="btn btn-outline-primary md-col-4" onClick={addCategory} >Add Category </button>
            {
                categories.map(
                    category =>
                        <div key={category.id}>
                            <div className="card ml-2 mr-2 mb-2 mt-2">
                                <div className="card-body rounded">
                                    <div className="mb-2 h5"> Sr. No. {++i}</div>
                                    <div className="mb-2 h5"> {category.categoryName}</div>
                                    <div className="card rounded mr-1">
                                        <img src={category.categoryImage} style={{ width: "250px", height: "160px" }} alt="Category Image" />
                                    </div>
                                    <button type="button" class="btn btn-outline-info btn-block  mt-2" onClick={(e) => viewProducts(category.id)}  >View Products</button>
                                    <button type="button" class="btn btn-outline-danger btn-block mt-2 " onClick={(e) => removeCategory(category.id)}>Remove</button>
                                </div>
                            </div>
                            <hr />
                        </div>
                )}

            <Modal className="modal-open" show={isOpen} onHide={hideModal} size="lg" backdrop="static">
                <div className="modal-header" >
                    <h5 className="float-center modal-title text-center"> Add Category</h5>
                    <button class="btn btn-outline-danger btn-sm" onClick={hideModal}>X</button>
                </div>
                <div className="col">
                    <div className='card'>

                        <div className="card-body">

                            <div className="row mt-2 m-3">
                                <div class="input-group input-group-lg">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupPrepend2"><i class="far fa-images"></i></span>
                                    </div>
                                    <input type="file"
                                        name='Image'
                                        class="form-control"
                                        id="validationDefaultPassword"
                                        onChange={(event) => {
                                            setCategoryImage(event.target.files[0])
                                        }}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row mb-2 m-3">

                                <div class="input-group input-group-lg">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupPrepend2"></span>
                                    </div>
                                    <input type="text"
                                        name='categoryName'
                                        class="form-control"
                                        value={categoryName}
                                        id="validationDefaultUsername"
                                        onChange={(event) => {
                                            setCategoryName(event.target.value)
                                        }}
                                        placeholder="Category Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='card-header'>
                            <div className="mr-1">
                                <div className='col '>
                                    <button className=' btn btn-outline-primary btn-lg btn-block' onClick={addNewCategory}>Add Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ShowAllCategory;
