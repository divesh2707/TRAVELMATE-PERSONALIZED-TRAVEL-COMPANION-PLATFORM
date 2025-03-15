import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortablePlaceCard from "./SortablePlaceCard";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Attractions.css";

const Attractions = ({ getImageSrc, famousPlaces, isCustomizing, onPlacesChange, onDaysChange}) => {
  // Initialize state with famous places and group them into days
  const [places, setPlaces] = useState(() =>
    famousPlaces.map((place, index) => ({
      ...place,
      day: Math.floor(index / 3), // Assign days starting from 0
    }))
  );

  // Handle drag-and-drop logic
  const handleDragEnd = (event) => {
    if (!isCustomizing) return; // Enable drag-and-drop only in customization mode
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = places.findIndex((place) => place.place_name === active.id);
    const overIndex = places.findIndex((place) => place.place_name === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    // Reorder places array after drag
    const updatedPlaces = [...places];
    const [movedPlace] = updatedPlaces.splice(activeIndex, 1);
    updatedPlaces.splice(overIndex, 0, movedPlace);

    // Reassign days and balance the activities
    const balancedPlaces = balanceActivities(updatedPlaces);
    setPlaces(balancedPlaces);
    onPlacesChange(balancedPlaces);
  };

  // Rebalance places so each day has at most 3 places
  const balanceActivities = (places) => {
    const grouped = [];
    places.forEach((place, index) => {
      const day = Math.floor(index / 3);
      grouped[day] = grouped[day] || [];
      grouped[day].push({ ...place, day });
    });

    return grouped.flat();
  };

  // Handle the deletion of a place
 // Handle the deletion of a place
const handleDeletePlace = (placeToDelete) => {
  if (!isCustomizing) return; // Enable deletion only in customization mode

  if (places.length <= 1) {
    toast.error("You must have at least one place or activity in your itinerary.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
    return; // Prevent deletion
  }

  console.log("Deleting place:", placeToDelete); // Log the place being deleted
  // Remove the place from the state
  const updatedPlaces = places.filter(place => place.place_name !== placeToDelete.place_name);
  
  console.log("Updated places after deletion:", updatedPlaces); // Log the updated places

  // Re-balance activities after deletion
  const balancedPlaces = balanceActivities(updatedPlaces);
  console.log("Balanced places after deletion:", balancedPlaces); // Log the balanced places

  setPlaces(balancedPlaces); // Update state
  onPlacesChange(balancedPlaces);
};


  // Sort and display places grouped by day
  const renderPlacesByDays = () => {
    const grouped = places.reduce((acc, place) => {
      acc[place.day] = acc[place.day] || [];
      acc[place.day].push(place);
      return acc;
    }, {});

    return Object.entries(grouped).map(([day, dayPlaces]) => (
      <div key={day} className="day-section">
        <h3>Day {parseInt(day) + 1}</h3>
        {dayPlaces.map((place) => (
          <>
          <SortablePlaceCard
            key={place.place_name}
            place={place}
            getImageSrc={getImageSrc}
            handleDeletePlace={isCustomizing ? handleDeletePlace : null}
            isCustomizing={isCustomizing}
          />
      </>
        ))}
      </div>
    ));
  };

  useEffect(() => {
    const numberOfDays = places.length > 0 ? Math.max(...places.map(p => p.day)) + 1 : 0;
    onDaysChange(numberOfDays); // Send updated number of days to parent
  }, [places, onDaysChange]); 


  return (
    <>
    <DndContext onDragEnd={isCustomizing ? handleDragEnd : null}>
      <h2>Attractions</h2>
      <SortableContext items={places.map((place) => place.place_name)}>
        {renderPlacesByDays()}
      </SortableContext>
    </DndContext>
     <ToastContainer />
     </>
  );
};

export default Attractions;
