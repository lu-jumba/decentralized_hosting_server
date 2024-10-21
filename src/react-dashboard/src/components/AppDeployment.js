import React, { useState } from "react";

function AppDeployment() {
  const [file, setFile] = useState(null);
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadApp = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = new Uint8Array(reader.result);
        // Submit file to IPFS and store the CID
        const cid = await uploadToIpfs(fileData); // Assuming `uploadToIpfs` is defined

        // Save app metadata (name, description, CID) to the blockchain
        await api.tx.appModule
          .storeAppMetadata(appName, appDescription, cid)
          .signAndSend(account, { signer });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Deploy Decentralized Application</h2>
      <input
        type="text"
        placeholder="App Name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <textarea
        placeholder="App Description"
        value={appDescription}
        onChange={(e) => setAppDescription(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadApp}>Upload and Deploy</button>
    </div>
  );
}

export default AppDeployment;
