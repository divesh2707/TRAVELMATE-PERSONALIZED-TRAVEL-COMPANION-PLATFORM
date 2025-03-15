import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axios.js";
import AdminPopularPackageCard from "./AdminPopularPackageCard.js"
import "../styles/PlanPart2Carousel.css"

const AdminDashboardCarousel=()=>{
    const carouselRef = useRef(null);
    const [popularBookingsIds, setPopularBookingsIds] = useState([]);

    useEffect(() => {
        const fetchPopularBookings = async () => {
            try {
                const res = await axiosInstance.get('/adminDashboard/charts/popular-bookings');
                const package_ids =res.data.map((city)=>city.package_id);
                const city_ids= await Promise.all(
                    package_ids.map(async (id)=>{
                    const response= await axiosInstance.get(`/packages/city_id/${id}`);
                    return response.data.city_id;
                }))
                setPopularBookingsIds(city_ids);
                
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchPopularBookings();
    }, []);

    const scrollLeft = () => {
      carouselRef.current.scrollBy({
        left: -400, // Adjust based on the card width + margin
        behavior: "smooth",
      });
    };
  
    const scrollRight = () => {
      carouselRef.current.scrollBy({
        left: 400, // Adjust based on the card width + margin
        behavior: "smooth",
      });
    };
  
  
    return(
        <div className="plan-part2-carousel">
        <h3 className="plan-part2-carousel-h3" style={{marginBottom:"20px", marginTop:"50px"}}>
          <span style={{ color: "#2196F3" }}>Most</span> Booked Packages
        </h3>
        <div className="carousel-container">
          <button className="carousel-btn left-btn" onClick={scrollLeft}>
          &#10094;
          </button>
          <div className="carousel" ref={carouselRef}>
            {popularBookingsIds.map((id) => (
                <AdminPopularPackageCard key={id} id={id}  />
            ))}
          </div>
          <button className="carousel-btn right-btn" onClick={scrollRight}>
          &#10095;
          </button>
        </div>
      </div>

    );
};

export default AdminDashboardCarousel;