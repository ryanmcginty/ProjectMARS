import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";
import './userprofile.css';

const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [likedGamesCount, setLikedGamesCount] = useState(0);

    const onClose = () => {
        navigate('/')
    };

    useEffect(() => {
        if(isAuthenticated) {
            const likedGamesList = document.getElementById("liked-games-list");
            if (likedGamesList) {
                const likedGamesCount = likedGamesList.getElementsByTagName("li").length;
                setLikedGamesCount(likedGamesCount);
            }
        }
    }, [isAuthenticated]);

    if (isLoading) {
    return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <MenuBar className="profile-menu" />
                <h3 className="logged-out-text">Please login to view your profile.</h3>
                <div className="back-button-LG">
                    <button className="rainbow-button" onClick={onClose}>Back</button>
                </div>
            </div>
        );
    }

    return (
    isAuthenticated && (
        <div className="profile-page">
            <MenuBar />
            <div className="user-info">
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>Liked Games: {likedGamesCount}</p>
            </div>
            <div className="back-button-LG">
                <button className="rainbow-button" onClick={onClose}>Back</button>
            </div>  
        </div>
    )
    );
};

export default Profile;