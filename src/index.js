import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LikedGamesPage from './components/LikedGames';

function Index() {
  const [likedGames, setLikedGames] = useState([]);
  const [setShowLikedGamesPage] = useState(false);

  const handleLikedGamesClose = () => {
    setShowLikedGamesPage(false);
  };

  return (
    <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App likedGames={likedGames} setLikedGames={setLikedGames} setShowLikedGamesPage={setShowLikedGamesPage} />} />
        <Route path='/liked-games' element={<LikedGamesPage likedGames={likedGames} panelItems={['Liked Games']} onClose={handleLikedGamesClose} />} />
      </Routes>
    </Router>
  </React.StrictMode>
  );
}
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<Index />);
reportWebVitals();
