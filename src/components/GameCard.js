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
            <h3 className="fixed-title">{gameTitle}</h3>
            <div className="description-container">
                <p className="description">{gameDescription}</p>
            </div>
            <div className='like-dislike-buttons'>
                <button className='dislike-button' onClick={handleDislike}>
                    <FontAwesomeIcon icon={faThumbsDown}>LT</FontAwesomeIcon>
                </button>
                <button className='like-button' onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp}>RT</FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default GameCard;