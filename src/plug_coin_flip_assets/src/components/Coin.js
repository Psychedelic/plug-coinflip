import React from 'react';

import { COIN_TYPES } from '../consts';

import '../../assets/coin.css';

const Coin = ({ status, glitched }) => {
  if (status === COIN_TYPES.LOADING) {
    return (
      <div className="coin-container">
        <div className="coin delay heads glitched">
          <div className="blur" />
          <div className="face-heads">
            HEAD
          </div>
          <div className="face-tails">
            TAIL
          </div>
        </div>
        <div className="coin tails glitched">
          <div className="blur" />
          <div className="face-heads">
            HEAD
          </div>
          <div className="face-tails">
            TAIL
          </div>
        </div>
        <div className="coin loading">
          <div className="blur" />
          <div className="face-heads">
            HEAD
          </div>
          <div className="face-tails">
            TAIL
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="coin-container">
      { glitched  && (
        <div className={`coin ${glitched} ${glitched ? 'glitched' : ''}`}>
          <div className="blur" />
          <div className="face-heads">
            HEAD
          </div>
          <div className="face-tails">
            TAIL
          </div>
        </div>
      )}
      <div className={`coin ${status}`}>
        <div className="blur" />
        <div className="face-heads">
          HEAD
        </div>
        <div className="face-tails">
          TAIL
        </div>
      </div>
    </div>
  );
};

export default Coin;
