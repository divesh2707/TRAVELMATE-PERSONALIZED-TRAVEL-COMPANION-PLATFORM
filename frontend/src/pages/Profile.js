import React, {useState} from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBlogs from '../components/ProfileBlogs';
import "../styles/Profile.css"
import ProfileSidebar from '../components/ProfileSidebar';
import EditProfile from '../components/EditProfile';

const Profile=()=>{
    const [blogLength, setblogLength]=useState(0);
    const [showEditProfile, setShowEditProfile] = useState(false);

    const fetchBlogLength=(length)=>{
        setblogLength(length);
    }

    const editProfile=()=>{
        setShowEditProfile(!showEditProfile);
    }

    return(
        <div className='profile' >
            <div className='profile-left'>
                <ProfileSidebar />
            </div>
            {!showEditProfile?(
            <div className='profile-body'>
                <ProfileHeader blogLength={blogLength} editProfile={editProfile}/>
                <hr/>
                <ProfileBlogs fetchBlogLength={fetchBlogLength} />
            </div>
            ):(
                <div className='profile-body'>
                    <EditProfile editProfile={editProfile}/>
                </div>
            )}   
        </div>
    );
};

export default Profile;