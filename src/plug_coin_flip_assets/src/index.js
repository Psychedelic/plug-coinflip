import React, { useState } from 'react';
import { render } from 'react-dom';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Background from '../assets/background.jpeg';
import TitleImg from '../assets/title-image.png';
import '../assets/main.css';

import ConnectionBadge from './components/ConnectionBadge';
import { ConnectionBadge, CoinSelector } from './components';
import { Picker, Leaderboard, Result } from './views';

const App = () => {
  const [auth, setAuth] = useState(true);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  return (
    <div className='app'>
      <img className='background' src={Background} />
      <div className='content'>
        <img className='title-image' src={TitleImg} />
        <Router>
          <ConnectionBadge principalId={principalId} />
          {auth ? <Redirect to="/pick" /> : <Redirect to="/auth" />}
          <Route path="/auth">
            <h1>Connect to Start Playing</h1>
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/pick">
            <Picker
              selected={selectedCoin}
              setSelected={setSelectedCoin}
            />
          </Route>
          <Route path="/result">
            <Result
              guess={selectedCoin}
              setGuess={setSelectedCoin}
            />
          </Route>
        </Router>
      </div>
    </div>
  );
};


render(<App />, document.getElementById("app"));
