import React, { useState, useEffect } from "react";

function DAppReviewPortal() {
  const [pendingDapps, setPendingDapps] = useState([]);

  useEffect(() => {
    const fetchPendingDApps = async () => {
      // Fetch dApps with status "Pending"
      const allDapps = await api.query.dAppModule.dapps(account);
      const pendingDApps = allDapps.filter((dapp) => dapp.status === "Pending");

      setPendingDapps(pendingDApps);
    };

    fetchPendingDApps();
  }, []);

  const approveDApp = async (uploader, index) => {
    // Approve the dApp
    await api.tx.dAppModule
      .approveDapp(uploader, index)
      .signAndSend(account, { signer });

    alert("dApp approved successfully!");
    window.location.reload();
  };

  const rejectDApp = async (uploader, index) => {
    // Reject the dApp
    await api.tx.dAppModule
      .rejectDapp(uploader, index)
      .signAndSend(account, { signer });

    alert("dApp rejected.");
    window.location.reload();
  };

  return (
    <div>
      <h2>Pending dApps for Review</h2>
      <ul>
        {pendingDapps.map((dapp, index) => (
          <li key={index}>
            <h3>{dapp.name} (v{dapp.version})</h3>
            <p>{dapp.description}</p>
            <button onClick={() => approveDApp(dapp.uploader, index)}>Approve</button>
            <button onClick={() => rejectDApp(dapp.uploader, index)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DAppReviewPortal;
