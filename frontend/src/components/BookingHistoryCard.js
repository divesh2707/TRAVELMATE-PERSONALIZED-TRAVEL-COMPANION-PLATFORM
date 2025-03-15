import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.js";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import CancelBookingModal from "../components/CancelBookingModal";
import { MdCancelPresentation } from "react-icons/md";
import { TbSearchOff } from "react-icons/tb";
import Loader from "./Loader.js";
import "../styles/BookingHistoryCard.css";

const BookingHistoryCard = ({filters}) => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { user_id } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const res = await axiosInstance.get(`/booking/user/${user_id}`);
        const bookingsWithImages = await Promise.all(
          res.data.map(async (booking) => {
            try {
              const resCity = await axiosInstance.get(`/packages/city_id/${booking.package_id}`);
              const resCityData = await axiosInstance.get(`/cities/${resCity.data.city_id}`);
              const base64Image = `data:image/jpeg;base64,${Buffer.from(resCityData.data.image.data).toString('base64')}`;
              return { ...booking, image: base64Image, city_id: resCity.data.city_id };
            } catch (err) {
              console.error(`Error fetching city data for package ${booking.package_id}:`, err);
              return booking;
            } 
          })
        );
        setBookingHistory(bookingsWithImages.reverse());
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }finally{
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [user_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  const getStatus = (endDate, status) => {
    if (status === "Cancelled") return "Cancelled";
    return new Date(endDate) > new Date() ? "To Be Visited" : "Already Visited";
  };

  const openCancelModal = (booking_id) => {
    setSelectedBookingId(booking_id);
    setIsModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
    try {
      await axiosInstance.put(`/booking/cancel/${selectedBookingId}`);
      setBookingHistory((prev) =>
        prev.map((booking) =>
          booking.booking_id === selectedBookingId ? { ...booking, status: "Cancelled" } : booking
        )
      );
      closeCancelModal();
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  // Apply filters
  const filteredBookings = bookingHistory.filter((booking) => {
    if (!filters) return true; // If filters are null/undefined, return all bookings

    const { 
        city, 
        status, 
        customPackage, 
        priceRange, 
        bookingDateFrom, 
        bookingDateTo, 
        travelDateFrom, 
        travelDateTo 
    } = filters || {}; // Ensure filters is an object

    // Filter by city
    if (city && !booking.city_name?.toLowerCase().includes(city.toLowerCase())) return false;

    // Filter by status
    if (status && getStatus(booking.end_date, booking.status) !== status) return false;

    // Filter by package type
    if (customPackage && ((customPackage === "Yes" && !booking.custom_package_id) || 
                          (customPackage === "No" && booking.custom_package_id))) return false;

    // Filter by price (Ensure priceRange is a valid number)
    if ( booking.total_price > parseInt(priceRange)) return false;

    // Filter by booking date range (Ensure valid date format)
  
    if (bookingDateFrom && new Date(booking.created_at) < new Date(bookingDateFrom)) return false;
    if (bookingDateTo && new Date(booking.created_at) > new Date(bookingDateTo)) return false;

    // Filter by travel date range
    if (travelDateFrom && new Date(booking.start_date) < new Date(travelDateFrom)) return false;
    if (travelDateTo && new Date(booking.end_date) > new Date(travelDateTo)) return false;

    return true;
});


  return (
    <div className="booking-history-container">
      {loading ? (
        <div style={{marginTop:"100px"}}><Loader /> </div>
      ):filteredBookings.length === 0 ? (
        <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", marginTop:"80px"}}>
          <TbSearchOff size={130} color="black"/>
              <div>
                  <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>No,</span> Bookings Found!</h3>
              </div>
          </div>
      ) : (
        filteredBookings.map((booking) => (
          <div key={booking.booking_id} className="booking-history-card" onClick={() => navigate(`/bookedPackageDetails/${booking.city_id}`,
            { state: { custom_package_id: booking.custom_package_id } })}>
            {booking.custom_package_id && (
              <div className="booking-history-customized">Customized</div>
            )}

            <img className="booking-history-image" src={booking.image} alt={booking.city_name} />

            <div className="booking-history-item">
              <div className="booking-history-header">
                <h3>{booking.city_name}</h3>
                <span className="booking-history-date">
                  {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                </span>
              </div>

              <div className="booking-history-details">
                <div className="booking-history-section">
                  <p><strong>Traveler:</strong> {booking.name}</p>
                  <p><strong>Contact:</strong> {booking.phone}</p>
                  <p><strong>Email:</strong> {booking.email}</p>
                </div>

                <div className="booking-history-section">
                  <p><strong>Mode of Arrival:</strong> {booking.arrival_option}</p>
                  <p><strong>Booked At:</strong> {formatDate(booking.created_at)}</p>
                </div>

                <div className="booking-history-section">
                  <p><strong>Adults:</strong> {booking.adults}</p>
                  <p><strong>Infants:</strong> {booking.infants}</p>
                  
                </div>

                <div className="booking-history-price">
                  <div className={`booking-status ${getStatus(booking.end_date, booking.status) === "To Be Visited" ? "pending" :
                     getStatus(booking.end_date, booking.status) === "Cancelled" ? "cancelled" : "completed"}`}>
                    {getStatus(booking.end_date, booking.status)}
                  </div>
                  <div>
                    <strong>Total Price:</strong> ₹{Number(booking.total_price).toLocaleString()}
                  </div>
                </div>
                
                {getStatus(booking.end_date, booking.status) === "To Be Visited" && (
                <div className="cancel-booking-button" onClick={(e) => {
                  e.stopPropagation();
                  openCancelModal(booking.booking_id);
                }}>
                  <MdCancelPresentation size={25} color="red"/>
                </div>
              )}
              </div>

              
            </div>
          </div>
        ))
      )}

      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={closeCancelModal}
        onConfirm={handleCancelBooking}
      />
    </div>
  );
};

export default BookingHistoryCard;
