import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';

const Connect = ({ handleConnect }) => {
  return (
    <>
      <h1>Connect to Start Playing</h1>

      <PlugConnect
        host="https://mainnet.dfinity.network/"
        whitelist={[]}
        dark
        onConnectCallback={handleConnect}
      />
    </>
  );
};

export default Connect;
