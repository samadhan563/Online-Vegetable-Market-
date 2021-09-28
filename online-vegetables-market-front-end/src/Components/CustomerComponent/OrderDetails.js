import React, { useState, useEffect } from 'react';
import AllServices from '../../Services/AllServices';
import Navbar from './../Animation Component/Navbar';
import AdminNavbar from './../Admin Components/AdminNavbar';

function OrderDetails(props) {
    let counter = 0;
    const [bookingDetails, setBookingDetails] = useState([])
    const [payment, setPayment] = useState({});
    // const [userId, setUserId] = useState();

    const back = () => {
        window.history.back();
    }

  
    const getPaymentDetailsByBookingId = () => {
        AllServices.getPaymentDetailsByBookingId(props.match.params.id).then((res) => {
            res.data !== null && setPayment(res.data);
            console.log(payment)
        })
    }

    const loadRentBookingHistory = () => {
        AllServices.viewOrderDetails(props.match.params.id).then((res) => {
            // console.log(JSON.stringify(res.data.result))
            setBookingDetails(res.data);
        })
    }

    useEffect(() => {
        loadRentBookingHistory();
        getPaymentDetailsByBookingId();
    }, [])

    return (
        <div>
        <AdminNavbar />
            <div className="row ml-2 mt-2 mb-2 mr-2 ">
                <div className="col mt-0">
                    <div className="card border mt-5 ">
                        <div className="card-header bg-secondary text-light">
                            <h4 className="text-center font-weight-bold">Products Details </h4>
                        </div>
                        <table className="table table-hover" >
                            <thead >
                                <tr className="h5">
                                    <th className="border text-center"> Sr.No. </th>
                                    <th className="border text-center"> Product Name</th>
                                    <th className="border text-center"> Quantity </th>
                                    <th className="border text-center"> Offer Discount </th>
                                    <th className="border text-right"> Final Rent </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingDetails.map(
                                        (booking) =>
                                            <tr key={booking.id}>
                                                <td className="border text-center">{++counter}</td>
                                                <td className="border">{booking.productName}</td>
                                                <td className="border text-center">{booking.availableQuantity}</td>
                                                <td className="border text-right">{booking.discountOffer}%</td>
                                                <td className="border text-right">{booking.pricePerKg}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="card-footer mt-n3">
                            <button className="btn btn-outline-warning" onClick={back}>Back</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default OrderDetails;

