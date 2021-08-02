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

import { idlFactory } from "../../declarations/plug_coin_flip";

import { ConnectionBadge, CoinSelector } from './components';
import { Picker, Leaderboard, Result, Connect } from './views';

const App = () => {
  const [audioInstance, setAudioInstance] = useState();
  const [connected, setConnected] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [principalId, setPrincipalId] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [actor, setActor] = useState(false);

  const handleConnect = async () => {
    setConnected(true);

    if (!window.ic.plug.agent) {
      const whitelist = [process.env.PLUG_COIN_FLIP_CANISTER_ID];
      await window.ic?.plug?.createAgent(whitelist);
    }

    // Create an actor to interact with the NNS Canister
    // we pass the NNS Canister id and the interface factory
    const NNSUiActor = await window.ic.plug.createActor({
      canisterId: process.env.PLUG_COIN_FLIP_CANISTER_ID,
      interfaceFactory: idlFactory,
    });

    setActor(NNSUiActor);
  }

  useEffect(async () => {
    if (!window.ic?.plug?.agent) {
      setActor(false);
      setConnected(false);
      window.location.hash = '/connect';
    }
  }, []);

  useEffect(async () => {
    if (connected) {
      const principal = await window.ic.plug.agent.getPrincipal();

      if (principal) {
        setPrincipalId(principal.toText());
      }
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
            <Leaderboard actor={actor} setActor={setActor}/>
          </Route>
          <Route path="/pick">
            <Picker
              actor={actor}
              selected={selectedCoin}
              setSelected={setSelectedCoin}
              setActor={setActor}
            />
          </Route>
          <Route path="/result">
            <Result
              guess={selectedCoin}
              setGuess={setSelectedCoin}
              actor={actor}
              setActor={actor}
            />
          </Route>
        </Router>
      </div>
    </div>
  );
};


render(<App />, document.getElementById("app"));
