import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri"
import axiosInstance from "../api/axios";
import { Link } from 'react-router-dom'; 
import "../styles/profileIcon.css";

const ProfileIcon = () => {
    const { logout } = useContext(AuthContext);
    const { username } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [profilePhoto, setProfilePhoto]=useState(null);

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;
    
                const response = await axiosInstance.get(`/users/get-profile-photo?user_id=${userId}`);
    
                if (response.data.profilePhoto) {
                    setProfilePhoto(response.data.profilePhoto); // No need to convert manually
                }
            } catch (err) {
                console.log("Error fetching profile photo:", err);
            }
        };
        fetchProfilePhoto();
    }, []);  

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="profile-container" ref={dropdownRef}>
            {/* Profile Icon */}
            <div className="profile-icon" onClick={toggleDropdown}>
            {!profilePhoto?(<FaUserCircle size={25} color="white" />):
                <img src={profilePhoto} alt="profile-photo"/>}
                <p className="name">{username}</p>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="dropdown-menu">
                   <div className="dropdown-item"><Link className="dropdown-text" to="/profile"><FaUser size={20} color="black" /><span className="drop-text2">Profile</span></Link></div>
                   <div className="dropdown-item"><Link className="dropdown-text" to="/planyourtrip"><GiJourney  size={20} color="black" /><span className="drop-text2">Trips</span></Link></div>
                   <div className="dropdown-item"><Link className="dropdown-text" to="/Experiences"><GoCodeReview size={20} color="black" /><span className="drop-text2">Feed</span></Link></div> 
                   <div className="dropdown-item"><Link className="dropdown-text" to="/bookingHistory"><FaHistory size={20} color="black" /><span className="drop-text2">Bookings</span></Link> </div> 
                   <div className="dropdown-item"><Link className="dropdown-text" to="" onClick={logout}><RiLogoutBoxFill size={20} color="black" /><span className="drop-text2">Logout</span></Link> </div> 
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
