import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { MdEmail } from "react-icons/md";
import "../styles/EditProfile.css";

const ProfileChangeEmail=({setProfileEmail})=>{
    const { user_id, username } = useContext(AuthContext);
    const [user_email, setUser_Email] = useState("");
    const [prevEmail, setPrevEmail] = useState(""); // Stores original email
    const [changeEmail, setChangeEmail] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axiosInstance.get(
                    `/users/emailbyusername?username=${username}`
                );
                setUser_Email(response.data.email);
                setPrevEmail(response.data.email); // Store original email
                setProfileEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching user email:", error);
            }
        };

        if (username) fetchUserEmail();
    }, [username]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChangeEmail = async () => {
        if (!validateEmail(user_email)) {
            setError("Please enter a valid email.");
            return;
        }

        try {
            const response = await axiosInstance.put("/users/update-email", {
                userId: user_id,
                newEmail: user_email
            });
            setSuccess(response.data.message +" !");
            setError("");
            setShowSuccess(true);
            setChangeEmail(false);
            setPrevEmail(user_email);
            setProfileEmail(user_email); // Update stored email after successful update

            // Fade out effect after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
                setTimeout(() => setSuccess(""), 500); // Ensures the text disappears after fade-out
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message + " !" || "Failed to update email !");
            setSuccess("");
        }
    };

    const handleCancel = () => {
        setChangeEmail(false);
        setUser_Email(prevEmail);
        setProfileEmail(prevEmail); // Restore previous email
        setError("");
        setSuccess("");
        setShowSuccess(false);
    };

    return (
        <>      
            <div className="editprofile-form-group">
                <label htmlFor="email">Email</label>
                <div className="editprofile-formgroupicon">
                    <MdEmail color="#888" size={25} />
                    <input type="email" id="email" name="email" value={user_email} placeholder="Enter your Email" disabled={!changeEmail}
                            onChange={(e) => {
                                setUser_Email(e.target.value);
                                setError(""); // Reset error on typing
                            }}/>
                </div>
            </div>
            
            <div className='change-email-button-message'>
                {!changeEmail && <button className="change-email-update" onClick={() => setChangeEmail(true)}>Update Email</button>}
                {changeEmail && (
                    <div className="change-email-save-cancel">
                        <button className="change-email-cancel" onClick={handleCancel}>Cancel</button>
                        <button className="change-email-save" onClick={handleChangeEmail}>Save</button>
                    </div>
                )}
                <div className='change-email-message'>
                    {error && <p className="error-message">{error}</p>}
                    {success && (
                        <p className={`success-message ${showSuccess ? 'fade-in' : 'fade-out'}`}>{success}</p>
                    )}
                </div>
            </div>
            
        </>
    );
};

export default ProfileChangeEmail;