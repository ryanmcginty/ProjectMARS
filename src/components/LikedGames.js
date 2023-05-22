import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function LikedGamesPage({ likedGames }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#558b81',
            },
                secondary: {
                main: '#497d3b',
            },
                back: {
                main: '#a697af',
                contrastText: '#3c224d',
                dark: '#9c56c7',
            },
        },
      });

    const navigate = useNavigate();

    const onClose = () => {
        navigate('/')
    };

    if (likedGames.length === 0) {
        return (
            <ThemeProvider theme={theme}>
                <div className="liked-games-page">
                    <h2 className="liked-games-title">Liked Games</h2>
                    <p>No liked games found.</p>
                    <div className="back-button-LG">
                        <Button variant="contained" color="back" onClick={onClose}>Back</Button>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="liked-games-page">
                <h2 className="liked-games-title">Liked Games</h2>
                <ul>
                    {likedGames.map((game, index) => (
                        <li key={index}>
                            <img src={game.cover} alt={game.title} />
                            <p>{game.title}</p>
                        </li>
                    ))}
                </ul>
                <div className="back-button-LG">
                    <Button variant="contained" color="back" onClick={onClose}>Back</Button>
                </div>    
            </div>
        </ThemeProvider>
    );
}

export default LikedGamesPage;