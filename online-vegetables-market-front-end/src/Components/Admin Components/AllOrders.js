import React, { useState, useEffect } from 'react'

import ProductServices from '../../Services/Admin Services/ProductServices';
import Navbar from '../Animation Component/Navbar';

function AllOrders(props) {
    let counter = 0;
    const [orders, setOrders] = useState([])

    const back = () => {
        window.history.back();
    }
    const cancelOrder = (id) => {

        ProductServices.cancelOrder(id).then((res) => {
            if (res.data == null) alert("Sorry you can't cancel order");
            else {
                res.data != null && alert("Order Canceld");
                res.data != null && window.location.reload();
            }
        }).catch(err => {
            alert("Sorry you can't cancel order");
        });
    }

    const viewOrderDetails = (id) => {
        props.history.push(`/specific-order-details/${id}`)
    }

    const deliveredOrder= (id) => {
            ProductServices.deliveredOrder(id).then((res) => {
                if (res.data == null) alert("Sorry you can't accept order");
                else {
                    res.data != null && alert("Order Accepted");
                    res.data != null && window.location.reload();
                }
            }).catch(err => {
                alert("Sorry you can't accept order");
            });
        }

    const acceptOrder = (id) => {
        ProductServices.acceptOrder(id).then((res) => {
            if (res.data == null) alert("Sorry you can't accept order");
            else {
                res.data != null && alert("Order Accepted");
                res.data != null && window.location.reload();
            }
        }).catch(err => {
            alert("Sorry you can't accept order");
        });
    }


    const loadAllOrders = () => {
        ProductServices.loadAllOrders().then((res) => {
            console.log(JSON.stringify(res.data))
            setOrders(res.data);
        })
    }

    useEffect(() => {
        loadAllOrders();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">

                    <div className="card-mb-3 mt-0 content">
                        <div style={{ backgroundColor: "lightgrey" }}>
                            <br />
                            <h2 className="text-center font-weight-bold">Orders History </h2>
                            <hr />
                        </div>

                        <div className="card-body mt-n5 ">
                            <div className="card-body mt-n1 ">

                                <div className="row" >
                                    <table className="table table-hover" >
                                        <thead >
                                            <tr className="h5">
                                                <th> Sr. No. </th>
                                                <th> Order Date</th>
                                                <th> Total Amount </th>
                                                <th> Status </th>
                                                <th>Action</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                orders.map(
                                                    (order) =>
                                                        <tr key={order.id}>
                                                            <td>{++counter}</td>
                                                            <td>{order.orderDate}</td>
                                                            <td>{order.totalPrice}</td>
                                                            <td>{order.orderDeliveryStatus}</td>
                                                            <td>
                                                                {order.orderDeliveryStatus === "PENDING" && <button className="btn btn-outline-info mr-2" style={{ borderRadius: "10px" }} onClick={() => acceptOrder(order.id)} >Accept</button>}
                                                                {order.orderDeliveryStatus === "ACCEPTED" && <button className="btn btn-outline-success mr-1" style={{ borderRadius: "10px" }} onClick={() => deliveredOrder(order.id)} >Delivered</button>}
                                                                {order.orderDeliveryStatus === "PENDING"  &&<button className="btn btn-outline-danger mr-1" style={{ borderRadius: "10px" }} onClick={() => cancelOrder(order.id)} >Cancel<i class="fas fa-trash"></i></button>}
                                                                <button className="btn btn-outline-info ml-2" style={{ borderRadius: "10px" }} onClick={() => viewOrderDetails(order.id)} >View <i class="fas fa-info-circle"></i></button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>

                                    </table>
                                    {/* <button className="btn btn-outline-success mt-2 mb-2 h-100" style={{ width: "130px", borderRadius: "10px" }} onClick={() => back()}>Add More <i class="fas fa-plus-circle"></i></button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllOrders;