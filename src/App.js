import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './controllert.png';
import './App.css';
import './components/login.css';
import LikedGames from './components/LikedGames';
import { Link } from 'react-router-dom';
import GameCard from './components/GameCard';
import DOMPurify from 'dompurify';

const App = ({ likedGames, setLikedGames }) => {
  const [panelItems] = useState(['Liked Games','Login']);
  const [welcomeText, setWelcomeText] = useState('- Press Start -');
  const [summaryText, setSummaryText] = useState('Welcome to LT RT! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
  const [buttonClicked, setButtonClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ gameDescription, setGameDescription ] = useState('');
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
    setSummaryText('Welcome to LT RT! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
    setButtonClicked(false)
  };
  const handleLikeClick = () => {
    const likedGame = { cover: gameCover, title: gameTitle, description: gameDescription }
    setLikedGames((prevLikedGames) => [...prevLikedGames, likedGame])
    getRandomGameCover()
  };
  const handleDislikeClick = () => {
    getRandomGameCover()
  };

  const corsProxies = [
    'https://cors-anywhere.herokuapp.com/',
    'https://allorigins.win/'
  ];

  const getRandomGameCover = async () => {
    setLoading(true);
    try {
      const apiKey = '5a9aed02c512451b238b2e25ac4c739ecc8de336'
      const currentDate = new Date();
      const releaseDateFilter = `original_release_date:2016-01-01|${currentDate.toISOString().split('T')[0]}`;
      const scoreFilter = 'score:85';
      const reviewFilter = 'number_of_user_reviews:>0';
      const languageFilter = 'platforms:146';
      const sort = 'number_of_user_reviews:desc';
      let proxyIndex = 0;
      let data = null;
      while (!data && proxyIndex < corsProxies.length) {
        try {
          const proxyURL = corsProxies[proxyIndex];
          const response = await fetch(
            `${proxyURL}http://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&resources=game&filter=${releaseDateFilter},${scoreFilter},${reviewFilter},${languageFilter}&sort=${sort}`
          );
          data = await response.json();
        } catch (error) {
          console.error(`Failedd to fetch from ${corsProxies[proxyIndex]}: ${error}`)
          proxyIndex++;
        }
      }
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomGame = data.results[randomIndex];
        if (randomGame.image) {
          const image = randomGame.image.medium_url.replace('http:','https');
          setGameCover(image);
          setGameTitle(randomGame.name)
          const sanitizedDescription = DOMPurify.sanitize(randomGame.description);
          const parser = new DOMParser();
          const descriptionDoc = parser.parseFromString(sanitizedDescription, 'text/html');
          const descriptionText = descriptionDoc.body.textContent;
          setGameDescription(descriptionText);
        } else {
          console.error('Failed to fetch data from all CORS proxies')
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
        <div>
          <div className='menu-bar'>
            <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={handleMenuClick}>
              <div className='menu-icon-container'>
                <FontAwesomeIcon icon={faBars}/>
              </div>
              {menuOpen && (
                <div
                  className="menu-panel"
                  style={{
                    animationName: menuOpen ? 'dropDown' : 'slideUp',
                    animationDuration: '0.5s',
                    animationTimingFunction: 'ease',
                    animationFillMode: 'forwards',
                  }}
                  onClick={handleMenuClick}
                >
                  <ul>
                    {panelItems.map((item, index) => (
                      <li key={index} onClick={() => setMenuOpen(false)}>
                        {item === 'Liked Games' ? (
                          <Link to="/liked-games">{item}</Link>
                        ) : item === 'Login' ? (
                          <Link to="/login">{item}</Link>
                        ) : (
                          <span>{item}</span>
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
                <GameCard gameCover={gameCover} gameTitle={gameTitle} gameDescription={gameDescription} handleDislikeClick={handleDislikeClick} handleLikeClick={handleLikeClick} />
              </div>
            ) : (
              <div className='start-button-container'>
                <button className='rainbow-button' onClick={handleButtonClick}>Start</button>
              </div>
            )}
            <div className='start-button-container'>
              {buttonClicked && <button className='rainbow-button' onClick={handleBackClick}>Back</button>}
            </div>
          </header>
          {showLikedGamesPage && ( 
            <LikedGames likedGames={likedGames} onClose={() => setShowLikedGamesPage(false)} />
          )}
        </div>
    </div>
  );
};
export default App;
