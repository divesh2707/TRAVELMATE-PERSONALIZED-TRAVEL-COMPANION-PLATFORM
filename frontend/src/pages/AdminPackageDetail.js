import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams} from "react-router-dom";
import axiosInstance from "../api/axios.js";
import AdminPackageDetailsMiddle from "../components/AdminPackageDetailsMiddle";
import Loader from "../components/Loader.js";
import PageNotFound from "./PageNotFound";
import "../styles/PackageDetails.css";

const AdminPackageDetails = () => {
  const { isLoggedIn, user_role } = useContext(AuthContext);
  const [packageDetails, setPackageDetails] = useState(null);
  const { city_id } = useParams();
  const [displayPlaces, setDisplayPlaces] =useState(null);
  const [displayHotel,setDisplayHotel] =useState(null);


  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/packages/details/${city_id}`);
        setPackageDetails(response.data);
        setDisplayPlaces(response.data.famousPlaces);
        setDisplayHotel(response.data.luxuryHotels.length > 0 ? response.data.luxuryHotels[0] : null);

      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [city_id]);

  if (!packageDetails ) return <div style={{marginTop:"250px"}}><Loader /> </div>;
  
  const { city } = packageDetails;
  const { city_name } = city;

  if (!isLoggedIn || user_role !== "admin") {
    return <PageNotFound />;
}
  

  return (
    <div>
      <div className="package-details-topback">
        <h1 className="package-details-heading">{city_name}</h1>
      </div>
      <div className="PackageDetailsdividation">
        <div className="places-section">
          <AdminPackageDetailsMiddle famousPlaces={displayPlaces} luxuryHotels={displayHotel} />
        </div>
      </div>

    </div>
  );
};

export default AdminPackageDetails;
