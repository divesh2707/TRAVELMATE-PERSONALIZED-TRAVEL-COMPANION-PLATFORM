import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axios';
import CreatePackageHeader from "../components/CreatePackageHeader";
import { FaPlaceOfWorship } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import "../styles/AddPlace.css"

const AddPlace = ({ cityId, onBack, onNext, hotelCount }) => {
    const [places, setPlaces] = useState([{ place_name: "", place_description: "", image: null, fileUploaded: false }]); // Start with one place
    const placeRefs = useRef([]);

    // Fetch places when component mounts
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosInstance.get(`/places/city/${cityId}`);
                const fetchedPlaces = response.data || [];
    
                setPlaces(fetchedPlaces.length > 0 ? 
                    fetchedPlaces.map(place => ({ ...place, fileUploaded: false })) : 
                    [{ place_name: "", place_description: "", images: [], fileUploaded: false }]
                );
            } catch (error) {
                console.error("Error fetching places:", error);
                setPlaces([
                    { place_name: "", place_description: "", images: [], fileUploaded: false }
                ]);
            }
        };
    
        if (cityId) {
            fetchPlaces();
        }
    }, []);

    // Add new place to the list
    const addPlaceToList = () => {
        if (places.length >= 3 && hotelCount === 0) {
            alert("You must add at least one hotel before adding more than 3 places.");
            return;
        }
    
        setPlaces(prevPlaces => {
            const updatedPlaces = [
                ...prevPlaces,
                { place_name: "", place_description: "", images: [], fileUploaded: false }
            ];
    
            // Wait for state update, then scroll to new place
            setTimeout(() => {
                const lastIndex = updatedPlaces.length - 1;
                if (placeRefs.current[lastIndex]) {
                    placeRefs.current[lastIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
    
            return updatedPlaces;
        });
    };
    

    // Handle file input change
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        setPlaces(prevPlaces =>
            prevPlaces.map((place, i) => i === index ? { ...place, image: file, fileUploaded: true} : place)
        );
        
    };

    // Handle text input change
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setPlaces(prevPlaces =>
            prevPlaces.map((place, i) => i === index ? { ...place, [name]: value } : place)
        );
    };

    // Handle delete place

const handleDelete = async (placeId, index) => {

    try {
        if (placeId) {
            await axiosInstance.delete(`/places/delete/${placeId}`);
        }
        setPlaces(prevPlaces => {
            const updatedPlaces = prevPlaces.filter((_, i) => i !== index);
            return updatedPlaces.length > 0 ? updatedPlaces : [
                { place_name: "", place_description: "", image: null, fileUploaded: false }
            ];
        });
    } catch (error) {
        console.error("Error deleting place:", error);
    }
};

    // Submit new places or update existing ones
    const submitPlaces = async (e) => {
        e.preventDefault();

        for (const place of places) {
            if (!place.fileUploaded || !place.image) {
                alert("Please upload image for each place before proceeding.");
                return;
            }
        }

        try {
            for (const place of places) {
                const formData = new FormData();
                formData.append("city_id", cityId);
                formData.append("place_name", place.place_name);
                formData.append("place_description", place.place_description);
                if (place.image) formData.append("image", place.image);

                if (place.id) {
                    await axiosInstance.put(`/places/update/${place.id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                } else {
                    const response = await axiosInstance.post("/places/add", formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    place.id = response.data.placeId;
                }
            }
            onNext();
        } catch (error) {
            console.error("Error adding/updating places:", error);
        }
    };


    return (
        <>
            <CreatePackageHeader active="3" />
            
        <div className='placemain-content'>
            <div className='place-headers'>
        <h3 className="placeHeading">Places Details </h3>
        <p className="placeParagraph">All fields are required, including Places details and one image upload.</p>
        </div>
        
            <form className="Addplace-page" onSubmit={submitPlaces}>
                {places.map((place, index) => (
                    <div key={index} className='add-place-section' ref={el => placeRefs.current[index] = el}>
                       <div>
                        <div className="placeform-group">
                            <label style={{marginTop:"10px"}} htmlFor="place_name">Place</label>
                            <div className="placeformgroupicon"> 
                                <FaPlaceOfWorship color="#888" size={25}/> 
                                <input type="text" name="place_name" placeholder="Enter Place Name" value={place.place_name} onChange={(e) => handleChange(e, index)} required/>
                            </div>
                        </div>
                        <div className="placeform-group" style={{marginLeft:"30px"}}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop:"18px", marginLeft:"7px" }}> 
                                    <LuTableOfContents color="#888" size={25}/>  
                                    <label  style={{margin:"0"}} htmlFor="place_description">Description</label> 
                                </div>
                                <textarea name="place_description" placeholder="Enter place Description" value={place.place_description} onChange={(e) => handleChange(e, index)} required/>
                        </div>
                        
                        <div className="placefileicon">
                            <FaImages color="#888" size={25}/>
                            <label htmlFor={`fileInput-${index}`} className="placefile-label">
                                {place.fileUploaded ? "Uploaded" : "Upload Image"}
                                <input type="file" onChange={(e) => handleFileChange(e, index)} id={`fileInput-${index}`} className='placehidden-input'/>
                            </label>
                        </div>
                        </div>
    
                            <div style={{cursor:"pointer"}} type="button" onClick={() => handleDelete(place.id, index)}><MdDelete size={35}/></div>
                        
                    </div>
                ))}

                <div className='place-buttons'>
                <button className='placeback' type="button" onClick={onBack}>Back</button>
                <button className='placenext' type="submit">Proceed</button>
                <button className='add-place' type="button" onClick={addPlaceToList}>Add New Place</button>
                </div>
            </form>
            </div>
        </>
    );
};

export default AddPlace;
