import React, { useState, useEffect } from "react";

function FileManagement() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const userFiles = await api.query.ipfsModule.userFiles(account);
      setFiles(userFiles);
    };

    fetchFiles();
  }, [account]);

  const deleteFile = async (cid) => {
    await api.tx.ipfsModule.deleteFile(cid).signAndSend(account, { signer });
    setFiles(files.filter((file) => file.cid !== cid));
  };

  return (
    <div>
      <h2>Manage Your Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <p>{file.name} (CID: {file.cid})</p>
            <button onClick={() => deleteFile(file.cid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileManagement;
