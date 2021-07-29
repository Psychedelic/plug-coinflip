import React, { useState } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ConnectionBadge from './components/ConnectionBadge';

import Background from '../assets/background.jpeg';
import TitleImg from '../assets/title-image.png';
import '../assets/main.css';

const App = () =>  {
  const [auth, setAuth] = useState(false);
  const [principalId, setPrincipalId] = useState('');

  return (
    <div className='app'>
      <img className='background' src={Background} />
      <div className='content'>
        <img className='title-image' src={TitleImg} />
        <ConnectionBadge principalId={principalId}/>
        <Router>
          { auth ? <Redirect to="/" /> : <Redirect to="/auth" /> }
          <Route path="/auth">
            <h1>Connect to Start Playing</h1>
          </Route>
        </Router>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
