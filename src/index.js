import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LikedGamesPage from './components/LikedGames';
import Login from './components/Login';
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './components/User';

function Index() {

  const [likedGames, setLikedGames] = useState([]);
  const [setShowLikedGamesPage] = useState(false);

  const handleLikedGamesClose = () => {
    setShowLikedGamesPage(false);
    window.location.href = '/';
  };

  return (
    <React.StrictMode>
      <Router>
        <Auth0Provider
          domain='dev-0y2p15ofhuro1lwb.us.auth0.com'
          clientId='F36er9YNgRHzPg1dvIg1tsXNQU7nku40'
          authorizationParams={{
            redirectUri: window.location.origin,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<App likedGames={likedGames} setLikedGames={setLikedGames} onClose={handleLikedGamesClose} />}/>
            <Route path="/liked-games" element={<LikedGamesPage likedGames={likedGames} panelItems={['Liked Games']} onClose={handleLikedGamesClose} />} />
            <Route path="/profile" element={<Profile likedGamesCount={likedGames.length} />} />
          </Routes>
        </Auth0Provider>
      </Router>
    </React.StrictMode>
  );
}
const root = document.getElementById('root');
ReactDOM.render(<Index />, root);
reportWebVitals();
