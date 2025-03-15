import React from "react";
import "../styles/CancelBookingModal.css";

const CancelBookingModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{fontSize:"30px", marginBottom:"10px", marginTop:"10px"}}>Cancel Booking</h3>
        <p style={{fontSize:"18px", marginBottom:"15px"}}>Are you sure you want to cancel this booking? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onConfirm}>Yes, Cancel</button>
          <button className="close-button" onClick={onClose}>No, Keep</button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
