import React, { useState } from 'react';
import api from '../api';

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const fetchUser = async () => {
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      setMessage('Not authenticated or error fetching user');
      setUser(null);
    }
  };

  return (
    <div>
      <button onClick={fetchUser}>Get User Info</button>
      {user && (
        <div>
          <h3>User Info</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
      {message && <div>{message}</div>}
    </div>
  );
} 