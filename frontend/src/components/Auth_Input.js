import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth_Input.css";

const Auth_Input = ({ label, type, name, value, placeholder, onChange, required, margin, icon, reset }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setShowPassword(false);
    }, [reset]);

    return (
        <div className="container">
            <label className="label" style={{ marginRight: margin }}>{label}</label>
            <div className='input-wrapper'>
                <span className="input-icon">{icon}</span>
                <input 
                    className="input"
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />
                {type === "password" && (
                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Auth_Input;
