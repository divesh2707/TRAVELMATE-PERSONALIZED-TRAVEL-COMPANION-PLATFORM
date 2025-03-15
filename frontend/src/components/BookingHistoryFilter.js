import React, { useState } from "react";
import "../styles/BookingHistoryFilter.css";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaSlidersH, FaCity } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFillCalendarDateFill } from "react-icons/bs";

const BookingHistoryFilter = ({ filters, onFilterChange, resetFilters, setIsFilterModalOpen }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempFilters({ ...tempFilters, [name]: value });
  };

  const handleApply = () => {
    onFilterChange(tempFilters); // Apply changes to the main filters
    setIsFilterModalOpen(false); // Close modal
  };

  return (
    <div className="booking-history-filters-container">
      <h2 className="booking-history-filter-title">Filter Your Bookings</h2>

      <label className="booking-history-filter-label"><FaCity size={20} color="#999"/>City</label>
      <input
        type="text"
        name="city"
        placeholder="Search by City"
        className="booking-history-filter-input"
        value={tempFilters.city}
        onChange={handleChange}
      />

      <div className="booking-history-filter-group">
        <label className="booking-history-filter-label"><FaSlidersH size={20} color="#999"/>Status</label>
        <div className="booking-history-filter-options">
          <label><input type="radio" name="status" value="" checked={tempFilters.status === ""} onChange={handleChange} /> All</label>
          <label><input type="radio" name="status" value="To Be Visited" checked={tempFilters.status === "To Be Visited"} onChange={handleChange} /> To Be Visited</label>
          <label><input type="radio" name="status" value="Already Visited" checked={tempFilters.status === "Already Visited"} onChange={handleChange} /> Already Visited</label>
          <label><input type="radio" name="status" value="Cancelled" checked={tempFilters.status === "Cancelled"} onChange={handleChange} /> Cancelled</label>
        </div>
      </div>
      
      <div className="booking-history-filter-group">
        <label className="booking-history-filter-label"><IoIosRadioButtonOn size={20} color="#999"/>Package Type</label>
        <div className="booking-history-filter-options">
          <label><input type="radio" name="customPackage" value="" checked={tempFilters.customPackage === ""} onChange={handleChange} /> All</label>
          <label><input type="radio" name="customPackage" value="Yes" checked={tempFilters.customPackage === "Yes"} onChange={handleChange} /> Customized</label>
          <label><input type="radio" name="customPackage" value="No" checked={tempFilters.customPackage === "No"} onChange={handleChange} /> Standard</label>
        </div>
      </div>

      <div className="booking-history-filter-group">
        <label className="booking-history-filter-label"><IoIosPricetag size={20} color="#999"/>Price Range: ₹0 - ₹{tempFilters.priceRange}</label>
        <input
          type="range"
          name="priceRange"
          min="0"
          max="1000000"
          step="100"
          className="booking-history-filter-slider"
          value={tempFilters.priceRange}
          onChange={handleChange}
        />
      </div>

      <div className="booking-history-filter-group">
        <label className="booking-history-filter-label"><SlCalender size={20} color="#999"/>Select Booking Period</label>
        <div className="booking-history-date-range">
          <input type="date" name="bookingDateFrom" value={tempFilters.bookingDateFrom} onChange={handleChange} />
          <input type="date" name="bookingDateTo" value={tempFilters.bookingDateTo} onChange={handleChange} />
        </div>
      </div>

      <div className="booking-history-filter-group">
        <label className="booking-history-filter-label"><BsFillCalendarDateFill size={20} color="#999"/>Select Travelling Period</label>
        <div className="booking-history-date-range">
          <input type="date" name="travelDateFrom" value={tempFilters.travelDateFrom} onChange={handleChange} />
          <input type="date" name="travelDateTo" value={tempFilters.travelDateTo} onChange={handleChange} />
        </div>
      </div>

      <div className="booking-history-buttons">
        <button className="booking-history-cancel-button" onClick={() => setIsFilterModalOpen(false)}>Cancel</button>
        <button 
          className="booking-history-remove-button" 
          onClick={() => setTempFilters({
            city: "",
            status: "",
            customPackage: "",
            priceRange: 1000000,
            bookingDateFrom: "",
            bookingDateTo: "",
            travelDateFrom: "",
            travelDateTo: ""
          })}>
          Remove All Filters
        </button>
        <button className="booking-history-apply-button" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default BookingHistoryFilter;
