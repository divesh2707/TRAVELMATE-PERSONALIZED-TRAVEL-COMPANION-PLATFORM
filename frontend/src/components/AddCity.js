import React, { useState, useEffect } from "react";
import axiosInstance from '../api/axios'; // Your axios instance
import { useNavigate } from "react-router-dom";
import CreatePackageHeader from "../components/CreatePackageHeader";
import { FaCity } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { GiModernCity } from "react-icons/gi";
import { FaFileImage } from "react-icons/fa";
import '../styles/AddCity.css'

const AddCity = ({ onNext, onBack, setCityId, cityId }) => {
    const [city, setCity] = useState({ city_name: "", state: "", country: "", image: null });
    const [existingCity, setExistingCity] = useState(null);
    const navigate = useNavigate();
    const [fileUploaded, setFileUploaded] = useState(false);

    useEffect(() => {
        if (cityId) {
            // If cityId exists, fetch the existing city data to allow updating
            fetchCityData(cityId);
        }
    }, []);

    const handleFileChange = (e) => {
        setCity((prev) => ({ ...prev, image: e.target.files[0] }));
        setFileUploaded(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCity((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCityData = async (id) => {
        try {
            const res = await axiosInstance.get(`/cities/${id}`);
            setExistingCity(res.data); // Set existing city data
            setCity({
                city_name: res.data.city_name,
                state: res.data.state,
                country: res.data.country,
                image: null, // Don't overwrite image unless re-uploaded
            });
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    };

    const submitCity = async (event) => {
        event.preventDefault();

        if (city.image===null) {
            alert("Please Upload the Image before proceeding.");
            return;
        }

        const formData = new FormData();
        formData.append("city_name", city.city_name);
        formData.append("state", city.state);
        formData.append("country", city.country);
        if (city.image) formData.append("image", city.image);

        try {
            if (existingCity) {
                // PUT request if the city already exists (update)
                const res = await axiosInstance.put(`/cities/update/${cityId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log(res.data)
                setCityId(res.data.city.id); // Update city ID
                onNext(); // Move to the next step
            } else {
                // POST request if the city is new
                const res = await axiosInstance.post("/cities/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setCityId(res.data.cityId); // Store city ID
                onNext(); // Move to next step
            }
        } catch (error) {
            console.error("Error adding or updating city:", error);
        }
    };

    const deleteCity = async () => {
        try {
            await axiosInstance.delete(`/cities/delete/${cityId}`);
            navigate("/adminDashboard");
        } catch (error) {
            console.error("Error deleting city:", error);
        }
    };

    const handleBack=()=>{
        if(cityId){
            deleteCity();
           }
        onBack();
        navigate("/adminDashboard");
    }

    return (
        <>
        <CreatePackageHeader active="1" />
        <div className="Citymain-content">
        <h3 className="CityHeading">City Details </h3>
        <p className="CityParagraph">All fields are required, including the city name, state, country, and one image upload.</p>
        <form onSubmit={submitCity}>
        <div className="AddCity-page">
              <div className="Cityform-group">
              <label style={{marginTop:"10px"}} htmlFor="city_name">City</label>
              <div className="Cityformgroupicon"> 
                <TbBuildingEstate color="#888" size={25}/>
                <input type="text" name="city_name" placeholder="Enter City Name" value={city.city_name} onChange={handleChange} required/>
              </div>
            </div>

            <div className="Cityform-group">
              <label htmlFor="State">State</label>
              <div className="Cityformgroupicon"> 
                <FaCity color="#888" size={25}/>
                <input type="text" name="state" placeholder="Enter State Name" value={city.state} onChange={handleChange} required />
              </div>
            </div>

            <div className="Cityform-group">
              <label htmlFor="country">Country</label>
              <div className="Cityformgroupicon"> 
                <GiModernCity color="#888" size={25}/>
                <input type="text" name="country" placeholder="Enter Country Name" value={city.country} onChange={handleChange} required />
              </div>
            </div>
        </div>
           
        <div className="Cityfileicon">
            <FaFileImage color="#888" size={25}/>
            <label htmlFor="fileInput" className="Cityfile-label">
            {fileUploaded ? "Uploaded" : "Upload Image"}
               <input type="file" onChange={handleFileChange}  id="fileInput" className="Cityhidden-input"/>
            </label>
        </div>

        <div className="city-buttons">
            <button type="button" className="Cityback" onClick={handleBack}>Discard</button>
            <button type="submit" className="Citynext" >Proceed</button>
        </div>
    </form>
    </div>
    </>
    );
};

export default AddCity;
