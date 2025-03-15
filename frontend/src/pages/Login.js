import React, {useState, useContext} from "react";
import Modal from "../components/Modal";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import "../styles/Login.css"

const Login=()=>{
    const [isModalOpen, setIsModalOpen] = useState(true); // State to manage modal visibility
    const {isLoggedIn} = useContext(AuthContext);
    const location= useLocation();
    const { source, city_id } = location.state || {};

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
    };
    
    if (isLoggedIn && source!=="exp" && source!=="CustomizePackageDetails" && source!=="profile" && source!=="history") {
        return <Navigate to="/" />;
    }

    return(
        <div className="login-background">
            
        <Modal showModal={isModalOpen} onClose={handleModalClose} source={source} city_id={city_id} />
    
        </div>
    );
};

export default Login;