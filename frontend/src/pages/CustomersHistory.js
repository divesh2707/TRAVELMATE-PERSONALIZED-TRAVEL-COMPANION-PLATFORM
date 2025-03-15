import React, { useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomersHistoryHeader from "../components/CustomersHistoryHeader.js";
import CustomersHistoryCard from "../components/CustomersHistoryCard.js";
import { BiSolidMessageError } from "react-icons/bi";
import "../styles/BookingHistory.css";
import { AuthContext } from "../context/AuthContext.js";
import PageNotFound from "./PageNotFound.js";

const CustomersHistory = () => {
  const {user_id} = useParams();
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
        const { isLoggedIn, user_role } = useContext(AuthContext);

    if (!isLoggedIn || user_role !== "admin") {
        return <PageNotFound />;
    }

  return (
    <>
    
      <CustomersHistoryHeader filters={filters} 
          onFilterChange={handleFilterChange}
          resetFilters={resetFilters} />
          {location.state?.from === "CustomerbookingPackageDetails" && 
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
      <CustomersHistoryCard filters={filters} user_id={user_id} />
    </>
  );
};

export default CustomersHistory;
