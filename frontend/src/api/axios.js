import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://travelmate-personalized-travel-companion.onrender.com/api', // Base URL of your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // Or use cookies
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
