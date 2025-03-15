import React from "react";
import { Buffer } from "buffer";
import Accommodation from "./AccomodationSection.js";
import Attractions from "./AttractionSection.js";
import "../styles/PackageDetailsMiddle.css";

const PackageDetailsMiddle = ({famousPlaces, luxuryHotels, isCustomizing, onPlacesChange, onHotelChange, onDaysChange, totalDays}) => {
 
  const handlePlacesChange = (newPlaces) => {
    onPlacesChange(newPlaces);
  };

  const handleHotelChange = (newHotel) => {
    onHotelChange(newHotel);
  };

  const getImageSrc = (buffer) => {
    const base64String = Buffer.from(buffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="package-details">
    <div className="all-section">
      <section className="places-section">
       <Attractions getImageSrc={getImageSrc} famousPlaces={famousPlaces} isCustomizing={isCustomizing} onPlacesChange={handlePlacesChange} onDaysChange={onDaysChange}/>
      </section>
      <section className="hotel-section">
        {totalDays>1 && (<Accommodation getImageSrc={getImageSrc} luxuryHotels={luxuryHotels} isCustomizing={isCustomizing} onHotelChange={handleHotelChange}/>)}
      </section>
      </div>
    </div>
  );
};

export default PackageDetailsMiddle;
