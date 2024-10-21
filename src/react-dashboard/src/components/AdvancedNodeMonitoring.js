import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function AdvancedNodeMonitoring() {
  const [blockProduction, setBlockProduction] = useState([]);
  const [crossChainMessages, setCrossChainMessages] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchAdvancedStats = () => {
      const now = new Date().toLocaleTimeString();
      const newBlockProd = Math.random() * 10;  // Simulate block production
      const newCrossChainMsg = Math.random() * 20;  // Simulate cross-chain messages

      setBlockProduction((prev) => [...prev, newBlockProd].slice(-10));
      setCrossChainMessages((prev) => [...prev, newCrossChainMsg].slice(-10));
      setTimestamps((prev) => [...prev, now].slice(-10));
    };

    const interval = setInterval(fetchAdvancedStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Block Production Rate',
        data: blockProduction,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Cross-Chain Messages',
        data: crossChainMessages,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Advanced Node Monitoring</h2>
      <Line data={data} />
    </div>
  );
}

export default AdvancedNodeMonitoring;
