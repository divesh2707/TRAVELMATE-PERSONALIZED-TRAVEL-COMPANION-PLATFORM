import React, {useState} from "react";
import axiosInstance from "../api/axios";
import BookingHeader from "../components/BookingHeader";
import BookingCard from "../components/BookingCard";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/Payment.css"

const Payment=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const { totalCost, finalCost, initialAdults, initialInfants, initialStartDate, image, bookingData } = location.state;
    const { city_name } = useParams();
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    
    const handleConfirmBooking=async()=>{
        try{
            setBookingConfirmed(true);
            await axiosInstance.post("/booking/add", bookingData);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <BookingHeader active="2"/>
            <div className="paymentpage">
                <div className="payment-content">
                {!bookingConfirmed ? (
                    <>
                        <h2>Secure Your Booking</h2>
                        <p style={{marginBottom:"10px"}}>We value your trust! To make your booking process hassle-free, we offer </p>
                        <p style={{marginTop:"0px", fontWeight:"bold"}}>**Pay on Arrival (POA)**</p>
                        <ul>
                            <li>You book your travel package online.</li>
                            <li>No upfront payment is required.</li>
                            <li>Pay securely in person when you arrive at your destination.</li>
                            <li>Enjoy a seamless and stress-free travel experience!</li>
                        </ul>
                        <button className="payment-confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
                    </>
                ):(
                    <>
                        <div className="booking-payment-success">
                            <h2>🎉 Booking Confirmed!</h2>
                            <p>Thank you for choosing <strong>TravelMate</strong>. Your journey awaits!</p>
                            <p>A confirmation email has been sent to: <strong>{bookingData.email}</strong></p>
                            <p>Be sure to check your inbox for confirmation and further instructions.</p>
                            <p>It contains all your booking details.</p>
                            <div className="booking-payment-note">
                                <p>✨ <strong>Important:</strong> No upfront payment is required! You will pay upon arrival at your destination.</p>
                            </div>
                            <button className="booking-payment-home-button" onClick={() => navigate("/")}>
                                Go to Home
                            </button>
                        </div>
                    </>
                )}
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