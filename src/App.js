import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './controllert.png';
import './App.css';
import { Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LikedGames from './components/LikedGames';

function App() {
  const [welcomeText, setWelcomeText] = useState('- Press Start -');
  const [summaryText, setSummaryText] = useState('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
  const [buttonClicked, setButtonClicked] = useState(false);
  const [gameLiked, setGameLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelItems] = useState(['Liked Games']);
  const [gameCover, setGameCover] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [likedGames, setLikedGames] = useState([]);
  const [showLikedGames, setShowLikedGames] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  };
  const handlePanelClick = (item) => {
    setWelcomeText(item)
    setButtonClicked(true)
    if (item === 'Liked Games') {
      setShowLikedGames(true)
    }
  };
  const handleButtonClick = () => {
    setWelcomeText('')
    setSummaryText('')
    setButtonClicked(true)
    getRandomGameCover();
  };
  const handleBackClick = () => {
    setWelcomeText('-Press Start-')
    setSummaryText('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
    setButtonClicked(false)
    setGameLiked(false)
  };
  const handleLikeClick = () => {
    const likedGame = { cover: gameCover, title: gameTitle }
    setLikedGames((prevLikedGames) => [...prevLikedGames, likedGame])
    setGameLiked(true)
    getRandomGameCover()
  };
  const handleDislikeClick = () => {
    setGameLiked(false)
    getRandomGameCover()
  };

  const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'

  const getRandomGameCover = async () => {
    try {
      const apiKey = '5a9aed02c512451b238b2e25ac4c739ecc8de336'
      const response = await fetch(
        `${CORS_PROXY_URL}http://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&resources=game&filter=random`
      );
      const data = await response.json();
      console.log(data);
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomGame = data.results[randomIndex];
        if (randomGame.image) {
          const image = randomGame.image.medium_url.replace('http:','https');
          setGameCover(image);
          setGameTitle(randomGame.name)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ad4444',
      },
      secondary: {
        main: '#497d3b',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className='menu-bar'>
            <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={handleMenuClick}>
              <div className='menu-icon-container'>
                <FontAwesomeIcon icon={faBars}/>
              </div>
              {menuOpen && (
                <div className="menu-panel" style={{
                  animationName: menuOpen ? 'dropDown' : 'slideUp',
                  animationDuration: '0.5s',
                  animationTimingFunction: 'ease',
                  animationFillMode: 'forwards',
                }} 
                onClick={handleMenuClick}>
                  <ul>
                    {panelItems.map((item, index) => (
                      <li key={index} onClick={() => handlePanelClick(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <header className="App-header">
          <div className={`logo-container ${buttonClicked ? 'shrink' : ''}`}>
            <img src={logo} className='App-logo' alt='logo'/>
          </div>
          <div className='welcome-text'>
            <p className='para'>
              {summaryText}
            </p>
            <h2>
              {welcomeText}
            </h2>
            
          </div>
        
        {buttonClicked && (
          <div className='game-container'>
            <h3 className='fixed-title'>{gameTitle}</h3>
            <div className='game-image'>
              <img src={gameCover} alt='game' style={{ maxWidth: '75%', maxHeight: '75%'}} />
            </div>
            <div className='like-dislike-buttons'>
              <div className='button-container'>
                <Button variant='contained' color='primary' onClick={handleDislikeClick}>
                  LT
                </Button>
                <Button variant='contained' color='secondary' onClick={handleLikeClick}>
                  RT
                </Button>
              </div>
            </div>
          </div>
          )}
          {buttonClicked && <Button variant='contained' color='inherit' className='back-button' onClick={handleBackClick}>Back</Button>}
        </header>
        {!buttonClicked && (
          <div className='start-button-container'>
            <Button variant='contained' color='secondary' className='start-button' onClick={handleButtonClick}>Start</Button>
          </div>
        )}
        {showLikedGames && (
          <LikedGames likedGames={likedGames} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
