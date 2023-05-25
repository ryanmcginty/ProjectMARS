import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './controllert.png';
import './App.css';
import LikedGames from './components/LikedGames';
import { Link } from 'react-router-dom';
import GameCard from './components/GameCard';
import DOMPurify from 'dompurify';


const App = ({ likedGames, setLikedGames }) => {
  const [panelItems] = useState(['Liked Games']);
  const [welcomeText, setWelcomeText] = useState('- Press Start -');
  const [summaryText, setSummaryText] = useState('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
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
    setSummaryText('Welcome to ProjectMARS! The ultimate matchmaking platform for gamers. Discover and explore a wide range of game titles, express your preferences, and find your perfect gaming match. Simply swipe through various game titles, clicking the LT button to dislike a game or the RT button to like it. Our smart algorithm learns your preferences and suggests games that align with your taste. Join us now and level up your gaming journey!')
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
          const sanitizedDescription = DOMPurify.sanitize(randomGame.description);
          const parser = new DOMParser();
          const descriptionDoc = parser.parseFromString(sanitizedDescription, 'text/html');
          const descriptionText = descriptionDoc.body.textContent;
          setGameDescription(descriptionText);
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
          <GameCard gameCover={gameCover} gameTitle={gameTitle} gameDescription={gameDescription} handleDislikeClick={handleDislikeClick} handleLikeClick={handleLikeClick} />
          
        </div>
      ) : (
        <div className='start-button-container'>
          <button color='secondary' className='rainbow-button' onClick={handleButtonClick}>Start</button>
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
  );

};
export default App;
