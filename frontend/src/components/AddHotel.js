import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axios';
import CreatePackageHeader from "../components/CreatePackageHeader";
import "../styles/AddHotel.css";
import { FaHotel } from "react-icons/fa6";
import { LuTableOfContents } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddHotel = ({ cityId, onNext, onBack, fetchHotelCount }) => {
    const [hotels, setHotels] = useState([
        { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
    ]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const hotelRefs = useRef([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                
                const response = await axiosInstance.get(`/hotels/${cityId}`);
                const fetchedHotels = response.data || [];

                setHotels(fetchedHotels.length > 0 ? fetchedHotels.map(hotel => ({ ...hotel, fileUploaded: false })) : [
                    { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
                ]);
                if (fetchedHotels.length > 0) {
                    setIsSubmitted(true);
                } else {
                    setIsSubmitted(false);
                }
                console.log(isSubmitted)
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setHotels([
                    { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
                ]);
                setIsSubmitted(false);
            }
        };

        if (cityId) {
            fetchHotels();
        }
    }, []);

    const addHotelToList = () => {
        setHotels(prevHotels => {
            const updatedHotels = [
                ...prevHotels,
                { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
            ];

            // Wait for state update, then scroll to new hotel
            setTimeout(() => {
                const lastIndex = updatedHotels.length - 1;
                if (hotelRefs.current[lastIndex]) {
                    hotelRefs.current[lastIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);

            return updatedHotels;
        });
    };

    const handleFileChange = (e, index) => {
        const files = Array.from(e.target.files);
        if (files.length !== 3) {
            alert("Please upload exactly 3 images.");
            return;
        }

        setHotels(prevHotels =>
            prevHotels.map((hotel, i) =>
                i === index ? { ...hotel, images: files, fileUploaded: true } : hotel
            )
        );
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setHotels(prevHotels =>
            prevHotels.map((hotel, i) =>
                i === index ? { ...hotel, [name]: value } : hotel
            )
        );
    };

    const deleteHotel = async (index) => {
        const hotelId = hotels[index]?.id;
        if (hotelId) {
            try {
                await axiosInstance.delete(`/hotels/delete/${hotelId}`);
            } catch (error) {
                console.error("Error deleting hotel:", error);
            }
        }
        setHotels(prevHotels => {
            const updatedHotels = prevHotels.filter((_, i) => i !== index);
            return updatedHotels.length > 0 ? updatedHotels : [
                { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
            ];
        });
    };

    const submitHotels = async (e) => {

        e.preventDefault();

        for (const hotel of hotels) {
            if (!hotel.fileUploaded || hotel.images.length !== 3) {
                alert("Please upload exactly 3 images for each hotel before proceeding.");
                return;
            }
        }

        try {
            for (const hotel of hotels) {
                const formData = new FormData();
                formData.append("city_id", cityId);
                formData.append("hotel_name", hotel.hotel_name);
                formData.append("hotel_description", hotel.hotel_description);
                formData.append("price_per_night", hotel.price_per_night);
                formData.append("hotel_category", hotel.hotel_category);
                hotel.images.forEach(image => formData.append("images", image));

                if (hotel.id) {
                    await axiosInstance.put(`/hotels/update/${hotel.id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                } else {
                    const response = await axiosInstance.post("/hotels/add", formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    hotel.id = response.data.hotelId;
                }
            }
            fetchHotelCount(hotels.length);
            setIsSubmitted(true); 
            onNext();
        } catch (error) {
            console.error("Error adding/updating hotels:", error);
        }
    };

    const handleSkip=()=>{
        fetchHotelCount(0);
        onNext();
    }

    return (
        <>
            <CreatePackageHeader active="2" />
            
                <div className='Hotel-headers'>
                <h3 className="HotelHeading">Hotel Details</h3>
                <p className="HotelParagraph">All fields are required, including hotel details and exactly three image uploads.</p>
                </div>

                <div className='hotelmain-content'>
                <form className="AddHotel-page" onSubmit={submitHotels}>
                    {hotels.map((hotel, index) => (
                        <div key={index} ref={(el) => (hotelRefs.current[index] = el)}>
                            <div className='Hotelformsection'>
                                <div className='Hotelformsection1'>
                                    <div className="Hotelform-group">
                                        <label htmlFor="hotel_name">Hotel</label>
                                        <div className="Hotelformgroupicon">   
                                            <FaHotel color="#888" size={25}/>       
                                            <input type="text" name="hotel_name" placeholder="Enter Hotel Name" 
                                                value={hotel.hotel_name} onChange={(e) => handleChange(e, index)} required />
                                        </div>
                                    </div>

                                    <div className="Hotelform-group">
                                        <label htmlFor="price_per_night">Price per Night</label>
                                        <div className="Hotelformgroupicon"> 
                                            <RiMoneyRupeeCircleFill color="#888" size={25}/>   
                                            <input type="number" name="price_per_night" placeholder="Enter the Price per Night" 
                                                value={hotel.price_per_night} onChange={(e) => handleChange(e, index)} required />
                                        </div>
                                    </div>

                                    <div className="Hotelform-group">
                                        <label htmlFor="hotel_category">Category</label>
                                        <div className="Hotelformgroupicon">
                                            <MdCategory color="#888" size={25}/> 
                                            <input type="text" name="hotel_category" placeholder="Enter Category (Economy, Standard, Luxury)" 
                                                value={hotel.hotel_category} onChange={(e) => handleChange(e, index)} required />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='Hotelformsection2'>
                                    <div className="Hotelform-group">
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop:"18px", marginLeft:"7px" }}> 
                                <LuTableOfContents color="#888" size={25}/>   
                                <label htmlFor="hotel_description" style={{margin:"0"}}>Description</label>        
                                        </div>
                                        <textarea name="hotel_description" placeholder="Enter Hotel Description" value={hotel.hotel_description} 
                                            onChange={(e) => handleChange(e, index)} required  />
                                    </div>
                                </div>
                                <div className="delete-hotel" type="button" onClick={() => deleteHotel(index)}><MdDelete size={35}/></div>
                            </div>

                            <div className='specific-hotel-buttons'>
                                <div className="Hotelfileicon">
                                    <FaImages color="#888" size={25}/>
                                    <label htmlFor={`fileInput-${index}`} className="Hotelfile-label">
                                        {hotel.fileUploaded ? "Uploaded" : "Upload Images"}
                                        <input type="file" multiple onChange={(e) => handleFileChange(e, index)} 
                                            className="Hotelhidden-input" id={`fileInput-${index}`}  />
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                    ))}

                    <div className='hotel-buttons'>
                        <button className="Hotelback" type="button" onClick={onBack}>Back</button>
                        {!isSubmitted && (<button className="HotelSkip" type="button" onClick={handleSkip}>Skip to Places</button>)}
                        <button className="Hotelnext" type="submit">Proceed</button>
                        <button className="add-hotel" type="button" onClick={addHotelToList}>Add New Hotel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddHotel;
