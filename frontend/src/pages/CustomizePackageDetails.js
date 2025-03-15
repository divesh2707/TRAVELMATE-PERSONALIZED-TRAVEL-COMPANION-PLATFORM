import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import PackageDetailsMiddle from "../components/PackageDetailsMiddle";
import BillFormSection from "../components/BillFormSection";
import CustomizeButton from "../components/CustomizeButton.js";
import PackageNavbar from "../components/PackageNavbar.js";
import Loader from "../components/Loader.js";
import "../styles/PackageDetails.css";

const CustomizePackageDetails = () => {
  const navigate = useNavigate();
  const [customizedDetails, setCustomizedDetails] = useState(null);
  const { city_id } = useParams();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [displayPlaces, setDisplayPlaces] = useState(null);
  const [displayHotel, setDisplayHotel] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
          console.warn("User ID is not available yet.");
          return;
        }

        const customizedResponse = await axiosInstance.get(`/customizedPackages/details/${user_id}/${city_id}`);

        if (customizedResponse.data) {
          setCustomizedDetails(customizedResponse.data);
          setDisplayPlaces(customizedResponse.data.famousPlaces);
          setDisplayHotel(customizedResponse.data.hotel);
        } else {
          navigate("/404"); // Redirect if no customized package found
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
        navigate("/404"); // Redirect on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackageDetails();
  }, [city_id, navigate]);

  if (isLoading) return <div style={{marginTop:"250px"}}><Loader /> </div>;

  if (!customizedDetails) {
    return null; // This prevents rendering anything before redirecting
  }

  const handleSaveChanges = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      const updatedData = {
        package_id: customizedDetails.package_id,
        hotel_id: displayHotel.id,
        famousPlaces: displayPlaces.map((place) => ({ place_id: place.id })),
      };

      await axiosInstance.post(`/customizedPackages/add/${user_id}/${city_id}`, updatedData);

      console.log("Customized package saved successfully!");
      setIsCustomizing(false);
      setCustomizedDetails({ ...customizedDetails, hotel: displayHotel, famousPlaces: displayPlaces });
    } catch (error) {
      console.error("Error saving customized package:", error);
    }
  };

  const handleCancelChanges = () => {
    setIsCustomizing(false);
    navigate(0);
  };

  const handleUpdatedPlaces = (newPlaces) => {
    setDisplayPlaces(newPlaces);
  };

  const handleUpdatedHotel = (newHotel) => {
    setDisplayHotel(newHotel);
  };

  const handleDaysChange = (days) => {
    setTotalDays(days);
  };

  const { city } = customizedDetails;
  const { city_name, image } = city;

  return (
    <div>
      <div className="package-details-topback">
        <PackageNavbar />
        <h1 className="package-details-heading">{city_name}</h1>
      </div>
      <div className="PackageDetailsdividation">
        <div className="places-section">
          <PackageDetailsMiddle
            famousPlaces={displayPlaces}
            luxuryHotels={displayHotel}
            isCustomizing={isCustomizing}
            onPlacesChange={handleUpdatedPlaces}
            onHotelChange={handleUpdatedHotel}
            onDaysChange={handleDaysChange}
            totalDays={totalDays}
          />
        </div>

        <div className="bill-section-wrapper">
          <BillFormSection
            no_of_days={totalDays}
            famousPlaces={displayPlaces}
            luxuryHotels={displayHotel}
            package_id={customizedDetails.package_id}
            city_name={city_name}
            image={image}
            custom_package_id={customizedDetails.custom_package_id}
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
            <button className="package-detail-save-button" onClick={handleSaveChanges}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePackageDetails;
