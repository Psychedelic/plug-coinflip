import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Background from '../assets/background.jpeg';
import TitleImg from '../assets/title-image.png';
import Button from './components/Button.js';
import '../assets/main.css';

import { COIN_TYPES } from './consts';
import ConnectionBadge from './components/ConnectionBadge';
import CoinSelector from './components/CoinSelector';

const App = () =>  {
  const [auth, setAuth] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  return (
    <div className='app'>
      <img className='background' src={Background} />
      <div className='content'>
        <img className='title-image' src={TitleImg} />
        <ConnectionBadge principalId={principalId} />
        <Router>
          {auth ? <Redirect to="/" /> : <Redirect to="/auth" />}
          <Route path="/auth">
            <CoinSelector
              selected={selectedCoin}
              setSelected={setSelectedCoin}
            />
            <h1>Connect to Start Playing</h1>
            <Button value="Play Again" />
            <Button value="View Results" border={false} />
          </Route>
        </Router>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
