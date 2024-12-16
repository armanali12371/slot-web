import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import app from '../firebase'; // Firebase config file
import Layout from "../../components/Layout";  // Your Layout component
import { useEffect} from "react";

import { useRouter } from 'next/router';

export default function CreateUserForm() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');


  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role !== 'admin') {
          router.push('/'); // Redirect if not admin
        }
      } else {
        router.push('/admin/login');
      }
    };

    checkAdmin();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      // Step 1: Create User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Save role in Firestore under 'users' collection
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        role,
        createdAt: new Date()
      });

      setSuccess(`User ${email} created successfully with role: ${role}`);
      setEmail('');
      setName('');
      setPassword('');
      setRole('user');
    } catch (error) {
      console.error('Error creating user:', error.message);
      alert(error.message);
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
