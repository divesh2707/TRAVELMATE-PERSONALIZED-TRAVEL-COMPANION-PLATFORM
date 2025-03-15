import React, { useContext, useState, useEffect, useRef } from "react";
import "../styles/BillFormSection.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUsers } from "react-icons/fa";
import Modal from "./Modal.js";

const BillFormSection = ({ famousPlaces, no_of_days, luxuryHotels={}, package_id, city_name, image, custom_package_id }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [source, setSource] = useState("login");
  const [startDate, setStartDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);
  const [showTravelerSelector, setShowTravelerSelector] = useState(false);
  const dropdownRef = useRef(null);

  // Calculate tomorrow's date in YYYY-MM-DD format and its display format
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to current date
    const tomorrowDate = tomorrow.toISOString().split("T")[0]; // Get the date part in YYYY-MM-DD format
    setStartDate(tomorrowDate);
  }, []);

   // Add a click event listener to handle clicks outside the dropdown
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTravelerSelector(false); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculatePickDropCost = () => {
    
    const activityCost = famousPlaces.length * 500;
    const pickDropCost =
      famousPlaces.length % 3 === 0
        ? no_of_days * 1000
        : (no_of_days - 1) * 1000 + 500;
   
    const hotelCost = luxuryHotels.price_per_night * (no_of_days - 1);

    return { activityCost, pickDropCost, hotelCost };
  };

  const { activityCost, pickDropCost, hotelCost } = calculatePickDropCost();
  const totalCost = activityCost + pickDropCost + hotelCost;

  const handleBooking = () => {
    if (isLoggedIn) {
      navigate(`/booking/${package_id}/${city_name}`, {
        state: {totalCost, no_of_days, startDate, adults, infants, image, custom_package_id },
      });
    } else {
      setIsModalOpen(true);
      setSource("booking");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleTravelerSelectorClick = () => {
    setShowTravelerSelector((prev) => !prev); // Toggle the dropdown
  };


  return (
    <div className="bill-section">
      <div className="bill-item-total-cost">From ₹{totalCost}.00</div>
      <p style={{color:"#555", marginTop:"5px", fontSize:"14px"}}>per Adult (Ages 3+ count as adults. Under 3? They're on us!)</p>
      <p style={{color:"black", fontSize:"17px",  marginTop:"15px", fontWeight:"550"}}>Select date & travellers</p>

      <div className="bill-section-buttons">
        <input
          className="date-selector"
          id="date-input"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

<button
  className="Traveller-selector"
  onClick={handleTravelerSelectorClick}
>
  <FaUsers size={20} /> <span className="Travellers-count">{adults + infants}</span>
</button>

{showTravelerSelector && (
  <div ref={dropdownRef} className={`traveler-selector-dropdown ${showTravelerSelector ? 'show' : ''}`}>
    <div className="dropdown-group">
      <label>Adults</label>
      <input
        type="number"
        min="1"
        value={adults}
        onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
      />
    </div>
    <div className="dropdown-group">
      <label>Infants</label>
      <input
        type="number"
        min="0"
        value={infants}
        onChange={(e) => setInfants(Math.max(0, Number(e.target.value)))}
      />
    </div>
  </div>
)}
</div>
      <button className="book-button" onClick={handleBooking}>Reserve Now</button>
      <Modal
        showModal={isModalOpen}
        onClose={handleModalClose}
        source={source}
        city_name={city_name}
        package_id={package_id}
        totalCost={totalCost}
        no_of_days={no_of_days}
        startDate={startDate}
        adults={adults}
        infants={infants}
        image={image}
        custom_package_id={custom_package_id}
      />
    </div>
  );
};

export default BillFormSection;
