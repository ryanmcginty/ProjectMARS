import React from "react";
import { useNavigate } from 'react-router-dom';
import './card.css';
import { v4 as uuidv4 } from 'uuid';

function LikedGamesPage({ likedGames }) {

    const navigate = useNavigate();

    const onClose = () => {
        navigate('/')
    };
    if (likedGames.length === 0) {
        return (
            <div className="liked-games-page">
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
                <div className="menu-bar"></div>
                <h2 className="liked-games-title">Liked Games</h2>
                <ul>
                    {likedGames.map((game) => (
                        <li key={uuidv4()} style={{ marginBottom: '25px' }}>
                            <div className="card">
                                <img className="card-image" src={game.cover} alt={game.title} />
                                <h4>{game.title}</h4>
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