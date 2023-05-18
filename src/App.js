import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './pmarslogo.png';
import zelda from './zelda.jpg'
import './App.css';
import { Button } from '@mui/material';
/* test 5 */
function App() {
  const [welcomeText, setWelcomeText] = useState('Begin?');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [gameLiked, setGameLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  };
  const handlePanelClick = (item) => {
    setWelcomeText('You clicked ' + item)
    setButtonClicked(true)
  };
  const handleButtonClick = () => {
    setWelcomeText('Left or Right Trigger?')
    setButtonClicked(true)
  };
  const handleBackClick = () => {
    setWelcomeText('Welcome')
    setButtonClicked(false)
    setGameLiked(false)
  };
  const handleLikeClick = () => {
    setGameLiked(true)
  };
  const handleDislikeClick = () => {
    setGameLiked(false)
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
        <div className='logo-container'>
          <img src={logo} className='App-logo' alt='logo'/>
        </div>
        <div className='welcome-text'>
          <h2>{welcomeText}</h2>
        </div>
        <div className='buttons-container'>
        {!buttonClicked && <button onClick={handleButtonClick}>Start</button>}
        {buttonClicked && (
          <div className='game-container'>
            <div className='game-image'>
              <img src={zelda} alt='game' />
            </div>
            <div className='like-dislike-button'>
            <Button variant='contained' color='primary' onClick={handleDislikeClick}>
              LT
            </Button>
            <Button variant='contained' color='secondary' onClick={handleLikeClick}>
              RT
            </Button>
            </div>
          </div>
          )}
          {buttonClicked && <button onClick={handleBackClick}>Back</button>}
        </div>
      </header>
    </div>
  );
}

export default App;
