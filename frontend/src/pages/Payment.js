import React from "react";
import BookingHeader from "../components/BookingHeader";
import BookingCard from "../components/BookingCard";
import { useLocation, useParams } from "react-router-dom";
import "../styles/Payment.css"

const Payment=()=>{
    const location = useLocation();
    const { totalCost, finalCost, initialAdults, initialInfants, initialStartDate, image } = location.state;
    const { city_name } = useParams();
    return(
        <>
            <BookingHeader active="2"/>
            <div className="paymentpage">
                <div className="PaymentContent">
                    Payment
                </div>
                <div className="booking-form-package-details">
                    <BookingCard city_name={city_name} image={image} initialStartDate={initialStartDate} 
                    adults={initialAdults} infants={initialInfants} finalCost={finalCost} totalCost={totalCost}/>
                </div>  
            </div>
        </>
    );
};

export default Payment;