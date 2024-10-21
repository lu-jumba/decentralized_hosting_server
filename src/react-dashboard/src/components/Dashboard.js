import React from 'react';
import PolkadotWallet from './PolkadotWallet';
import MetaMaskWallet from './MetaMaskWallet';
import NodeMonitoring from './NodeMonitoring';
import Staking from './Staking';
import DAppDownloadPortal from './DAppDownloadPortal';

function Dashboard() {
  return (
    <div>
      <h1>Decentralized Hosting Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <PolkadotWallet />
        <MetaMaskWallet />
      </div>
      <NodeMonitoring />
      <Staking />
      <DAppDownloadPortal />
    </div>
  );
}

export default Dashboard;
