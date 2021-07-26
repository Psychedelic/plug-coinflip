import logo from './logo.svg';
import './App.css';
import { Actor } from '@dfinity/agent';
import nnsUi from './nnsui.did';
import { useEffect, useState } from 'react';
import { Principal } from '@dfinity/principal';

const createNNSUiActor = agent => Actor.createActor(nnsUi, {
  agent,
  canisterId: 'qoctq-giaaa-aaaaa-aaaea-cai'
})

function App() {
  const [connect, setConnected] = useState(false);
  const [plugbalance, setBalance] = useState(null);

  console.log(window.ic.plug);
  const connectToPlug = () => window?.ic?.plug?.requestConnect().then(connected => setConnected(connected));
  const createAgent = async () => {
    console.log('creating agent');
    await window?.ic?.plug?.createAgent(['qoctq-giaaa-aaaaa-aaaea-cai']).then(agent => console.log(agent));
    console.log('created');
  }
  const getBalance = async () => {
    if (!window.ic.plug.agent) return;
    console.log(window.ic.plug.agent);
    const NNSUiActor = createNNSUiActor(window.ic.plug.agent);
    console.log('actor', NNSUiActor);
    try {
      const balance = await NNSUiActor.get_stats();
      console.log('get stats', balance);
      setBalance(balance);
    } catch (e) {
      console.log('stats error', e);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={connectToPlug}>Connect</button>
        <span>{`Connected: ${connect}`}</span>
        {connect && <button onClick={createAgent}>Create Agent</button>}
        <button onClick={getBalance}>Get Balance</button>
      </header>
    </div>
  );
}

export default App;
