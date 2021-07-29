import React from 'react';
import CoinSelector from './CoinSelector';

const Picker = ({ selected, setSelected }) => (
  <>
    <h1 className="pick-title">Pick your coin face</h1>
    <CoinSelector selected={selected} setSelected={setSelected} />
  </>
);

export default Picker;
