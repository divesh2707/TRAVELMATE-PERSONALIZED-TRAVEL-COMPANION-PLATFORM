import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [user_role, setUser_role] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Check localStorage on mount to persist login state
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUsername = localStorage.getItem("username");
        const storedUser_id = localStorage.getItem("user_id");
        const storedUser_role = localStorage.getItem("user_role");
        setIsLoggedIn(!!token);
        setUsername(storedUsername);  // Get the username from localStorage
        setUser_id(storedUser_id);
        setUser_role(storedUser_role);
        setLoading(false);
    }, []);

    const login = (token, username, user_id, role) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);  // Save username in localStorage
        localStorage.setItem("user_id", user_id); 
        localStorage.setItem("user_role", role); 
        setIsLoggedIn(true);
        setUsername(username);
        setUser_id(user_id);
        setUser_role(role);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_role");
        setIsLoggedIn(false);
        setUsername(null);
        setUser_id(null);
        setUser_role(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, user_id, login, logout, loading, user_role, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
