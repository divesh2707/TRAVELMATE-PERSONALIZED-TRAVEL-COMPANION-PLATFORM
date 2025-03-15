import React, {  useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../api/axios";

const ProfileChangePassword=({editProfile, passwordForms, showPasswordForms, setMessage, setShowMessage, ForgetPassword, profileEmail})=>{
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [error, setError] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleSubmit = async () => {
        setError("");

        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setError("All fields are required !");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match !");
            return;
        }

        try {
            const response = await axiosInstance.put("/users/change-password", {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                userId: localStorage.getItem("user_id"), // Ensure user ID is included
            });

            if (response.data.success) { 
                setMessage("Password changed successfully !");
                setShowMessage(true);
                passwordForms();
                
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000); // Fade out after 2 seconds
    
                setTimeout(() => {
                    setMessage(""); // Remove message after fade-out
                }, 2500);
    
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });

            } else {
                setError(response.data.error || "Failed to change password");
            }
        } catch (err) {
            console.log(err.response.data.message)
            setError(err.response.data.message + " !" || "Something went wrong");
        }
    };

    const handleCancel=()=>{
        passwordForms();
        setError("");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setShowPassword({ oldPassword: false, newPassword: false, confirmPassword: false });
    }

    const handleForgetPassword=async()=>{
        ForgetPassword();
        await axiosInstance.post('/auth/forgot-password', { email: profileEmail });
        setError("");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setShowPassword({ oldPassword: false, newPassword: false, confirmPassword: false });
    }

    return(
        <div>
            {!showPasswordForms && <div className="changePassword-buttons">
                <button className="change-password-button" onClick={()=>passwordForms()}>Change Password</button>
                <button className="change-password-button" onClick={()=>editProfile()}>Back to Profile</button>
            </div>}
            {showPasswordForms && 
            <div>
                <div className="editprofile-passwordform-group" >
                    <label htmlFor="oldPassword">Old Password</label>
                    <div className="editprofile-passwordformgroupicon">
                        <FaLock color="#888" size={25} />
                        <input type={showPassword.oldPassword ? "text" : "password"} name="oldPassword" placeholder="Enter your old Password" 
                        value={formData.oldPassword} onChange={handleChange}/>
                        <span className="eye-icon" onClick={() => togglePasswordVisibility("oldPassword")}>
                            {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="editprofile-passwordform-group" style={{marginTop:"10px"}}>
                    <label htmlFor="newPassword">New Password</label>
                    <div className="editprofile-passwordformgroupicon">
                        <MdLock color="#888" size={25} />
                        <input type={showPassword.newPassword ? "text" : "password"} name="newPassword"  placeholder="Enter New Password" 
                        value={formData.newPassword} onChange={handleChange}/>
                        <span className="eye-icon" onClick={() => togglePasswordVisibility("newPassword")}>
                            {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="editprofile-passwordform-group" style={{marginTop:"10px"}}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="editprofile-passwordformgroupicon">
                        <RiLockPasswordFill color="#888" size={25} />
                        <input type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm entered Password" 
                        value={formData.confirmPassword} onChange={handleChange}/>
                        <span className="eye-icon" onClick={() => togglePasswordVisibility("confirmPassword")}>
                            {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <p className="change-password-forget" style={{cursor:"pointer"}} onClick={handleForgetPassword}>Forget Password?</p>
                {error && <div className="error-message-password">{error}</div>}
                <div className="changePassword-buttons" style={{marginTop:`${error==""?"48px":"26.5px"}`}}>
                    <button className="change-password-button" onClick={handleSubmit}>Update Password</button>
                    <button className="change-password-button" 
                    onClick={handleCancel}>Cancel</button>
                </div>
            </div>}

        
        </div>
    );
};

export default ProfileChangePassword;