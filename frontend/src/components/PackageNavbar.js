import React, { useState, useContext } from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import Modal from "./Modal";
import ProfileIcon from "./profileIcon";
import "../styles/PackageNavbar.css";

const PackageNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const { isLoggedIn } = useContext(AuthContext); // Access global state
    const [source, setSource]=useState("login");

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };

    return (
        <div className="navbar">
            <Link className="navbar-items" to="/" style={{ marginLeft: "100px" }}>
                About
            </Link>
            <Link className="navbar-items" to="/planYourTrip">
                Plan Your Trip
            </Link>

            {!isLoggedIn ? (
                    <>
                        <button className="explicit" onClick={() => {
                            setIsModalOpen(true);
                            setSource("exp");
                        }}>
                           Experiences
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
                    </>
                ) : (
                    <Link className="navbar-items" to="/Experiences">
                    Experiences
                </Link>
                )}

            <div className="navbar-items navbar-right">
                {!isLoggedIn ? (
                    <>
                        <button className="login" onClick={() => {
                            setIsModalOpen(true)
                            setSource("login");
                        }}>
                            Login / Register
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source}/>
                    </>
                ) : (
                    <ProfileIcon />
                )}
            </div>
        </div>
    );
};

export default PackageNavbar;
