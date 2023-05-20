import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './controllert.png';
import './App.css';
import { Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [welcomeText, setWelcomeText] = useState('- Press Start -');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [gameLiked, setGameLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [gameCover, setGameCover] = useState('');
  const [gameTitle, setGameTitle] = useState('');

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  };
  const handlePanelClick = (item) => {
    setWelcomeText('You clicked ' + item)
    setButtonClicked(true)
  };
  const handleButtonClick = () => {
    setWelcomeText('Dislike (RT) or Like (LT)?')
    setButtonClicked(true)
    getRandomGameCover();
  };
  const handleBackClick = () => {
    setWelcomeText('-Press Start-')
    setButtonClicked(false)
    setGameLiked(false)
  };
  const handleLikeClick = () => {
    setGameLiked(true)
  };
  const handleDislikeClick = () => {
    setGameLiked(false)
  };

  const CORS_PROXY_URL = 'https://cors.bridged.cc/'

  const getRandomGameCover = async () => {
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
            <h2>{welcomeText}</h2>
          </div>
        {!buttonClicked && <Button variant='contained' color='secondary' onClick={handleButtonClick}>Start</Button>}
        {buttonClicked && (
          <div className='game-container'>
            <h3 className='fixed-title'>{gameTitle}</h3>
            <div className='game-image'>
              <img src={gameCover} alt='game' style={{ maxWidth: '500%', maxHeight: '500%'}} />
            </div>
            <div className='like-dislike-button'>
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
          {buttonClicked && <Button variant='contained' color='warning' className='back-button' onClick={handleBackClick}>Back</Button>}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
