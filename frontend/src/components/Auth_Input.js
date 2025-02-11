import React from 'react';
import "../styles/Auth_Input.css"

const Auth_Input = ({ label, type, name, value, placeholder, onChange, required, margin, icon }) => {

    return (
        <div className="container">
            <label className="label" style={{marginRight:[margin]}}>{label}</label>
            <div className='input-wrapper'>
            <span className="input-icon">{icon}</span>
            <input className="input"
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
            </div>
        </div>
    );
};


export default Auth_Input;
