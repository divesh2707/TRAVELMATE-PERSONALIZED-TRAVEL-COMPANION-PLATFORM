import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { FaUser } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa"; // Loader icon
import "../styles/EditProfile.css";

const ProfileChangeUsername = () => {
    const { user_id, username, setUsername } = useContext(AuthContext);
    const [user_name, setUser_name] = useState(username);
    const [prevUserName, setPrevUserName] = useState(username);
    const [changeUsername, setChangeUsername] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Shows "Username available"
    const [showSuccess, setShowSuccess] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const validateUsername = (username) => {
        const usernameRegex = /^(?!.*\.\.)[a-zA-Z0-9._]*[a-zA-Z0-9][a-zA-Z0-9._]*$/;
        return usernameRegex.test(username);
    };
    

    useEffect(() => {
        if (user_name.toLowerCase() === prevUserName.toLowerCase()) {
            return;
        }
        if (user_name.trim() && user_name !== prevUserName) {
            if (!validateUsername(user_name)) {
                setError("Invalid username format.");
                setSuccessMessage("");
            } 
            else {
                setError("");
                checkUsernameAvailability(user_name);
            }
        } else {
            setError("");
            setSuccessMessage("");
        }
    }, [user_name]);
    

    const checkUsernameAvailability = async (username) => {
        setIsChecking(true);
        setError("");
        setSuccessMessage("");

        try {
            const response = await axiosInstance.post("/users/check-username", { username });
            if (!response.data.available) {
                setError("Username already taken.");
            } else {
                setSuccessMessage("Username is available!");
            }
        } catch (err) {
            setError("Error checking username availability.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleChangeUsername = async () => {
        if (!user_name.trim()) {
            setError("Username cannot be empty.");
            return;
        }

        if (!validateUsername(user_name)) {
            setError("Invalid username format.");
            return;
        }
        if (user_name.toLowerCase() === prevUserName.toLowerCase()) {
            setError("New username must be different from the current username.");
            return;
        }

        if (error) return; // Prevent submission if there's an error

        try {
            const response = await axiosInstance.put("/users/update-username", {
                userId: user_id,
                newUsername: user_name
            });

            setSuccess(response.data.message + " !");
            setError("");
            setSuccessMessage("");
            setShowSuccess(true);
            setChangeUsername(false);

            setUsername(user_name);
            localStorage.setItem("username", user_name);
            setPrevUserName(user_name);

            setTimeout(() => {
                setShowSuccess(false);
                setTimeout(() => setSuccess(""), 500);
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update username !");
            setSuccess("");
        }
    };

    const handleCancel = () => {
        setChangeUsername(false);
        setUser_name(prevUserName);
        setError("");
        setSuccess("");
        setSuccessMessage("");
        setShowSuccess(false);
    };

    return (
        <>      
            <div className="editprofile-form-group">
                <label htmlFor="username">Username</label>
                <div className="editprofile-formgroupicon">
                    <FaUser color="#888" size={25} /> 
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={user_name} 
                        placeholder="Enter your Username" 
                        disabled={!changeUsername}
                        onChange={(e) => {
                            setUser_name(e.target.value);
                            setError("");
                            setSuccessMessage("");
                        }}
                    />
                    {isChecking && <FaCircleNotch className="loading-icon" />}
                </div>
            </div>
            
            <div className='change-username-button-message'>
                {!changeUsername && <button className="change-username-update" onClick={() => setChangeUsername(true)}>Update Username</button>}
                {changeUsername && (
                    <div className="change-username-save-cancel">
                        <button className="change-username-cancel" onClick={handleCancel}>Cancel</button>
                        <button 
                            className="change-username-save" 
                            onClick={handleChangeUsername} 
                            disabled={!!error}
                        >
                            Save
                        </button>
                    </div>
                )}
                <div className='change-username-message'>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message-2">{successMessage}</p>}
                    {success && (
                        <p className={`success-message ${showSuccess ? 'fade-in' : 'fade-out'}`}>{success}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileChangeUsername;
