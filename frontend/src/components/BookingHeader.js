import React from "react";
import "../styles/BookingHeader.css"

const BookingHeader=({active})=>{
    return(
        <div className="BookingHeader">
            <h1 className="Bookingwebsite">TravelMate</h1>
            <div className="Bookingpages">
                <div className="Bookingcurrentpage">
                    <div className={`pageno ${active!=1 ? "active" : ""}`}>1</div>
                    <p>Contact Details</p>
                </div>
                <div className="Bookingcurrentpage">
                    <div className={`pageno ${active!=2 ? "active" : ""}`}>2</div>
                    <p>Confirm Booking</p>
                </div>
            </div>
        </div>
    )
};

export default BookingHeader;