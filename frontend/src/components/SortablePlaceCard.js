import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { MdDelete } from "react-icons/md";

const SortablePlaceCard = ({ place, handleDeletePlace, getImageSrc, isCustomizing }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: place.place_name, // Use the place name as the ID
    disabled: !isCustomizing, // Disable drag-and-drop when not customizing
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition: transition || undefined,
    cursor: isCustomizing ? "grab" : "default",
  };
 
  return (
    <div className="deleteandcard sortable-item">
      <div
        ref={setNodeRef}
        {...(isCustomizing ? listeners : {})} // Apply drag listeners only when customizing
        {...(isCustomizing ? attributes : {})} // Apply drag attributes only when customizing
        className="place-card"
        style={style}
      >
        <img src={getImageSrc(place.image)} alt={place.place_name} className="place-image" />
        <div className="packageplacetext">
          <h4>{place.place_name}</h4>
          <p>{place.place_description}</p>
        </div>
      </div>
      {isCustomizing && (
        <button className="delete-button" onClick={() => handleDeletePlace(place)}>
          <MdDelete />
        </button>
      )}
    </div>
  );
};

export default SortablePlaceCard;
