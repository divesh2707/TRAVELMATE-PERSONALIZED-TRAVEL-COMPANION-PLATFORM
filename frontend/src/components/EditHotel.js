import React,{ useState, useEffect, useRef} from "react";
import axiosInstance from '../api/axios';
import { Buffer } from "buffer";
import CreatePackageHeader from "../components/CreatePackageHeader";
import "../styles/EditHotel.css";
import { FaHotel } from "react-icons/fa6";
import { LuTableOfContents } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomCarousel from "./CustomCarousel";
import { TbSearchOff } from "react-icons/tb";


const EditHotel=({ cityId, onNext, onBack, fetchHotelCount })=>{
    const [hotels, setHotels] = useState([
            { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
        ]);
        const [previewImages, setPreviewImages] = useState([]);
        const [isSubmitted, setIsSubmitted] = useState(false);
        const hotelRefs = useRef([]);
    
        useEffect(() => {
            const fetchHotels = async () => {
                try {
                    
                    const response = await axiosInstance.get(`/hotels/${cityId}`);
                    const fetchedHotels = response.data || [];
                    const groupedPreviewImages = fetchedHotels.map(hotel =>
                        ([
                            `data:image/jpeg;base64,${Buffer.from(hotel.image_1.data).toString("base64")}`,
                            `data:image/jpeg;base64,${Buffer.from(hotel.image_2.data).toString("base64")}`,
                            `data:image/jpeg;base64,${Buffer.from(hotel.image_3.data).toString("base64")}`
                    ]));
                    setPreviewImages(groupedPreviewImages);
    
                    setHotels(fetchedHotels.length > 0 ? fetchedHotels.map(hotel => ({ ...hotel, fileUploaded: true, images:[] })) : [
                        { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
                    ]);
                    
                    if (fetchedHotels.length > 0) {
                        setIsSubmitted(true);
                    } else {
                        setIsSubmitted(false);
                    }
                    
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
    
        const handleFileChange = async (e, index) => {
            const files = Array.from(e.target.files);
        
            if (files.length !== 3) {
                alert("Please upload exactly 3 images.");
                return;
            }
        
            // Convert files to Base64
            const base64Images = await Promise.all(
                files.map(file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                }))
            );
        
            // Update hotels array
            setHotels(prevHotels =>
                prevHotels.map((hotel, i) =>
                    i === index ? { ...hotel, images: files, fileUploaded: true } : hotel
                )
            );
        
            // Update previewImages array (ensure it's an array of arrays)
            setPreviewImages(prevImages => {
                const newImages = [...prevImages];
                newImages[index] = base64Images; // Replace images for the specific hotel
                return newImages;
            });
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
            setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
            setHotels(prevHotels => {
                const updatedHotels = prevHotels.filter((_, i) => i !== index);
                if(updatedHotels.length == 0) setIsSubmitted(false);
                return updatedHotels.length > 0 ? updatedHotels : [
                    { hotel_name: "", hotel_description: "", price_per_night: "", hotel_category: "", images: [], fileUploaded: false }
                ];
            });
        };
    
        const submitHotels = async (e) => {
    
            e.preventDefault();
    
            for (const hotel of hotels) {
                if (!hotel.fileUploaded ) {
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
    
    return(
        <>
        <CreatePackageHeader active="2" />
            
            <div className='EditHotel-headers'>
            <h3 className="EditHotelHeading">Hotel Details</h3>
            <p className="EditHotelParagraph">All fields are required, including hotel details and exactly three image uploads.</p>
            </div>

        
            <div className='Edithotelmain-content'>
            <form className="EditAddHotel-page" onSubmit={submitHotels}>
                {hotels.map((hotel, index) => (
                    <div className="edit-hotel-whole" key={index} ref={(el) => (hotelRefs.current[index] = el)}>
                        <div>
                        <div className='EditHotelformsection'>
                            <div className='EditHotelformsection1'>
                                <div className="EditHotelform-group">
                                    <label htmlFor="hotel_name">Hotel</label>
                                    <div className="EditHotelformgroupicon">   
                                        <FaHotel color="#888" size={25}/>       
                                        <input type="text" name="hotel_name" placeholder="Enter Hotel Name" 
                                            value={hotel.hotel_name} onChange={(e) => handleChange(e, index)} required />
                                    </div>
                                </div>

                                <div className="EditHotelform-group">
                                    <label htmlFor="price_per_night">Price per Night</label>
                                    <div className="EditHotelformgroupicon"> 
                                        <RiMoneyRupeeCircleFill color="#888" size={25}/>   
                                        <input type="number" name="price_per_night" placeholder="Enter the Price per Night" 
                                            value={hotel.price_per_night} onChange={(e) => handleChange(e, index)} required />
                                    </div>
                                </div>

                                <div className="EditHotelform-group">
                                    <label htmlFor="hotel_category">Category</label>
                                    <div className="EditHotelformgroupicon">
                                        <MdCategory color="#888" size={25}/> 
                                        <input type="text" name="hotel_category" placeholder="Enter Category (Economy, Standard, Luxury)" 
                                            value={hotel.hotel_category} onChange={(e) => handleChange(e, index)} required />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='EditHotelformsection2'>
                                <div className="EditHotelform-group">
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop:"18px", marginLeft:"7px" }}> 
                            <LuTableOfContents color="#888" size={25}/>   
                            <label htmlFor="hotel_description" style={{margin:"0"}}>Description</label>        
                                    </div>
                                    <textarea name="hotel_description" placeholder="Enter Hotel Description" value={hotel.hotel_description} 
                                        onChange={(e) => handleChange(e, index)} required  />
                                </div>
                            </div>
                            <div className="Editdelete-hotel" type="button" onClick={() => deleteHotel(index)}><MdDelete size={35}/></div>
                        </div>

                            <div className='Editspecific-hotel-buttons'>
                                <div className="EditHotelfileicon">
                                    <FaImages color="#888" size={25}/>
                                    <label htmlFor={`fileInput-${index}`} className="EditHotelfile-label">
                                        {hotel.fileUploaded ? "Uploaded" : "Upload Images"}
                                        <input type="file" multiple onChange={(e) => handleFileChange(e, index)} 
                                            className="EditHotelhidden-input" id={`fileInput-${index}`}  />
                                    </label>
                                </div>   
                            </div>
                        </div>
                        <div className="edit-hotel-carousel">
                        {previewImages[index] && previewImages[index].length > 0 ? (
                            <CustomCarousel images={previewImages[index]} />
                        ) : (
                            <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center", width:"333.33px", height:"250px", marginRight:"15px"}}>
                                  <TbSearchOff size={133} color="black"/>
                                    <h3 style={{fontSize:"35px", margin:"0"}}> <span style={{ color: "#2196F3" }}>No,</span> Images Uploaded Yet!</h3>
                                </div>
                        )}
                        </div>
                    </div>
                ))}

                <div className='Edithotel-buttons'>
                    <button className="EditHotelback" type="button" onClick={onBack}>Back</button>
                    {!isSubmitted && (<button className="EditHotelSkip" type="button" onClick={handleSkip}>Skip to Places</button>)}
                    <button className="EditHotelnext" type="submit">Proceed</button>
                    <button className="Editadd-hotel" type="button" onClick={addHotelToList}>Add New Hotel</button>
                </div>
            </form>
        </div>
    </>
    );
};

export default EditHotel;