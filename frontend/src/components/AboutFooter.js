import React, {useContext,useState} from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"; // Import the context
import Modal from "./Modal";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import "../styles/AboutFooter.css"

const AboutFooter=({onLearnMoreClick})=>{
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const { isLoggedIn } = useContext(AuthContext); // Access global state
    const [source, setSource]=useState("login");
    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };


    return(
        <div className='Aboutfooter'>
           <h1 className='about-footer-h1'>TravelMate</h1>
           <p className='about-footer-p'>TravelMate makes travel planning simple and exciting, 
            tailoring every detail to your unique preferences for any getaway or adventure.</p>
                <div className='about-footer-content1'>
                    <h4>Useful links</h4>
                    <Link onClick={onLearnMoreClick}>About</Link>
                    <Link to="/planyourtrip">Plan Your Trip</Link>
                    {!isLoggedIn ? (
                    <>
                        <button onClick={() => {
                            setIsModalOpen(true);
                            setSource("exp");
                        }}>
                           Experiences
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
                    </>
                ) : (
                    <Link  to="/Experiences">
                    Experiences
                </Link>
                )}
                    {!isLoggedIn ? (
                    <>
                        <button onClick={() => {
                            setIsModalOpen(true);
                            setSource("profile");
                        }}>
                           Profile
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
                    </>
                ) : (
                    <Link  to="/profile">
                    Profile
                </Link>
                )}{!isLoggedIn ? (
                    <>
                        <button onClick={() => {
                            setIsModalOpen(true);
                            setSource("history");
                        }}>
                           Bookings
                        </button>
                        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
                    </>
                ) : (
                    <Link  to="/BookingHistory">
                    Bookings
                </Link>
                )}
                </div>
                <div className='about-footer-content2'>
                    <h4>Contact Us</h4>

                <p>Email:{" "}
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=diveshgoel79@gmail.com" target="_blank" rel="noopener noreferrer">
                    diveshgoel79@gmail.com
                    </a>
                </p>
                <p>
                    Phone:{" "}
                    <a href="tel:+917814148043">
                    +91 7814148043
                    </a>
                </p>
                <p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Durga+Colony+Samana,+Punjab" target="_blank" rel="noopener noreferrer">
                    Durga Colony Samana, Punjab
                    </a>
                </p>
                </div>
                <div className='about-footer-content3'>
                <a href="https://www.instagram.com/_divesh.__/"><PiInstagramLogoFill size={40}/></a>
                <a href="https://www.linkedin.com/in/divesh-goel-b8b731324/"><FaLinkedin size={40}/></a>
                <a href="https://www.facebook.com/diveshgoel79"><FaSquareFacebook size={40}/></a>
                </div>
        </div>
    );
};

export default AboutFooter;