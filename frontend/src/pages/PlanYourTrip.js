import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlanTripNavBar from "../components/PlanTripNavBar";
import TripSearchBox from "../components/TripSearchBox";
import PackageCard from "../components/PackageCard.js";
import PlanPart2Carousel from "../components/PlanPart2Carousel.js";
import PlanGrid from "../components/PlanGrid.js";
import { TbSearchOff } from "react-icons/tb";
import { BiSolidMessageError } from "react-icons/bi";
import PlanTripCarousel from "../components/PlanTripCarousel.js";
import Features from "../components/Features.js";
import AboutFooter from "../components/AboutFooter.js";
import "../styles/PlanYourTrip.css";

const PlanYourTrip=()=>{
    const [ids, setIds]=useState([]);
    const [searchtItem, setSearchItem]= useState("");
    const location = useLocation();
    const bookingPaymentRef = useRef(null);
    const resultRef = useRef(null);
    const getIds=(cityIds, city_name)=>{
       setIds(cityIds);
       setSearchItem(city_name);

       if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    }   

    useEffect(() => {
        if (location.state?.from && bookingPaymentRef.current) {
          bookingPaymentRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [location.state]);
    

    return(
        <>
        <div className="planyourtrip">
            <PlanTripNavBar />
                <div className="planheading">
                Effortless Trip Planning Starts with TravelMate
                </div>
            <div ref={resultRef} className="searchContainer">
                <TripSearchBox getIds={getIds}/>
            </div>
        </div>
        <div  className="searchResult" style={{marginBottom:"70px"}}>
            {searchtItem.length >0 && ids.length > 0 ? (
            <>
                <h3 className="searchResult-h3"><span style={{ color: "#2196F3" }}>Searched</span> Tour Packages</h3>
                <div className="searchResultflex">
                    {ids.map((id) => (
                        <PackageCard key={id} id={id} /> // Added key for React optimization
                    ))}
                </div> 
            </>
            ) : searchtItem.length > 0 && ids.length === 0 ?(
            <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center"}}>
               <TbSearchOff size={130} color="black"/>
                <div>
                    <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>Sorry,</span> Nothing there!</h3>
                    <p style={{fontSize:"35px", marginTop:"5px"}}>You can explore downwards</p>
                </div>
            </div>
            ):(<></>)}
        </div>
        <div ref={bookingPaymentRef}>
        {location.state?.from === "booking" && 
        <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", paddingTop:"10px"}}>
        <BiSolidMessageError size={130} color="black"/>
         <div>
             <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>Sorry,</span> In order to book</h3>
             <p style={{fontSize:"35px", marginTop:"5px"}}>You must first choose a travel package.</p>
         </div>
     </div>
        }
        {location.state?.from === "payment" && 
            <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", paddingTop:"10px"}}>
        <BiSolidMessageError size={130} color="black"/>
         <div>
             <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>Sorry,</span> To proceed with payment</h3>
             <p style={{fontSize:"35px", marginTop:"5px"}}>Please select and book a package first.</p>
         </div>
     </div>
        }
        <PlanPart2Carousel />
      </div>
        <PlanGrid />
        <PlanTripCarousel />
        <Features />
        <AboutFooter />
        </>
    );
};

export default PlanYourTrip;
