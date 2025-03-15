import React, { useState, useContext } from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import Modal from "./Modal";
import ProfileIcon from "./profileIcon";
import "../styles/PlanTripNavBar.css";

const BookingHistoryNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const { isLoggedIn } = useContext(AuthContext); // Access global state
    const [source, setSource]=useState("login");


    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };

    return (
        <div className='PlanTripnavbar'>
            <Link className="PlanTripnavbar-items" to="/" style={{ marginLeft: "100px" }}>
                About
            </Link>
            <Link className="PlanTripnavbar-items" to="/planYourTrip">
                Plan Your Trip
            </Link>

            {!isLoggedIn ? (
                    <>
                        <button className="PlanTripexplicit" onClick={() => {
                            setIsModalOpen(true);
                            setSource("exp");
                        }}>
                           Experiences
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
                    </>
                ) : (
                    <Link className="PlanTripnavbar-items" to="/Experiences">
                    Experiences
                </Link>
                )}

        </div>
    );
};

export default BookingHistoryNavbar;
