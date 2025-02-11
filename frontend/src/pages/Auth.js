import React, { useState } from 'react';
import Auth_Input from '../components/Auth_Input';
import { registerFields, loginFields } from '../components/Auth_FormFields';
import axiosInstance from '../api/axios';
import "../styles/Auth.css"

const Auth = ({ onLoginSuccess, source }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (isLogin) {
                const response = await axiosInstance.post('/users/login', {
                    emailOrUsername: formData.emailOrUsername,
                    password: formData.password,
                });
                const { token } = response.data;
                var username;
                var user_id;

                  // Fetch the username if logged in using an email
                  if (formData.emailOrUsername.includes("@")) {
                    const userResponse = await axiosInstance.get(
                        `/users/username?email=${formData.emailOrUsername}`
                    );
                    username = userResponse.data;

                    const userResponse2 = await axiosInstance.get(
                        `/users/useridbyemail?email=${formData.emailOrUsername}`
                    );
                    user_id=userResponse2.data.user_id;
                } else {
                    // Assume the input is a username; save it directly
                    username = formData.emailOrUsername;

                    const userResponse2 = await axiosInstance.get(
                        `/users/useridbyusername?username=${formData.emailOrUsername}`
                    );
                    user_id=userResponse2.data.user_id;
                }
                onLoginSuccess(token, username, user_id);
                setSuccess('Login successful!');
            } else {
                const response = await axiosInstance.post('/users/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                setSuccess('Registration successful! Please log in.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
        }
    };

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
        setFormData({}); // Reset the form data
        setError(""); // Clear the error message
        setSuccess(""); // Clear the success message
    };

    const fields = isLogin ? loginFields : registerFields;

    return (
        <div>
            {source==="Customize"?
            (<h1 className='heading'>{isLogin ? 'Login to Customize': 'Register'}</h1>):
            source==="exp"?
            (<h1 className='heading'>{isLogin ? 'Login to Explore': 'Register'}</h1>):
            source==="CustomizePackageDetails"?
            (<h1 className='heading'>{isLogin ? 'Login to Continue': 'Register'}</h1>):
            source==="booking"?
            (<h1 className='heading'>{isLogin ? 'Login to Book': 'Register'}</h1>):
            (<h1 className='heading'>{isLogin ? 'Login': 'Register'}</h1>)}

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' ,marginTop:'0',}}>{success}</p>}

            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <Auth_Input
                        key={index}
                        {...field}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                    />
                ))}
                <button className='submit'  type="submit" >{isLogin ? 'Login' : 'Register'} </button>
            </form>

            <p> 
                <button className='toggle' onClick={toggleMode}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}</button>
            </p>
        </div>
    );
};



export default Auth;