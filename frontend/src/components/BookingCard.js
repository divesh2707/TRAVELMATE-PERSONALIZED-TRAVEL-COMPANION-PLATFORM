import React, {useState, useEffect} from "react";
import { Buffer } from "buffer";
import { FaUsers } from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import "../styles/BookingCard.css"

const BookingCard=({city_name, image, initialStartDate, finalCost, totalCost, adults, infants})=>{
    const [formattedStartDate, setFormattedStartDate] = useState("");

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString("base64");
        return `data:image/jpeg;base64,${base64String}`;
      };

      const modifyStartDate = (start) => {
        // Ensure `start` is a Date object
        const date = new Date(start);
        // Extract day, month, and year
        // Format the date using Intl.DateTimeFormat
       const options = { year: "numeric", month: "long", day: "numeric" };
       return new Intl.DateTimeFormat("en-US", options).format(date);
      };

    useEffect(()=>{
        // console.log(initialStartDate)
        setFormattedStartDate(modifyStartDate(initialStartDate));
    },[initialStartDate])

    return(
        <div className="bookingCard">
            <div className="bookingCardHeader">   
                <h1 className="bookingCardHeader-h1">{city_name}</h1> 
                <img src={getImageSrc(image)} alt={city_name.city_name} />
            </div>
            <div className="bookingCardMiddle">
                <div className="bookingCardMiddleContent">
                    <div className="contentfirst"><MdOutlineDateRange size={25}/> <span style={{lineHeight:"1.6"}}>Date</span></div>
                    <p>{formattedStartDate}</p>
                </div>
                
                <div className="bookingCardMiddleContent">
                    <div className="contentfirst"><FaUsers size={25}/><span style={{lineHeight:"1.6"}}>Adults</span></div>
                    <p>{adults} X ₹{totalCost}.00</p>
                </div>
                <div className="bookingCardMiddleContent">
                    <div className="contentfirst"><LuBaby size={25}/><span style={{lineHeight:"1.6"}}>Infants</span></div>
                    <p>{infants} (Inclusive Benefit)</p>
                </div>
            </div>
            <div className="Footer">
            <div className="bookingCardMiddleContent">
                    <div className="contentfirst"><FaMoneyCheck size={25} color="black"/><span style={{lineHeight:"1.2", fontSize:"20px", color:"black", fontWeight:"bold"}}>Total</span></div>
                    <p>₹{finalCost}.00</p>
                </div>
            </div>

        </div>
    )
};

export default BookingCard