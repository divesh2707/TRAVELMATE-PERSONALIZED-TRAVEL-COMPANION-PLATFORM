import React, { useState, useEffect } from "react";
import CustomCarousel from '../components/CustomCarousel.js';
import axiosInstance from "../api/axios.js";
import "../styles/Accommodation.css";

const BookingAccommodation = ({ getImageSrc, luxuryHotels }) => {

  const [hotels, setHotels] = useState([]);
 
  // Fetch hotels based on the selected category
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosInstance.get(`/hotels/${luxuryHotels.city_id}/${luxuryHotels.hotel_category}`);
        setHotels(response.data); // Update hotels state with fetched data
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [luxuryHotels.city_id]);


 

  return (
    <>
      <h2>Accommodation</h2>
       
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-card">
          <div className="carousel">
            <CustomCarousel
              images={[
                getImageSrc(hotel.image_3),
                getImageSrc(hotel.image_2),
                getImageSrc(hotel.image_1),
              ]}
            />
          </div>
          <div className="packagehoteltext">
            <h4>{hotel.hotel_name}</h4>
            <p>{hotel.hotel_description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingAccommodation;
