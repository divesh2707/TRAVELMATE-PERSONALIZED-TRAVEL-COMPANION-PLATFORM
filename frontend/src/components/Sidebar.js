import React, {useContext,useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { GiJourney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri"
import { AuthContext } from "../context/AuthContext";
import UploadModal from "./UploadBlogModel";
import "../styles/Sidebar.css";

const Sidebar = ({ fetchBlogs }) => {
     const { logout } = useContext(AuthContext);

      const [isModalOpen, setIsModalOpen] = useState(false);
     
       const handleOpenModal = () => setIsModalOpen(true);
       const handleCloseModal = () => setIsModalOpen(false);
       const handleBlogCreated = () => {
         fetchBlogs();
         console.log("Blog created!");
       };

     const handleLogout=()=>{
        setTimeout(() => {
            logout();  // Logout after 5 seconds
        }, 100);  
     }
    return (
        <div className="sidebar">
            <h2 className='sidebar-heading'>TravelMate</h2>
            <ul>
                <li><Link to="/profile"><span className='icon'><FaUser size={20}/></span> <span className='text'>Profile </span> </Link></li>
                <li><Link to="/"><span className='icon'><FaHome size={20}/></span> <span className='text'>About</span></Link></li>
                <li><Link to="/planYourTrip"><span className='icon'><GiJourney size={20}/></span><span className='text'>Plan Your Trip</span></Link></li>
                <li><Link to="/bookingHistory"><span className='icon'><FaHistory size={20}/></span> <span className='text'>Bookings</span></Link></li>
                <li><Link to="/" onClick={handleLogout}><span className='icon'><RiLogoutBoxFill size={20}/></span> <span className='text'>Logout</span></Link></li>
            </ul>
            <button className='share' onClick={handleOpenModal}>Share Your Experience</button>
            <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBlogCreated={handleBlogCreated}
      />
        </div>
    );
};

export default Sidebar;
