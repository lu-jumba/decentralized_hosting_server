import React, { useState, useEffect } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';

function PolkadotWallet() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      const extensions = await web3Enable('Decentralized Hosting Dashboard');
      if (extensions.length === 0) {
        console.log("Polkadot.js extension not found");
        return;
      }

      const allAccounts = await web3Accounts();
      if (allAccounts.length > 0) {
        setAccount(allAccounts[0].address);
      }
    };

    connectWallet();
  }, []);

  return (
    <div>
      <h2>Polkadot.js Wallet</h2>
      {account ? <p>Connected account: {account}</p> : <p>Please connect your wallet.</p>}
    </div>
  );
}

export default PolkadotWallet;
