import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import Login from "./Login";
import '../App.css';

const MenuBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth0();

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    };

    return (
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
                    <li onClick={() => setMenuOpen(false)}>
                      <Link to="/liked-games">Liked Games</Link>
                    </li>
                    <li onClick={() => setMenuOpen(false)}>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li onClick={() => setMenuOpen(false)}>
                      {isAuthenticated ? <LogoutButton /> : <Login />}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
    );
};

export default MenuBar;