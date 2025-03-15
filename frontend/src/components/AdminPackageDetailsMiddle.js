import React from "react";
import { Buffer } from "buffer";
import AdminAccommodation from "./AdminAccomodation.js";
import AdminAttraction from "./AdminAttraction.js";
import "../styles/PackageDetailsMiddle.css";

const AdminPackageDetailsMiddle = ({famousPlaces, luxuryHotels}) => {
 
  const getImageSrc = (buffer) => {
    const base64String = Buffer.from(buffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="package-details" style={{marginRight:"80px"}}>
    <div className="all-section">
      <section className="places-section">
       <AdminAttraction getImageSrc={getImageSrc} famousPlaces={famousPlaces} />
      </section>
      <section className="hotel-section">
       { !luxuryHotels ? null : (<AdminAccommodation getImageSrc={getImageSrc} luxuryHotels={luxuryHotels} />)} 
      </section>
      </div>
    </div>
  );
};

export default AdminPackageDetailsMiddle;
