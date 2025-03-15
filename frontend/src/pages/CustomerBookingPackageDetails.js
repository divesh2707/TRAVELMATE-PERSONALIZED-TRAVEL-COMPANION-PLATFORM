import React, { useState, useEffect, useContext } from "react";

import { useParams, useLocation} from "react-router-dom";
import axiosInstance from "../api/axios.js";
import BookingPackageDetailMiddle from "../components/BookingPackageDetailMiddle";
import "../styles/PackageDetails.css";
import Loader from "../components/Loader.js";


const CustomerBookingPackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState(null);
  const location = useLocation();
  const { city_id } = useParams();
  const [displayPlaces, setDisplayPlaces] =useState(null);
  const [displayHotel,setDisplayHotel] =useState(null);
  const customPackageId = location.state?.custom_package_id || null;

  console.log(customPackageId)

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        if(!customPackageId){
            const response = await axiosInstance.get(`/packages/details/${city_id}`);
            setPackageDetails(response.data);
            setDisplayPlaces(response.data.famousPlaces);
            setDisplayHotel(response.data.luxuryHotels.length > 0 ? response.data.luxuryHotels[0] : null);
        }else{
            const response = await axiosInstance.get(`/customizedPackages/details/${customPackageId}`);
            setPackageDetails(response.data);
            setDisplayPlaces(response.data.famousPlaces);
            setDisplayHotel(response.data.hotel);
        }
        

      } catch (error) {
        console.error("Error fetching package details:", error);
      } 
    };

    fetchPackageDetails();
  }, [city_id]);

  if (!packageDetails ) return <div style={{marginTop:"250px"}}><Loader /> </div>;
  
  const { city } = packageDetails;
  const { city_name } = city;

  

  return (
    <div>
      <div className="package-details-topback">
        <h1 className="package-details-heading">{city_name}</h1>
      </div>
      <div className="PackageDetailsdividation">
        <div className="places-section">
          <BookingPackageDetailMiddle famousPlaces={displayPlaces} luxuryHotels={displayHotel} />
        </div>
      </div>

    </div>
  );
};

export default CustomerBookingPackageDetails;
