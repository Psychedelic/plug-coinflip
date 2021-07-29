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
import '../assets/main.css';

import { COIN_TYPES } from './consts';
import { ConnectionBadge, CoinSelector, Picker } from './components';

const App = () =>  {
  const [auth, setAuth] = useState(true);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  return (
    <div className='app'>
      <img className='background' src={Background} />
      <div className='content'>
        <img className='title-image' src={TitleImg} />
        <ConnectionBadge principalId={principalId}/>
        <Router>
          { auth ? <Redirect to="/pick" /> : <Redirect to="/auth" /> }
          <Route path="/auth">
            <CoinSelector
              selected={selectedCoin}
              setSelected={setSelectedCoin}
            />
            <h1>Connect to Start Playing</h1>
          </Route>
          <Route path="/pick">
            <Picker 
              selected={selectedCoin}
              setSelected={setSelectedCoin}
            />
          </Route>
        </Router>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
