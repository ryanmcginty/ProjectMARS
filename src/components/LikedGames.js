import React from "react";

function LikedGamesPage({ likedGames, onClose }) {
    return (
        <div className="liked-games-page">
            <h2>Liked Games</h2>
            <ul>
                {likedGames.map((game, index) => (
                    <li key={index}>
                        <img src={game.cover} alt={game.title} />
                        <p>{game.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LikedGamesPage;