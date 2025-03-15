import React, {useContext, useState} from "react";
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { GiJourney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { VscCodeReview } from "react-icons/vsc";
import { AuthContext } from "../context/AuthContext";
import { RiLogoutBoxFill } from "react-icons/ri"
import "../styles/ProfileSidebar.css"

const ProfileSidebar=()=>{
    const { logout} =useContext(AuthContext);

    const handleLogout=()=>{
        setTimeout(() => {
            logout();  // Logout after 5 seconds
        }, 100);  
     }

    return(
        <div className="Profile-sidebar">
            <h2 className='Profile-sidebar-heading'>TravelMate</h2>
            <ul>
                <li><Link to="/"><FaHome size={20}/><span className='Profile-text'>About</span></Link></li>
                <li><Link to="/planYourTrip"><GiJourney size={20}/><span className='Profile-text'>Plan Your Trip</span></Link></li>
                <li><Link to="/Experiences"><VscCodeReview size={20} /><span className='Profile-text'>Experiences</span></Link></li>
                <li><Link to="/bookingHistory"><FaHistory size={20}/> <span className='Profile-text'>Bookings</span></Link></li>
                <li><Link to="/" onClick={handleLogout}><RiLogoutBoxFill size={20}/><span className='Profile-text'>Logout</span></Link></li>
            </ul>
        </div>
    );
};

export default ProfileSidebar;