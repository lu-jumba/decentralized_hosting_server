import React, { useState, useEffect } from 'react';

function RoleBasedAccess() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await api.query.permissionsModule.role(account);
      setRole(userRole.toString());
    };

    fetchUserRole();
  }, [account]);

  return (
    <div>
      {role === "Admin" ? (
        <div>
          <h2>Admin Dashboard</h2>
          <p>You have full access to modify node configurations, assign roles, and manage the network.</p>
          <button onClick={() => handleAdminAction()}>Perform Admin Action</button>
        </div>
      ) : role === "Validator" ? (
        <div>
          <h2>Validator Dashboard</h2>
          <p>You can stake tokens, participate in consensus, and validate transactions.</p>
          <button onClick={() => handleValidatorAction()}>Perform Validator Action</button>

        </div>
      ) : role === "User" ? (
        <div>
          <h2>User Dashboard</h2>
          <p>You can interact with dApps and view network statistics.</p>
        </div>
      ) : (
        <p>Fetching your role...</p>
      )}
    </div>
  );
}

const handleAdminAction = async () => {
    await api.tx.roleModule.performAdminAction().signAndSend(account, { signer });
    console.log("Admin action performed");
  };
  
  const handleValidatorAction = async () => {
    await api.tx.roleModule.performValidatorAction().signAndSend(account, { signer });
    console.log("Validator action performed");
  };
export default RoleBasedAccess;
