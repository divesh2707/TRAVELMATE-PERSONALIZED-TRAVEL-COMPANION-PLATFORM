import React from "react";
import "../styles/Attractions.css"

const AdminAttraction=({getImageSrc,famousPlaces})=>{
    const renderPlacesByDays = () => {
        const placesByDays = [];
        famousPlaces.forEach((place, index) => {
          const day = Math.floor(index / 3) + 1;
          if (!placesByDays[day]) placesByDays[day] = [];
          placesByDays[day].push(place);
        });
    
        return placesByDays.map((places, day) => (
          <div key={day} className="day-section">
            <h3>Day {day}</h3>
            {places.map((place, index) => (
              <div key={index} className="place-card">
                <img src={getImageSrc(place.image)} alt={place.name} className="place-image" />
                <div className="packageplacetext">
                  <h4>{place.place_name}</h4>
                  <p>{place.place_description}</p>
                </div>
              </div>
            ))}
          </div>
        ));
      };
    

    return(
        <>
            <h2>Attractions</h2>
            {renderPlacesByDays()}
        </>
    );
};

export default AdminAttraction;
