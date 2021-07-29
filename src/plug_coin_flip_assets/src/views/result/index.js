import React, { useState, useEffect } from 'react';

import { COIN_TYPES } from '../../consts';
import { Coin, Button } from '../../components';

const Result = ({ guess, setGuess }) => {
  const [title, setTitle] = useState('Tossing quantum coin');
  const [result, setResult] = useState(COIN_TYPES.LOADING);

  const disabledButtons = result === COIN_TYPES.LOADING;

  const handlePlayAgain = () => {
    setGuess('');
    window.location.hash = '/pick';
  };

  const handleResults = () => {
    setGuess('');
    window.location.hash = '/leaderboard';
  }

  useEffect(() => {
    setTimeout(() => {
      setResult(guess);
      setTitle('You Lost :(');
    }, 5000);
  }, []);

  return (
    <div className="result-container">
      <h1 className="pick-title">{title}</h1>
      <Coin
        status={result}
        glitched={result}
      />
      <Button
        value="Play Again"
        disabled={disabledButtons}
        onClick={handlePlayAgain}
      />
      <Button
        border={false}
        value="View Results"
        disabled={disabledButtons}
        onClick={handleResults}
      />
    </div>
  );
}

export default Result;
