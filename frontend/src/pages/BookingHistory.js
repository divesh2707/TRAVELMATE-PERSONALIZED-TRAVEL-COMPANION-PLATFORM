import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BookingHistoryHeader from "../components/BookingHistoryHeader.js";
import BookingHistoryCard from "../components/BookingHistoryCard.js";
import { BiSolidMessageError } from "react-icons/bi";
import "../styles/BookingHistory.css";

const BookingHistory = () => {
   const location = useLocation();
  const [filters, setFilters] = useState({
          city: "",
          status: "",
          customPackage: "",
          priceRange: 1000000,
          bookingDateFrom: "",
          bookingDateTo: "",
          travelDateFrom: "",
          travelDateTo: "",
        });
        const handleFilterChange = (newFilters) => {
          setFilters(newFilters); // Keep applied filters
        };
      
        const resetFilters = () => {
          setFilters({
            city: "",
            status: "",
            customPackage: "",
            priceRange: 1000000,
            bookingDateFrom: "",
            bookingDateTo: "",
            travelDateFrom: "",
            travelDateTo: "",
          });
        };

  return (
    <>
    
      <BookingHistoryHeader filters={filters} 
          onFilterChange={handleFilterChange}
          resetFilters={resetFilters} />
          {location.state?.from === "bookingPackageDetails" && 
            <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", paddingTop:"10px"}}>
              <BiSolidMessageError size={130} color="black"/>
              <div>
                  <h3 style={{ fontSize: "55px", margin: "0" }}><span style={{ color: "#2196F3" }}>Oops!</span> No Booking Selected</h3>
                  <p style={{ fontSize: "35px", marginTop: "5px" }}>
                      Please select a booked package to view the details.
                  </p>
              </div>
         </div>
          }
      <BookingHistoryCard filters={filters} />
    </>
  );
};

export default BookingHistory;
