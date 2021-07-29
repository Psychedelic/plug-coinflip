import React from 'react';
import CoinSelector from './CoinSelector';
import Button from './Button';

const Picker = ({ selected, setSelected }) => (
  <div className="picker">
    <h1 className="pick-title">Pick your coin face</h1>
    <CoinSelector selected={selected} setSelected={setSelected} />
    <Button
      value="Flip coin"
      disabled={selected === ''}
    />
  </div>
);

export default Picker;
