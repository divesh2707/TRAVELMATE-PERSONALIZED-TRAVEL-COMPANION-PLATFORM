import React, { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import Modal from "./Modal";
import ProfileIcon from "./profileIcon";
import "../styles/Nav_bar.css";

const Nav_bar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const { isLoggedIn } = useContext(AuthContext); // Access global state
    const [source, setSource]=useState("login");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };

    return (
        <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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

export default Nav_bar;
