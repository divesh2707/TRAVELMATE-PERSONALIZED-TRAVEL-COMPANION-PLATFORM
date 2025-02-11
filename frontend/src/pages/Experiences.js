import React, {useState, useEffect, useContext} from "react";
import Experiences_blog from "../components/Experiences_blog";
import Sidebar from '../components/Sidebar';
import Experience_right from "../components/Experience_right";
import axiosInstance from '../api/axios';
import { AuthContext } from "../context/AuthContext";
import "../styles/Experiences.css"

const Experiences= ()=>{
    const [blogs, setBlogs] = useState([]);
     const {user_id}=useContext(AuthContext);

    const fetchBlogs = async () => {
        try {
            const response = await axiosInstance.get('/blogs'); // Your API endpoint
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

     if(!user_id)return <p>loading...</p>;

    return(
        <div className="main">
            <Sidebar fetchBlogs={fetchBlogs}/>
            <div className="blog-contents"> <Experiences_blog blogs={blogs} /></div>
            <Experience_right />
        </div>
    )
};

export default Experiences;