import React, {useState} from "react";
import axiosInstance from "../api/axios";
import { Buffer } from 'buffer';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {useNavigate} from "react-router-dom"
import "../styles/AllPackageCard.css"

const AllPackageCard=({city_name, image, city_id, removeCityFromUI})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate =useNavigate();

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString('base64'); // Use Node.js Buffer for conversion
        return `data:image/jpeg;base64,${base64String}`;
    };

    const handleDelete=async(e)=>{
        e.stopPropagation();
        try{
            await axiosInstance.delete(`/cities/delete/${city_id}`)
            removeCityFromUI(city_id);
        }catch(err){
            console.log(err)
        }
    }

    const handleEdit=(event)=>{
        event.stopPropagation();
        navigate(`/adminDashboard/editPackage/${city_id}`);
    }

    const openDeleteModal = (event) => {
        event.stopPropagation(); // Prevents navigating to package details
        setIsModalOpen(true);
    };

    return(
        <div className="all-package-card" onClick={()=>{
            navigate(`/adminDashboard/packageDetails/${city_id}`);
        }}>
            <img src={getImageSrc(image)} alt={city_name} /> 
            <h3>{city_name}</h3>
            <div>
                <div className="all-package-card-edit" onClick={handleEdit}><RiEdit2Fill size={25}/></div>
                <div className="all-package-card-delete" onClick={openDeleteModal}><MdDelete size={25}/></div>
            </div>

            <DeleteConfirmationModal 
                isOpen={isModalOpen} 
                onClose={(event) => {
                    event.stopPropagation(); // Prevents redirection when clicking cancel
                    setIsModalOpen(false);
                }} 
                onConfirm={handleDelete} 
                cityName={city_name}
            />

        </div>
    );
};

export default AllPackageCard;