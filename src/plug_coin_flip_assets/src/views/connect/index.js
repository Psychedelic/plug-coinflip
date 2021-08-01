import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';

const Connect = ({ handleConnect }) => {

  const network = process.env.DFX_NETWORK || 'local';
  const whitelist = [process.env.PLUG_COIN_FLIP_CANISTER_ID || 'ryjl3-tyaaa-aaaaa-aaaba-cai'];

  return (
    <>
      <h1>Connect to Start Playing</h1>

      <PlugConnect
        host={network}
        whitelist={whitelist}
        dark
        onConnectCallback={handleConnect}
      />
    </>
  );
};

export default Connect;
