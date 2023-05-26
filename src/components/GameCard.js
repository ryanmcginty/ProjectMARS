import React from "react";
import './gamecard.css'
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const GameCard = ({ gameCover, gameTitle, gameDescription, handleDislikeClick, handleLikeClick }) => {

    const handleLike = () => {
        handleLikeClick();
    };

    const handleDislike = () => {
        handleDislikeClick();
    };

    return (
        <div className="game-card">
            <div className="game-image">
                <img src={gameCover} alt="game" style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
            </div>
            <div className="description">
                <p className="fixed-title">{gameTitle}</p>
                <p className="text-body">{gameDescription}</p>
            </div>
            <div className='like-dislike-buttons'>
                <button className='dislike-button' onClick={handleDislike}>LT</button>
                <button className='like-button' onClick={handleLike}>RT</button>
            </div>          
        </div>
        
    );
};

export default GameCard;