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
import { Picker, Leaderboard, Result, Connect } from './views';

const App = () => {
  const [audioInstance, setAudioInstance] = useState();
  const [connected, setConnected] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');

  const handleConnect = () => {
    console.log('should connect');
    setConnected(true);
  }

  useEffect(async () => {

    if(window.ic?.plug){
      const connected = await window.ic.plug.isConnected();
      setConnected(connected);
    }

    //if (!window.ic?.plug?.agent) {
    //  window.location.hash = '/connect';
    //}
  }, []);

  useEffect(async () => {
    if (connected) {
      const principal = await window.ic.plug.agent.getPrincipal().toText();
      setPrincipalId(principal);
    }
  }, [connected]);

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
          {
            connected
              ? <Redirect to="/pick" />
              : <Redirect to="/connect" />
          }
          <Route path="/connect">
            <Connect handleConnect={handleConnect} />
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
