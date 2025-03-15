import React, { useState, useEffect, useRef } from "react";
import CustomCarousel from '../components/CustomCarousel.js';
import axiosInstance from "../api/axios.js";
import { TbSearchOff } from "react-icons/tb";
import "../styles/Accommodation.css";

const Accommodation = ({ getImageSrc, luxuryHotels, isCustomizing, onHotelChange }) => {
  const [category, setCategory] = useState(`${luxuryHotels.hotel_category}`); // Default to "Luxury" hotels
  const [hotels, setHotels] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);

  // Fetch hotels based on the selected category
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosInstance.get(`/hotels/${luxuryHotels.city_id}/${category}`);
        setHotels(response.data); // Update hotels state with fetched data
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [category,luxuryHotels.city_id]);

  useEffect(() => {
    if (hotels.length > 0) {
      onHotelChange(hotels[0]); // Now it gets the correct hotel
    }
  }, [hotels, onHotelChange]);

  // Close the dropdown when the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener for click events
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setCategory(value); // Update category state
    setIsOpen(false); // Close dropdown after selecting
  };

  return (
    <>
      <h2>Accommodation</h2>
      {isCustomizing && (
       <>
          <div className="Acustom-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
            <span>{category || 'Choose'}</span>
            <i className={`arrow ${isOpen ? 'open' : ''}`}></i>
          </div>
          {isOpen && (
            <ul className="Acustom-dropdown-list" ref={dropdownRef}>
              <li onClick={() => handleSelect('Economy')}>Economy</li>
              <li onClick={() => handleSelect('Standard')}>Standard</li>
              <li onClick={() => handleSelect('Luxury')}>Luxury</li>
            </ul>
          )}
        </>
      )}
      {hotels.length>0 ?(
      hotels.map((hotel, index) => (
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
      ))
    ):(
    <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", marginTop:"30px"}}>
      <TbSearchOff size={130} color="black"/>
      <div>
        <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>Sorry,</span> Nothing there!</h3>
        <p style={{fontSize:"35px", marginTop:"5px"}}>Explore hotels in another category.</p>
      </div>
    </div>
  )}
    </>
  );
};

export default Accommodation;
