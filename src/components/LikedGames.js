import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function LikedGamesPage({ likedGames }) {


    const styles = {
        media: {
            height: '25vh',
            width: '21vw',
            borderRadius: '25px',
            marginTop: '35px',
            filter: 'drop-shadow(10px 10px 10px 10px grey)'
        },
    };

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
                    {likedGames.map((game, index) => (
                        <li key={index}>
                            <Card raised sx={{ backgroundColor: 'lightgrey', width: '26vw', height: '36vh',  zIndex: 1, marginTop: index === 0 ? '1px' : 0, marginBottom: index === likedGames.length - 1 ? '100px' : 0, border: '1px solid white', borderRadius: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <CardMedia component="img" style={styles.media} alt={game.title} image={game.cover} />
                                </div>                                
                                <CardContent>
                                    <Typography gutterBottom style={{ textAlign: 'center', fontFamily: 'sans-serif', fontSize: '2em' }} variant="h4" padding="5%" >{game.title}</Typography>
                                </CardContent>
                            </Card>
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