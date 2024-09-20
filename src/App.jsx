import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users`);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${editingId}`, { name, email });
    } else {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, { name, email });
    }
    setName('');
    setEmail('');
    setEditingId(null);
    fetchUsers();
  };

  // Delete User
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${id}`);
    fetchUsers();
  };

  // Edit User
  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
