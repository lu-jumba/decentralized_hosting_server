import React, { useState, useEffect } from 'react';

function Notifications() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const listenToEvents = async () => {
      api.query.system.events((events) => {
        events.forEach((record) => {
          const { event } = record;
          if (event.section === 'stakingModule' && event.method === 'ValidatorSlashed') {
            setAlerts((prev) => [...prev, { message: "Validator Slashed for Misbehavior", time: new Date().toLocaleTimeString() }]);
          }
          if (event.section === 'storageModule' && event.method === 'LowStorage') {
            setAlerts((prev) => [...prev, { message: "Node Running Low on Storage", time: new Date().toLocaleTimeString() }]);
          }

          if (event.section === 'dAppModule') {
            if (event.method === 'DAppApproved') {
              const [uploader, index] = event.data;
              if (uploader === account) {
                alert(`Your dApp was approved!`);
              }
            }
            if (event.method === 'DAppRejected') {
              const [uploader, index] = event.data;
              if (uploader === account) {
                alert(`Your dApp was rejected.`);
              }
            }
          }
        });
      });
    };
  
    listenToEvents();
  }, []);
  

  /*useEffect(() => {
    const checkForAlerts = async () => {
      // Simulate alert events for validator slashing, low node storage, etc.
      const lowStorageAlert = Math.random() > 0.9 ? "Low Node Storage Detected" : null;
      const slashingAlert = Math.random() > 0.95 ? "Validator Slashed for Inactivity" : null;

      if (lowStorageAlert) {
        setAlerts((prev) => [...prev, { message: lowStorageAlert, time: new Date().toLocaleTimeString() }]);
      }
      if (slashingAlert) {
        setAlerts((prev) => [...prev, { message: slashingAlert, time: new Date().toLocaleTimeString() }]);
      }
    };

    const interval = setInterval(checkForAlerts, 5000);  // Check for alerts every 5 seconds

    return () => clearInterval(interval);  // Cleanup on component unmount
  }, []);*/

  return (
    <div>
      <h2>Real-Time Notifications</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <strong>{alert.time}:</strong> {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
