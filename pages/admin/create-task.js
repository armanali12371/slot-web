import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'; // Correct imports
import Swal from 'sweetalert2';
import app from '../firebase'; // Firebase config
import Layout from '../../components/Layout'; // Layout component
import Link from 'next/link';

export default function CreateTask() {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs
        .filter((doc) => doc.data().role === 'user') // Filter only users with 'user' role
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      setUsers(usersList);
    };

    fetchUsers();
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Show loading state

      const userId = auth.currentUser?.uid;

      // Create new task
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        status,
        assignee,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
      });

      setLoading(false); // Hide loading state

      // Success Alert
      Swal.fire({
        title: 'Task Created!',
        text: 'Your task has been created successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Clear form after successful creation
      setTitle('');
      setDescription('');
      setAssignee('');
    } catch (error) {
      setLoading(false); // Hide loading state

      // Error Alert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the task. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Layout>
      <div className="container create-task">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Assign Task</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>

        {/* <Link href="/admin/dashboard">
          <button>Back to Dashboard</button>
        </Link> */}
      </div>
    </Layout>
  );
}
