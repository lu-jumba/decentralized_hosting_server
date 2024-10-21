import React, { useState } from "react";

function CrossChainTransfer() {
  const [chainId, setChainId] = useState("Ethereum");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    const chainIdValue = chainId === "Ethereum" ? 1 : 56;  // Chain ID for Ethereum/BSC
    await api.tx.crossChainBridge
      .sendCrossChainMessage(chainIdValue, message)
      .signAndSend(account, { signer });
    alert("Cross-chain message sent!");
  };

  return (
    <div>
      <h2>Cross-Chain Transfer</h2>
      <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <select onChange={(e) => setChainId(e.target.value)}>
        <option value="Ethereum">Ethereum</option>
        <option value="Polkadot">Polkadot</option>
        <option value="Fabric">Fabric</option>
        <option value="BSC">Binance Smart Chain</option>
      </select>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
}

export default CrossChainTransfer;
