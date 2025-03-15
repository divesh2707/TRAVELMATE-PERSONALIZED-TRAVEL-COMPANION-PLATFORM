import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Auth_Input from "../components/Auth_Input";
import { FaLock } from "react-icons/fa";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axiosInstance.get(`/auth/verify-reset-token/${token}`);
                setIsValid(response.data.valid);
            } catch (error) {
                setIsValid(false);
            }
        };

        verifyToken();
    }, [token]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/reset-password", {
                token,
                newPassword: formData.password,
            });

            console.log(response)

            if (response.status===200) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 2000); // Redirect after success
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to reset password.");
        }
    };

    if (!isValid) {
        return <PageNotFound />; // Show 404 if token is invalid
    }

    return (
        <div className="login-background">
            <div className="modal-overlay">
                <div className="modal-container">
                    <h1 className="heading">Reset Password</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <Auth_Input
                            label="New Password"
                            name="password"
                            type="password"
                            placeholder="Enter New Password"
                            required={true}
                            icon={<FaLock />}
                            value={formData.password}
                            onChange={handleChange}
                            margin="120px"
                        />
                        
                        <Auth_Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm the Password"
                            required={true}
                            icon={<FaLock />}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            margin="85px"
                        />

                        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
                        {success && <p style={{ color: 'green', marginTop: '15px' }}>Password Reset successfully !</p>}
                        
                        <button className="submit" type="submit" style={{marginBottom:"25px"}}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
