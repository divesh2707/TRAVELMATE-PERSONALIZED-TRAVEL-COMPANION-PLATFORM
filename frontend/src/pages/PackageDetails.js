import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import PackageDetailsMiddle from "../components/PackageDetailsMiddle";
import Loader from "../components/Loader.js";
import BillFormSection from "../components/BillFormSection";
import CustomizeButton from "../components/CustomizeButton.js";
import PackageNavbar from "../components/PackageNavbar.js";
import "../styles/PackageDetails.css";

const PackageDetails = () => {
  const navigate= useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const { id } = useParams();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [displayPlaces, setDisplayPlaces] =useState(null);
  const [displayHotel,setDisplayHotel] =useState(null);
  const [totalDays, setTotalDays] = useState(0);
  

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/packages/details/${id}`);
        setPackageDetails(response.data);
        setDisplayPlaces(response.data.famousPlaces);
        setDisplayHotel(response.data.luxuryHotels.length > 0 ? response.data.luxuryHotels[0] : null);

      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (!packageDetails ) return <div style={{marginTop:"250px"}}><Loader /> </div>;
  
  const { city, package: packageInfo } = packageDetails;
  const { city_name, image } = city;
  const { id: package_id } = packageInfo[0];

  const handleSaveChanges = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const city_id = city.id;

      const updatedData = {
        package_id,
        hotel_id: displayHotel.id, // Send the selected hotel
        famousPlaces: displayPlaces.map((place) => ({ place_id: place.id })),
      };

      await axiosInstance.post(`/customizedPackages/add/${user_id}/${city_id}`, updatedData);

      console.log("Customized package saved successfully!");
      setIsCustomizing(false);
      navigate(`/CustomizePackageDetail/${city_id}`);
    } catch (error) {
      console.error("Error saving customized package:", error);
    }
  };

  const handleCancelChanges = () => {
    setIsCustomizing(false);
    navigate(0);
  };

  const handleUpdatedPlaces = (newPlaces) => {
    setDisplayPlaces(newPlaces); // Directly update the display places
  };

  const handleUpdatedHotel = (newHotel) => {
    setDisplayHotel(newHotel);
  };

  const handleDaysChange = (days) => {
    setTotalDays(days);
  };
  

  return (
    <div>
      <div className="package-details-topback">
        <PackageNavbar />
        <h1 className="package-details-heading">{city_name}</h1>
      </div>
      <div className="PackageDetailsdividation">
        <div className="places-section">
          <PackageDetailsMiddle famousPlaces={displayPlaces} luxuryHotels={displayHotel} isCustomizing={isCustomizing} 
          onPlacesChange={handleUpdatedPlaces} onHotelChange={handleUpdatedHotel}  onDaysChange={handleDaysChange} totalDays={totalDays}/>
        </div>

        <div className="bill-section-wrapper">
          <BillFormSection
            no_of_days={totalDays}
            famousPlaces={displayPlaces}
            luxuryHotels={displayHotel}
            package_id={package_id}
            city_name={city_name}
            image={image}
            custom_package_id={null}
          /> 
        </div>
      </div>

      <div className="customize-button-container">
        {!isCustomizing ? (
          <CustomizeButton setIsCustomizing={setIsCustomizing} />
        ) : (
          <div className="save-cancel">
            <button className="package-detail-cancel-button" onClick={handleCancelChanges}>
              Cancel
            </button>
            <button className="package-detail-save-button" onClick={handleSaveChanges} >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;
