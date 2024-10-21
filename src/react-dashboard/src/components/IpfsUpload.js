import React, { useState } from "react";
import { web3FromSource } from '@polkadot/extension-dapp';

function IpfsUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadToIpfs = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileData = new Uint8Array(reader.result);
        
        // Assuming API connection to Substrate node is established
        const { signer } = await web3FromSource("polkadot-js");
        const txHash = await api.tx.ipfsModule
          .uploadData(fileData)
          .signAndSend(account, { signer });

        console.log("IPFS CID uploaded successfully, transaction:", txHash);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToIpfs}>Upload to IPFS</button>
    </div>
  );
}

export default IpfsUpload;
