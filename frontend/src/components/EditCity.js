import React, { useState, useEffect } from "react";
import axiosInstance from '../api/axios'; // Your axios instance
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import CreatePackageHeader from "../components/CreatePackageHeader";
import { FaCity } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { GiModernCity } from "react-icons/gi";
import { FaFileImage } from "react-icons/fa";
import '../styles/EditCity.css'

const EditCity=({onNext, onBack, cityId})=>{
    const [city, setCity] = useState({ city_name: "", state: "", country: "", image: null });
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    
    useEffect(() => {
        
        if (cityId) {
            // If cityId exists, fetch the existing city data to allow updating
            fetchCityData(cityId);
            }
        }, []);
    
    const fetchCityData = async (id) => {
        try {
            const res = await axiosInstance.get(`/cities/${id}`);
            setCity({
                city_name: res.data.city_name,
                state: res.data.state,
                country: res.data.country,
                image: null, // Don't overwrite image unless re-uploaded
            });
            const base64String = `data:image/jpeg;base64,${Buffer.from(res.data.image.data).toString('base64')}`;
            setPreviewImage(base64String);
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };

    const submitCity = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("city_name", city.city_name);
        formData.append("state", city.state);
        formData.append("country", city.country);
        if (city.image) formData.append("image", city.image);

        try {
            // PUT request if the city already exists (update)
            const res = await axiosInstance.put(`/cities/update/${cityId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            onNext(); // Move to the next step
        } catch (error) {
            console.error("Error adding or updating city:", error);
        }
    };

    const handleBack=()=>{
        onBack();
        navigate("/adminDashboard/allPackages");
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Get the selected file
    if (file) {
        setCity((prev) => ({ ...prev, image: file })); // Update state with the file

        const reader = new FileReader();  // Use FileReader to read file as base64
        reader.onloadend = () => {
            setPreviewImage(reader.result); // Set base64 preview
        };
        reader.readAsDataURL(file); // Convert file to base64
    }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCity((prev) => ({ ...prev, [name]: value }));
    };

    return(
        <>
        <CreatePackageHeader active="1" />
        <div className="Edit-city-page">
            <div className="EditCitymain-content">
            <h3 className="EditCityHeading">City Details </h3>
            <p className="EditCityParagraph">All fields are required, including the city name, state, country, and one image upload.</p>
            <form onSubmit={submitCity}>
            <div className="EditAddCity-page">
                <div className="EditCityform-group">
                <label style={{marginTop:"10px"}} htmlFor="city_name">City</label>
                <div className="EditCityformgroupicon"> 
                    <TbBuildingEstate color="#888" size={25}/>
                    <input type="text" name="city_name" placeholder="Enter City Name" value={city.city_name} onChange={handleChange} required/>
                </div>
                </div>

                <div className="EditCityform-group">
                <label htmlFor="State">State</label>
                <div className="EditCityformgroupicon"> 
                    <FaCity color="#888" size={25}/>
                    <input type="text" name="state" placeholder="Enter State Name" value={city.state} onChange={handleChange} required />
                </div>
                </div>

                <div className="EditCityform-group">
                <label htmlFor="country">Country</label>
                <div className="EditCityformgroupicon"> 
                    <GiModernCity color="#888" size={25}/>
                    <input type="text" name="country" placeholder="Enter Country Name" value={city.country} onChange={handleChange} required />
                </div>
                </div>
            </div>
            
            <div className="EditCityfileicon">
                <FaFileImage color="#888" size={25}/>
                <label htmlFor="fileInput" className="EditCityfile-label">
                    Edit Image
                <input type="file" onChange={handleFileChange}  id="fileInput" className="EditCityhidden-input"/>
                </label>
            </div>

            <div className="Editcity-buttons">
                <button type="button" className="EditCityback" onClick={handleBack}>Cancel</button>
                <button type="submit" className="EditCitynext" >Proceed</button>
            </div>
        </form>
        </div>
        <div className="Editcity-image">
             <img src={previewImage} alt={city.city_name} />
        </div>
    </div>
    </>
    );
};

export default EditCity;