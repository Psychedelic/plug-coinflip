import React, { useState, useEffect } from 'react';

import { COIN_TYPES, COIN_VALUE } from '../../consts';
import { Coin, Button } from '../../components';

const lostResultMap = {
  [COIN_TYPES.HEADS]: COIN_TYPES.TAILS,
  [COIN_TYPES.TAILS]: COIN_TYPES.HEADS,
};

const Result = ({ actor, guess, setGuess, setActor, setConnected }) => {
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

  useEffect(async () => {
    if (!window.ic?.plug?.agent) {
      setActor(false);
      setConnected(false);
      window.location.hash = '/connect';
    } else {
      const guessValue = COIN_VALUE[guess];
      const guessResult = await actor.coinFlip(guessValue);

      const titleValue = guessResult ? 'You Won!' : 'You Lost :(';
      const resultValue = guessResult ? guess : lostResultMap[guess];

      setTitle(titleValue);
      setResult(resultValue);
    }
  }, []);

  return (
    <div className="result-container">
      <h1>{title}</h1>
      <Coin
        status={result}
        glitched={result}
      />
      <div style={{ marginTop: 35 }}>
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
    </div>
  );
}

export default Result;
