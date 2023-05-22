import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './controllert.png';
import './App.css';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LikedGames from './components/LikedGames';
import { Link } from 'react-router-dom';

function App({ likedGames, setLikedGames }) {
  const [welcomeText, setWelcomeText] = useState('- Press Start -');
  const [summaryText, setSummaryText] = useState('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
  const [buttonClicked, setButtonClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelItems] = useState(['Liked Games']);
  const [gameCover, setGameCover] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [showLikedGamesPage, setShowLikedGamesPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  };
  const handleButtonClick = () => {
    setWelcomeText('')
    setSummaryText('')
    setButtonClicked(true)
    getRandomGameCover();
  };
  const handleBackClick = () => {
    setWelcomeText('- Press Start -')
    setSummaryText('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
    setButtonClicked(false)
  };
  const handleLikeClick = () => {
    const likedGame = { cover: gameCover, title: gameTitle }
    setLikedGames((prevLikedGames) => [...prevLikedGames, likedGame])
    getRandomGameCover()
  };
  const handleDislikeClick = () => {
    getRandomGameCover()
  };

  const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'

  const getRandomGameCover = async () => {
    setLoading(true);
    try {
      const apiKey = '5a9aed02c512451b238b2e25ac4c739ecc8de336'
      const currentDate = new Date();
      const fiveYears = currentDate.getFullYear() - 5;
      const releaseDateFilter = `original_release_date:${fiveYears}-01-01|${currentDate.toISOString().split('T')[0]}`;
      const response = await fetch(
        `${CORS_PROXY_URL}http://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&resources=game&filter=random&filter=${releaseDateFilter}`
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
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#558b81',
        dark: '#68a7ed',
      },
      secondary: {
        main: '#0087bd',
        dark: '#05abed',
      },
      back: {
        main: '#a697af',
        contrastText: '#3c224d',
        dark: '#9c56c7',
      },
      LT: {
        main: '#ad4444',
        contrastText: '#fff',
        dark: '#c73030',
      },
      RT: {
        main: '#497d3b',
        contrastText: '#fff',
        dark: '#4a9c33',
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
                      <li key={index}>
                        {item === 'Liked Games' ? (
                          <Link to="/liked-games">{item}</Link>
                        ) : (
                          item
                        )}
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
        {loading ? ( 
          <p>Loading...</p>
        ) : buttonClicked ? ( 
          <div className='game-container'>
            <h3 className='fixed-title'>{gameTitle}</h3>
            <div className='game-image'>
              <img src={gameCover} alt='game' style={{ maxWidth: '75%', maxHeight: '75%'}} />
            </div>
            <div className='like-dislike-buttons'>
              <div className='button-container'>
                <Button variant='contained' color='LT' onClick={handleDislikeClick}>
                  LT
                </Button>
                <Button variant='contained' color='RT' onClick={handleLikeClick}>
                  RT
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='start-button-container'>
            <Button variant='contained' color='secondary' className='start-button' onClick={handleButtonClick}>Start</Button>
          </div>
        )}
        {buttonClicked && <Button variant='contained' color='back' className='back-button' onClick={handleBackClick}>Back</Button>}
        </header>
        {showLikedGamesPage && ( 
          <LikedGames likedGames={likedGames} onClose={() => setShowLikedGamesPage(false)} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
