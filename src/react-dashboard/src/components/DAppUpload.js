import React, { useState } from "react";

function DAppUpload() {
  const [file, setFile] = useState(null);
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appVersion, setAppVersion] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadDApp = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = new Uint8Array(reader.result);
        const cid = await uploadToIpfs(fileData);

        await api.tx.dAppModule
          .uploadDapp(appName, appDescription, appVersion, cid)
          .signAndSend(account, { signer });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Upload a Decentralized Application</h2>
      <input type="text" placeholder="App Name" onChange={(e) => setAppName(e.target.value)} />
      <textarea placeholder="App Description" onChange={(e) => setAppDescription(e.target.value)} />
      <input type="text" placeholder="Version" onChange={(e) => setAppVersion(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadDApp}>Upload dApp</button>
    </div>
  );
}

export default DAppUpload;
