import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import BookingCard from "../components/BookingCard";
import BookingHeader from "../components/BookingHeader";
import "../styles/Booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { city_name, package_id } = useParams();
  const { totalCost, no_of_days, adults: initialAdults, infants: initialInfants, startDate: initialStartDate, image, custom_package_id } = location.state;
  const { username, user_id } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: username || "",
    phone: "",
    email: "",
    flightOption: "self",
  });
  const [finalCost, setFinalCost] = useState(0);
  const [endDate, setEndDate] = useState("");
  

  // Fetch user email
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/emailbyusername?username=${username}`
        );
        setFormData((prev) => ({ ...prev, email: response.data.email }));
        
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    if (username) fetchUserEmail();
  }, [username]);

  // Calculate final cost
  useEffect(() => {
    const calculateCost = () => {
      setFinalCost(initialAdults * totalCost);
    };
    calculateCost();
  }, [formData.adults, totalCost, initialAdults]);

  // Calculate end date based on start date and number of days
  const calculateEndDate = (startDate, noOfDays) => {
    const start = new Date(startDate);
    start.setDate(start.getDate() + noOfDays);
    
  // Extract day, month, and year
  const day = String(start.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(start.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(start.getFullYear()).padStart(4,'0');

  // Return in DD-MM-YYYY format
  return `${day}-${month}-${year}`;
  };

  useEffect(()=>{
    try{
      const end = calculateEndDate(initialStartDate, no_of_days);
      setEndDate(end);
    }catch(err){
      console.log(err);
    }
  },[initialStartDate, no_of_days]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const bookingData = {
      user_id,
      email: formData.email,
      package_id,
      city_name,
      total_price: finalCost,
      start_date: initialStartDate,
      end_date: endDate,
      name: formData.name,
      phone: formData.phone,
      adults: initialAdults,
      infants: initialInfants,
      arrival_option: formData.flightOption,
      custom_package_id: custom_package_id
    };
      // await axiosInstance.post("/booking/add", bookingData);
      navigate(`/booking/${package_id}/${city_name}/payment`,{
        state:{city_name, image, initialStartDate, initialAdults, initialInfants, finalCost, totalCost, bookingData},
      });
  };

  return (
    <>
    <BookingHeader active="1"/>
    <div className="booking-page">  
        <div className="bookingform-section1">
          <div className="user-details">
            <h3>Contact Details </h3>
            <p>We'll use this information to send you confirmation and updates about your booking.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
             <div className="formgroupicon"> 
             <FaUser color="#888"  size={25}/> 
             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your Name" required />
            </div>
            </div>

            <div className="form-group">
              <label  htmlFor="email">Email</label>
              <div className="formgroupicon">
              <MdEmail color="#888" size={25}/>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="formgroupicon">
              <FaPhoneAlt color="#888"size={25} />
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} 
              placeholder="Enter your Phone Number" required style={{width:"310px"}} />
              </div>
            </div>

            <div className="booking-flight">
              <div style={{display:"flex", alignItems:"center"}}>
                <MdFlight color="#888" size={30}/>
              <label style={{marginLeft:"10px", lineHeight:"1"}}>Arrival</label>
              </div>
              <div style={{ display:"flex", fontSize:"20px", gap:"10px" , marginLeft:"30px"}}>
                <input type="radio" name="flightOption" value="self" checked={formData.flightOption === "self"} onChange={handleChange}/>
                I will arrange my own travel
                </div>
                <div style={{ display:"flex", fontSize:"20px", gap:"10px", marginLeft:"30px"}}>
               <input type="radio" name="flightOption" value="book" checked={formData.flightOption === "book"} onChange={handleChange}/>
                Book flight via TravelMate
                </div>
            </div>
            <button type="submit" className="submit-button">
                    Proceed to Confirm
            </button>
            </form>
          </div>

          <div className="booking-form-package-details">
          <BookingCard city_name={city_name} image={image} initialStartDate={initialStartDate} 
           adults={initialAdults} infants={initialInfants} finalCost={finalCost} totalCost={totalCost}/>
          </div>
         </div>
    </div>
    </>
  );
};

export default Booking;
