import React, { useContext,useState } from "react";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { GiJourney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { VscCodeReview } from "react-icons/vsc";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal.js";
import { useNavigate } from "react-router-dom";
import "../styles/ThinSidebar.css"

const ThinSidebar=()=>{
    const navigate = useNavigate();
    const {isLoggedIn} =useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [source, setSource]=useState("login");

    const handleExperiences = () => {
        if (isLoggedIn) {
          navigate("/Experiences");
        } else {
          setIsModalOpen(true);
          setSource("exp");
        }
      };
    
      const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };

    return(
        <div className="Thin-sidebar">
            <h2 className='Thin-sidebar-heading'>TravelMate</h2>
            <ul>
                <li><Link to=""><FaUser size={20}/> <span className='text'>Profile </span> </Link></li>
                <li><Link to="/"><FaHome size={20}/><span className='text'>About</span></Link></li>
                <li><Link to=""><GiJourney size={20}/><span className='text'>Plan Your Trip</span></Link></li>
                <li className="exp-li" onClick={handleExperiences}><VscCodeReview size={20} /><span className='Exp'>Experiences</span></li>
                <li><Link to=""><FaHistory size={20}/> <span className='text'>Bookings</span></Link></li>
            </ul>
            <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} />
        </div>
    );
};

export default ThinSidebar;