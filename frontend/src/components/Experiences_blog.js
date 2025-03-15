import React from 'react';
import BlogCard from './BlogCard';
import "../styles/Experiences_blog.css"

const Experiences_blog=({ blogs })=>{
  
    return (
        <div>
        <div className="blog-list">
            {blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
                <h1 className="Bringing"> Bringing it to you ⏳</h1>
            )}
        </div>
        {blogs.length >0 && <p className="all-caught-up">🎉 You're all caught up!</p>}

        </div>
    );
};

export default Experiences_blog;