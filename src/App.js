import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './pmars3.gif';
import './App.css';
/* test 5 */
function App() {
  const [logoVisible] = useState(true);
  const [welcomeText, setWelcomeText] = useState('Welcome');
  const [buttonClicked, setButtonClicked] = useState(false);
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
    setWelcomeText('Turn back')
    setButtonClicked(true)
  };
  const handleBackClick = () => {
    setWelcomeText('Welcome')
    setButtonClicked(false)
  };

  return (
    <div className="App">
      <div className='menu-bar'>
          <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={handleMenuClick}>
            <div className='menu-icon-container'>
              <FontAwesomeIcon icon={faBars}/>
            </div>
            {menuOpen && (
              <div className="menu-panel">
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
          {logoVisible && <img src={logo} className='App-logo' alt="logo"/>}
        </div>
        <h1>{welcomeText}</h1>
        {!buttonClicked && (
          <button onClick={handleButtonClick}>Click me</button>
        )}
        {buttonClicked && (
          <button onClick={handleBackClick}>Back</button>
        )}
      </header>
    </div>
  );
}

export default App;
