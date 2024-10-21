import React, { useState, useEffect } from "react";

function DAppDownloadPortal() {
  const [dapps, setDapps] = useState([]);

  useEffect(() => {
    const fetchApprovedDApps = async () => {
      // Fetch dApp metadata from the blockchain
      const dappData = await api.query.dAppModule.dapps(account);

      const approvedDApps = dappData.filter((dapp) => dapp.status === "Approved");

      const formattedDApps = approvedDApps.map((dapp) => ({
        name: dapp.name.toUtf8(),
        description: dapp.description.toUtf8(),
        version: dapp.version.toUtf8(),
        cid: dapp.cid.toUtf8(),
      }));

      setDapps(formattedDApps);
    };

    fetchApprovedDApps();
  }, []);

  return (
    <div>
      <h2>Available dApps</h2>
      <ul>
        {dapps.map((dapp, index) => (
          <li key={index}>
            <h3>{dapp.name} (v{dapp.version})</h3>
            <p>{dapp.description}</p>
            <button onClick={() => downloadDApp(dapp.cid)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const downloadDApp = async (cid) => {
  const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
  window.open(ipfsUrl, "_blank");
};

export default DAppDownloadPortal;
