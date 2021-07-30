import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import synthwave from '../assets/synthwave.wav';
import Background from '../assets/background.jpeg';
import TitleImg from '../assets/title-image.png';
import MutedIcon from '../assets/muted-icon.svg';
import VolumeIcon from '../assets/volume-icon.svg';
import '../assets/main.css';

import ConnectionBadge from './components/ConnectionBadge';
import { ConnectionBadge, CoinSelector } from './components';
import { Picker, Leaderboard, Result } from './views';

const App = () => {
  const [audioInstance, setAudioInstance] = useState();
  const [auth, setAuth] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  useEffect(() => {
    if (!audioInstance) return;

    if (audioPlaying) {
      audioInstance.play();
    } else {
      audioInstance.pause();
    }
  }, [audioPlaying]);

  return (
    <div className='app'>
      <ReactJkMusicPlayer
        getAudioInstance={(instance) => setAudioInstance(instance)}
        audioLists={[{ musicSrc: synthwave }]}
        defaultPlayMode="singleLoop"
        autoPlay={false}
      />
      <div
        onClick={() => { setAudioPlaying(!audioPlaying) }}
        className={`volume-container ${audioPlaying ? 'playing' : 'mute'}`}
      >
        <img src={MutedIcon} className="muted" alt="mute" />
        <img src={VolumeIcon} className="playing" alt="play" />
      </div>
      <img className="background" src={Background} />
      <div className="content">
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
