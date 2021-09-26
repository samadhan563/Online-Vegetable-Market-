import React,{useState,useEffect} from 'react';
import ProductServices from '../../Services/Admin Services/ProductServices';
import AdminNavbar from './AdminNavbar';

const ShowAllProducts = (props) => {
    const [products, setProducts] = useState([]);



    const addNewProduct = (id) => {
        props.history.push(`/add-product-page/${id}`);
    }

    const editOldProduct = (id) => {
        props.history.push(`/update-product-details/${id}`);
    }


    const viewOldProduct = (id) => {
        props.history.push(`/view-product-details/${id}`);
    }

    const deleteOldProduct = (id) => {
        ProductServices.deleteProduct(id).then((res) => {
            setProducts(products.filter(product => product.id !== id));
            window.location.reload();
        });
    }

    const loadAllProducts = () => {
        ProductServices.getAllProducts().then(res => {
            res.data != null && setProducts(res.data);
        })
    }
    useEffect(() => {
        loadAllProducts();
    }, [])
    return (
        <div >
            <AdminNavbar />
            <div className="main ml-0 mr-0" >
                <div className="row">
                </div>
                <div className="row">
                    <div className="col center mt-0">
                        <div className="card-mb-3 mt-0 content">
                            {/*<h1 className="m-3 pt-3 text-center"></h1>*/}
                            <div className="card-body ">
                                <h2 className="text-center">Products List</h2>
                                <div className="row ">
                                    <h2><button className="btn btn-primary" onClick={() => addNewProduct("undefind")} >Add New Product</button></h2>
                                </div>
                                <div className="row" >
                                    <table className="table table-hover" >
                                        <thead className="text-center ">
                                            <tr>
                                                <th> Product Name </th>
                                                <th> Product <br />Quantity </th>
                                                <th> Price <br />Per Kg </th>
                                                <th> Product <br />Discount </th>
                                                <th> Product <br />Final Price </th>
                                                <th> Product Decription </th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                products.map(
                                                    product =>
                                                        <tr key={product.id}>
                                                            <td>{product.productName}</td>
                                                            <td>{product.availableQuantity}</td>
                                                            <td>{product.pricePerKg}</td>
                                                            <td>{product.discountOffer}</td>
                                                            <td>{product.finalPrice}</td>
                                                            <td>{product.description}</td>
                                                            <td>
                                                                <button className="btn btn-primary" onClick={() => editOldProduct(product.id)} >Update</button>
                                                                <button className="btn btn-info ml-2" onClick={() => viewOldProduct(product.id)} >View</button>
                                                                <button className="btn btn-danger ml-2" onClick={() => deleteOldProduct(product.id)} >Delete</button>
                                                            </td>

                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowAllProducts;
