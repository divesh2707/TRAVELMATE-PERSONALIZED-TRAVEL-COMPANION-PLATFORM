import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import CreatePackageHeader from "../components/CreatePackageHeader";
import { LuTableOfContents } from "react-icons/lu";
import { IoTodaySharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import "../styles/AddPackage.css"

const AddPackage = ({ cityId, onBack }) => {
    const navigate = useNavigate();
    // Initialize state for package details
    const [packageDetails, setPackageDetails] = useState(() => {
        // Load package details from localStorage if available
        const savedPackageDetails = localStorage.getItem(`packageDetails-${cityId}`);
        return savedPackageDetails ? JSON.parse(savedPackageDetails) : { no_of_days: "", package_description: "", package_cost: "" };
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageDetails(prev => {
            const updatedDetails = { ...prev, [name]: value };
            // Save updated package details to localStorage
            localStorage.setItem(`packageDetails-${cityId}`, JSON.stringify(updatedDetails));
            return updatedDetails;
        });
    };

    // Submit the package form
    const submitPackage = async (e) => {
        e.preventDefault();
        try {
            // Send the data to backend here (POST request)
            await axiosInstance.post('/packages/add', { ...packageDetails, city_id: cityId });
            // After submission, clear localStorage data to avoid repopulation later
            localStorage.removeItem(`packageDetails-${cityId}`);
            navigate('/adminDashboard');
        } catch (error) {
            console.error('Error adding package:', error);
        }
    };

    return (
        <>
             <CreatePackageHeader active="4" />
             <div className='packmain-content'>
             <h3 className="CityHeading">Package Details </h3>
            <p className="CityParagraph">All fields are required, including the No. of Days, Description, and Cost.</p>
            <form onSubmit={submitPackage}>
            <div className="AddPackage-page">

                <div className="Packageform-group">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop:"18px", marginLeft:"7px" }}> 
                        <LuTableOfContents color="#888" size={25}/>
                        <label style={{margin:"0"}} htmlFor="package_description">Description</label>
                    </div>
                        <textarea name="package_description" placeholder="Enter Package Description" value={packageDetails.package_description} onChange={handleChange} required/>
                </div>

                <div className="Packageform-group">
                    <label htmlFor="no_of_days">No. of Days</label>
                    <div className="Packageformgroupicon"> 
                        <IoTodaySharp color="#888" size={25}/>
                        <input type="text" name="no_of_days" placeholder="Enter the No. of Days" value={packageDetails.no_of_days} onChange={handleChange} required/>
                    </div>
                </div>
        
                <div className="Packageform-group">
                    <label htmlFor="package_cost">Total Cost</label>
                    <div className="Packageformgroupicon"> 
                        <FaRupeeSign color="#888" size={25}/>
                        <input type="number" name="package_cost" placeholder="Enter Package Cost" value={packageDetails.package_cost} onChange={handleChange} required/>
                    </div>
                </div>
            </div>
            <div className='Package-buttons'>
            <button className="Packagenext" onClick={onBack}>Back</button>
            <button className='Packageback' type="submit">Add</button>
            </div>
            </form>
        </div>
        </>
    );
};

export default AddPackage;
