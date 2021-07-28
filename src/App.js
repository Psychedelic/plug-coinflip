import logo from './logo.svg';
import './App.css';
import nnsUi from './nnsui.did';
import { useState } from 'react';

const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai'

function App() {
  const [connect, setConnected] = useState(false);
  const [plugbalance, setStats] = useState(null);

  console.log(window.ic.plug);
  const connectToPlug = () => window?.ic?.plug?.requestConnect().then(connected => setConnected(connected));
  const createAgent = async () => {
    console.log('creating agent');
    await window?.ic?.plug?.createAgent([nnsCanisterId]);
    console.log('created');
  }
  const getStats = async () => {
    if (!window.ic.plug.agent) return;
    console.log(window.ic.plug.agent);

    const NNSUiActor = await window.ic.plug.createActor({
      canisterId: nnsCanisterId,
      interfaceFactory: nnsUi,
    });

    try {
      const balance = await NNSUiActor.get_stats();
      console.log('get stats', balance);
      setStats(balance);
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
        <button onClick={getStats}>Get Stats</button>
      </header>
    </div>
  );
}

export default App;
