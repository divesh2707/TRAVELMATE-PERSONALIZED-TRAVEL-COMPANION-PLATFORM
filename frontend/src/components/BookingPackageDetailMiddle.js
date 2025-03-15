import React, {useState} from "react";
import { Buffer } from "buffer";
import BookingAccommodation from "./BookingAccommodation.js";
import BookingAttraction from "./BookingAttraction.js";
import "../styles/PackageDetailsMiddle.css";

const BookingPackageDetailMiddle = ({famousPlaces, luxuryHotels}) => {
  const [totalDays, setTotalDays] = useState(0);
  const getImageSrc = (buffer) => {
    const base64String = Buffer.from(buffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const fetchDays=(d)=>{
    setTotalDays(d);
  }

  return (
    <div className="package-details" style={{marginRight:"80px"}}>
    <div className="all-section">
      <section className="places-section">
       <BookingAttraction getImageSrc={getImageSrc} famousPlaces={famousPlaces} fetchDays={fetchDays}/>
      </section>
      <section className="hotel-section">
       { totalDays===1 ? null : (<BookingAccommodation getImageSrc={getImageSrc} luxuryHotels={luxuryHotels} />)} 
      </section>
      </div>
    </div>
  );
};

export default BookingPackageDetailMiddle;
