import React from 'react';

import { CoinSelector, Button } from '../../components';

const Picker = ({ actor, selected, setSelected }) => {
  const handlePlayAgain = () => window.location.hash = '/result';

  return (
    <div className="picker">
      <h1>Pick your coin face</h1>
      <CoinSelector selected={selected} setSelected={setSelected} />
      <Button
        value="Flip coin"
        disabled={selected === ''}
        onClick={handlePlayAgain}
      />
    </div>
  );
};

export default Picker;
