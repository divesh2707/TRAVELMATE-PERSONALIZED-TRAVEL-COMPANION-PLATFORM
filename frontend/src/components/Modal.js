import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Modal.css";
import Auth from "../pages/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";


const Modal = ({ showModal, onClose, source, package_id, city_name, totalCost, no_of_days, adults, 
    infants, startDate, image, custom_package_id, setIsCustomizing, city_id }) => {
  const { login } = useContext(AuthContext); // Use global login function
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (token, username, user_id, role) => {
    login(token, username, user_id, role); // Update global state
    onClose(); // Close modal

    if (source === "exp") {
      navigate("/Experiences");
    } else if (source === "booking") {
      navigate(`/booking/${package_id}/${city_name}`, {
        state: {totalCost, no_of_days, startDate, adults, infants, image, custom_package_id },
      });
    }else if(source=== "Customize"){
      setIsCustomizing(true);
    }else if(source=== "CustomizePackageDetails"){
      navigate(`/404`);
    }else if(source === "profile"){
      navigate("/profile")
    }else if(source === "history"){
        navigate("/bookingHistory")
    }else {
      navigate("/");
    }
  };
 

  if (!showModal) {
    return null; // Render nothing if the modal isn't meant to be shown
  }

  return  ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        {location.pathname !== "/login" && (
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        )}
        <Auth onLoginSuccess={handleLoginSuccess} source={source} onClose={onClose}/>
      </div>
    </div>,
    document.getElementById("login-modal-root") // Add this div in your HTML
  );
};

export default Modal;
