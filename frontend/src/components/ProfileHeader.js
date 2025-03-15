import React, {useContext,useState, useEffect} from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileHeader.css"

const ProfileHeader=({blogLength, editProfile})=>{
    const navigate = useNavigate();
    const [bookingCount, setBookingCount] =useState(0);
    const { username, user_id } = useContext(AuthContext);
    const [profilePhoto, setProfilePhoto]=useState(null);

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;
    
                const response = await axiosInstance.get(`/users/get-profile-photo?user_id=${userId}`);
    
                if (response.data.profilePhoto) {
                    setProfilePhoto(response.data.profilePhoto); // No need to convert manually
                }
            } catch (err) {
                console.log("Error fetching profile photo:", err);
            }
        };
        fetchProfilePhoto();
    }, []);  

    useEffect(()=>{
        const fetchBookingCount=async()=>{
            try{
                const res= await axiosInstance(`/booking/count/${user_id}`);
                setBookingCount(res.data.count);
            }catch(err){
                console.log(err);
            }
        };
        fetchBookingCount();
    },[user_id])

    return(
        <div className="profile-header">
            <div className="profile-header-icon">
                {!profilePhoto?(<FaUserCircle size={150} color="grey"/>):
                    <img src={profilePhoto} alt="profile-photo"/>}
                <h1>{username}</h1>
            </div>
            <div className="profile-top-headers">
                <div className="profile-header-heading1">
                    <button onClick={()=>editProfile()}>Edit profile</button>
                    <button onClick={()=>navigate("/bookingHistory")}>View bookings</button>
                    
                </div>
                <div className="profile-header-heading2">
                    <h1><span  style={{fontWeight: "1000"}}>{blogLength}</span> <span style={{color:"#777"}}> posts</span></h1>  
                    <h1><span  style={{fontWeight: "1000"}}>{bookingCount}</span><span style={{color:"#777"}}> bookings</span></h1>
                </div>
            </div>
        
        </div>
    );
};

export default ProfileHeader;