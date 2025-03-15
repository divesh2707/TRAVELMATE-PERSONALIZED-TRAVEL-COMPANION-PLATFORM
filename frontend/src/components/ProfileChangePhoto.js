import React, {useState, useEffect} from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../api/axios.js"
import { Buffer } from "buffer";

const ProfileChangePhoto=()=>{
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
    
    

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_photo", file);
        formData.append("user_id", localStorage.getItem("user_id"));
        
        try {
            const res = await axiosInstance.post("/users/add-profile-photo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                });
                console.log(res.data)
             const base64String = `data:image/jpeg;base64,${Buffer.from(res.data.profilePhoto.data).toString('base64')}`;
            
            setProfilePhoto(base64String);
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    };

    const handleUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_photo", file);
        formData.append("user_id", localStorage.getItem("user_id"));
        
        try {
            const res = await axiosInstance.put("/users/update-profile-photo", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                });
                console.log(res.data)
             const base64String = `data:image/jpeg;base64,${Buffer.from(res.data.profilePhoto.data).toString('base64')}`;
            
            setProfilePhoto(base64String);
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    };

    const handleRemove=async()=>{
        try{
            const userId = localStorage.getItem("user_id");
                if (!userId) return;
             await axiosInstance.delete(`/users/remove-profile-photo?user_id=${userId}`);
            setProfilePhoto(null)
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
            <div className="ProfileChangePhoto">
                {!profilePhoto?(<FaUserCircle size={150} color="grey"/>):
                <img src={profilePhoto} alt="profile-photo"/>}
                {!profilePhoto?(
                <label className="upload-btn-profile-photo-add">
                    Add Photo
                    <input type="file"  onChange={handleFileChange} hidden />
                </label>):(
                    <div className="profile-photo-after-buttons">
                        <label className="upload-btn-profile-photo-update">
                            Update Photo
                            <input type="file"  onChange={handleUpdate} hidden />
                        </label>
                        <button onClick={handleRemove} className="profile-photo-remove">Remove Photo</button>
                    </div>)}   
            </div>
        </>
    );
};

export default ProfileChangePhoto;