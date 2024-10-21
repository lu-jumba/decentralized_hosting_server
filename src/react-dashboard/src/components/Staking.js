import React, { useState } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';

function Staking() {
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState(null);

  const handleStaking = async () => {
    const injector = await web3FromSource('polkadot-js');
    
    await api.tx.stakingModule
      .stakeTokens(amount)
      .signAndSend(account, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
          console.log('Transaction in block');
        }
      });
  };

  return (
    <div>
      <h2>Staking</h2>
      <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount to stake" />
      <button onClick={handleStaking}>Stake Tokens</button>
    </div>
  );
}

export default Staking;
