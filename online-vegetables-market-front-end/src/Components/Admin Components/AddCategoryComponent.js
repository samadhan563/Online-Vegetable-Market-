import React, { useState } from 'react';
import CategoryServices from '../../Services/Admin Services/CategoryServices';


const AddCategoryComponent = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);


    const addNewCategory = (e) => {
        e.preventDefault();
        if (categoryImage !== null) {
            console.log(categoryName,categoryImage);
            const formData = new FormData();
            
            formData.append('file', categoryImage);
            CategoryServices.addCategory(categoryName, formData).then(res => {
                res.data.result === null && alert("Failed to add......");
                res.data.result !== null && window.location.reload();
                console.log(res.data.result);
            });
        }
    }

    return (
        <div>
            <div className="col-md-6 offset-md-3 mt-4">
                <div className='row'>
                    <div className="col-md-4 mr-n4 ">
                        <div className="card h-100 w-100">
                            <img className='h-100 w-100' src={" "} alt="Image"></img>
                        </div>
                    </div>
                    <div className="col">
                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='text-center'>Add Category</h3>
                            </div>
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
                </div>
            </div>
        </div>

    );
}

export default AddCategoryComponent;
