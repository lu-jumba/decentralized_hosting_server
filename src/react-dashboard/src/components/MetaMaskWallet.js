import React, { useState } from 'react';
import { ethers } from 'ethers';

function MetaMaskWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (err) {
        console.log('Error connecting wallet', err);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  return (
    <div>
      <h2>MetaMask Wallet</h2>
      {account ? <p>Connected account: {account}</p> : <button onClick={connectWallet}>Connect MetaMask</button>}
    </div>
  );
}

export default MetaMaskWallet;
