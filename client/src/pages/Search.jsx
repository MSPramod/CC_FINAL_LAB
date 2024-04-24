import React, { useEffect, useState } from 'react';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // console.log("riun")
        const res = await fetch('/users');
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", backgroundColor: "#fafafa", margin: 0, padding: 0 }}>
      <div style={{ backgroundColor: "#fafafa", maxWidth: "450px", margin: "50px auto", padding: "30px", borderRadius: "8px", boxShadow: "0 0 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px", fontSize: "24px", color: "#333" }}>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersComponent;
