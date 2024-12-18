import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import app from '../firebase'; // Firebase config file
import Layout from "../../components/Layout";  // Your Layout component
import { useEffect} from "react";
import { createUser } from '../../api';
import { useRouter } from 'next/router';

export default function CreateUserForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const token = localStorage.getItem("authToken"); // Get JWT token from localStorage

    try {
      // Step 1: Call the createUser function from api.js
      const data = await createUser(email, password, name, role, token);

      setSuccess(`User ${email} created successfully with role: ${role}`);
      setEmail('');
      setName('');
      setPassword('');
      setRole('user');
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Error creating user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="form-container create-user-form">
          <h2>Create User</h2>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}