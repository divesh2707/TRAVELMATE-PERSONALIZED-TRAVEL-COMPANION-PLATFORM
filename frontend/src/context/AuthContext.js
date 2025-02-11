import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Check localStorage on mount to persist login state
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUsername = localStorage.getItem("username");
        const storedUser_id = localStorage.getItem("user_id");
        setIsLoggedIn(!!token);
        setUsername(storedUsername);  // Get the username from localStorage
        setUser_id(storedUser_id);
        setLoading(false);
    }, []);

    const login = (token, username, user_id) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);  // Save username in localStorage
        localStorage.setItem("user_id", user_id); 
        setIsLoggedIn(true);
        setUsername(username);
        setUser_id(user_id);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
        setIsLoggedIn(false);
        setUsername(null);
        setUser_id(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, user_id, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
