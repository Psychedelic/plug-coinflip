import React from 'react';

import { COIN_TYPES } from '../consts';
import Coin from './Coin';

import '../../assets/coinSelector.css';

const tailClassName = {
  [COIN_TYPES.HEADS]: 'disabled',
  [COIN_TYPES.TAILS]: 'selected',
};

const headClassName = {
  [COIN_TYPES.HEADS]: 'selected',
  [COIN_TYPES.TAILS]: 'disabled',
};

const CoinSelector = ({ selected, setSelected }) => {
  return (
    <div className="coin-selector">
      <Coin
        status={COIN_TYPES.HEADS}
        glitched={COIN_TYPES.HEADS}
        className={headClassName[selected]}
        onClick={() => setSelected(COIN_TYPES.HEADS)}
      />
      <Coin
        delay
        status={COIN_TYPES.TAILS}
        glitched={COIN_TYPES.TAILS}
        className={tailClassName[selected]}
        onClick={() => setSelected(COIN_TYPES.TAILS)}
      />
    </div>
  );
}

export default CoinSelector;
