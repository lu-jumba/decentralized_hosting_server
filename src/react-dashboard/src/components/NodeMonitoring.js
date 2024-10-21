import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Needed to ensure Chart.js works in React

function NodeMonitoring() {
  const [cpuUsage, setCpuUsage] = useState([]);
  const [ramUsage, setRamUsage] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchNodeStats = () => {
      const now = new Date().toLocaleTimeString();
      const newCpu = Math.random() * 100;  // Simulate random CPU usage data
      const newRam = Math.random() * 100;  // Simulate random RAM usage data

      setCpuUsage((prev) => [...prev, newCpu].slice(-10));  // Keep only last 10 records
      setRamUsage((prev) => [...prev, newRam].slice(-10));
      setTimestamps((prev) => [...prev, now].slice(-10));
    };

    const interval = setInterval(fetchNodeStats, 5000);  // Update every 5 seconds

    return () => clearInterval(interval);  // Cleanup on component unmount
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: cpuUsage,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'RAM Usage (%)',
        data: ramUsage,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Node Monitoring Dashboard</h2>
      <Line data={data} />
    </div>
  );
}

export default NodeMonitoring;
