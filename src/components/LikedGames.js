import React from "react";
import { useNavigate } from 'react-router-dom';
import './card.css';
import MenuBar from "./MenuBar";

function LikedGamesPage({ likedGames }) {

    const navigate = useNavigate();

    const onClose = () => {
        navigate('/')
    };
    
    if (likedGames.length === 0) {
        return (
            <div className="liked-games-page" id="visible">
                <MenuBar />
                <h2 className="liked-games-title">Liked Games</h2>
                <p>No liked games found.</p>
                <div className="back-button-LG">
                    <button className="rainbow-button" color="back" onClick={onClose}>Back</button>
                </div>
            </div>
        );
    }
    return (
            <div className="liked-games-page">
                <MenuBar />
                <h2 className="liked-games-title">Liked Games</h2>
                <ul id="liked-games-list">
                    {likedGames.map((game, index) => (
                        <li key={index} style={{ marginBottom: '25px' }}>
                            <div className="card">
                                <div className="card-content">
                                    <img src={game.cover} alt={game.title} className="card-image" />
                                    <h3>{game.title}</h3>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="back-button-LG">
                    <button className="rainbow-button" color="back" onClick={onClose}>Back</button>
                </div>    
            </div>
    );
}

export default LikedGamesPage;