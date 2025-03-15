import React, { useState } from 'react';
import Auth_Input from '../components/Auth_Input';
import { registerFields, loginFields } from '../components/Auth_FormFields';
import { FaEnvelope } from "react-icons/fa";
import axiosInstance from '../api/axios';
import "../styles/Auth.css"

const Auth = ({ onLoginSuccess, source}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle between login and forgot password
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetFields, setResetFields] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setResetFields((prev) => !prev);

        try {
            if (isLogin) {
                const response = await axiosInstance.post('/users/login', {
                    emailOrUsername: formData.emailOrUsername,
                    password: formData.password,
                });
                const { token, role } = response.data;
                let username, user_id;

                // Fetch the username and user_id based on email or username
                if (formData.emailOrUsername.includes("@")) {
                    const userResponse = await axiosInstance.get(`/users/username?email=${formData.emailOrUsername}`);
                    username = userResponse.data.username;

                    const userResponse2 = await axiosInstance.get(`/users/useridbyemail?email=${formData.emailOrUsername}`);
                    user_id = userResponse2.data.user_id;
                } else {
                    username = formData.emailOrUsername;

                    const userResponse2 = await axiosInstance.get(`/users/useridbyusername?username=${formData.emailOrUsername}`);
                    user_id = userResponse2.data.user_id;
                }
                onLoginSuccess(token, username, user_id, role);
                setSuccess('Login successful!');
            } else {
                await axiosInstance.post('/users/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                setSuccess('Registration successful! Please log in.');
            }
        } catch (err) {
            console.log(err.response)
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        setResetFields((prev) => !prev);

        try {
            await axiosInstance.post('/auth/forgot-password', { email: formData.email });
            setSuccess('Password reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.error || 'User not found.');
        }finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
        setFormData({});
        setError("");
        setSuccess("");
        setResetFields((prev) => !prev);
    };

    const getHeadingText = () => {
        if (isForgotPassword) return "Forget Password?";
        if (source === "Customize") return isLogin ? "Login to Customize" : "Register";
        if (source === "exp") return isLogin ? "Login to Explore" : "Register";
        if (source === "CustomizePackageDetails") return isLogin ? "Login to Continue" : "Register";
        if (source === "booking") return isLogin ? "Login to Book" : "Register";
        if (source === "profile") return isLogin ? "Login to View" : "Register";
        if (source === "history") return isLogin ? "Login to See Bookings" : "Register";
        return isLogin ? "Login" : "Register";
    };

    const fields = isLogin ? loginFields : registerFields;

    return (
        <div>
            <h1 className='heading'>{getHeadingText()}</h1>

           

            {/* Toggle between Login/Register and Forgot Password */}
            {!isForgotPassword ? (
                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <Auth_Input
                            key={index}
                            {...field}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            reset={resetFields}
                        />
                    ))}
                    <button className='submit' type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
            ) : (
                <form onSubmit={handleForgotPassword}>
                    <Auth_Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your registered email"
                        required={true}
                        icon={<FaEnvelope />}
                        value={formData.email || ''}
                        onChange={handleChange}
                        margin="170px"
                        reset={resetFields}
                    />
                    <button className='submit' type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Send Reset Link'}</button>
                </form>
            )}

            {error && <p style={{ color: 'red', margin: '15px 25px 10px 25px' }}>{error}</p>}
            {success && <p style={{ color: 'green', margin: '15px 25px 10px 25px' }}>{success}</p>}

            {/* Forget Password Button */}
            {!isForgotPassword && isLogin && (
                <button 
                    className='auth-forget' 
                    onClick={() => {
                        setIsForgotPassword(true)
                        setFormData({}); // Clear input fields
                        setError(""); // Clear errors
                        setSuccess("");
                        setResetFields((prev) => !prev);}}>
                    Forgot Password?
                </button>
            )}

            {/* Back to Login Button */}
            {isForgotPassword && (
                <p>
                    <button className='toggle' onClick={() => {
                        setIsForgotPassword(false);
                        setFormData({}); // Clear input fields
                        setError(""); // Clear errors
                        setSuccess("");
                        setResetFields((prev) => !prev);}}>
                        Back to Login
                    </button>
                </p>
            )}

            {!isForgotPassword && (
                <p>
                    <button className='toggle' onClick={toggleMode}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </button>
                </p>
            )}
        </div>
    );
};

export default Auth;
