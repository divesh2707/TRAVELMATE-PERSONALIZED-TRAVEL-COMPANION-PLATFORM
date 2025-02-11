import React, {useState, useContext} from "react";
import "../styles/CustomizeButton.css"
import { BiSolidCustomize } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext"; // Import the context
import Modal from "./Modal";

const CustomizeButton=({setIsCustomizing})=>{
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const { isLoggedIn } = useContext(AuthContext); // Access global state
    const [source, setSource]=useState("Customize");

    const handleClick = () => {
        if (isLoggedIn) {
          setIsCustomizing(true); // Allow customization
        } else {
          setIsModalOpen(true); // Show login modal
        }
      };
    

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        
    };


    return(
        <>
        <button className="Customize-button" onClick={handleClick}> < BiSolidCustomize size={25}/> Personalize</button>
        <Modal
        showModal={isModalOpen}
        onClose={handleModalClose}
        source={source}
        setIsCustomizing={setIsCustomizing}
      />
      </>
    );
};

export default CustomizeButton;