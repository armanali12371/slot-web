import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // Default status is "pending"
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Detect authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the userId when user is logged in
      } else {
        setUserId(null); // Clear userId when logged out
        router.push('/login'); // Redirect to login if no user is logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        status,
        assignee: userId, // Task is assigned to the logged-in user
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        createdBy: userId, // User creating the task
      });

      Swal.fire({
        title: 'Success!',
        text: 'Task created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset the form fields
      setTitle('');
      setDescription('');
      setStatus('pending');
      setLoading(false);
    } catch (error) {
      console.error('Error adding task: ', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the task. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="create-task">
        <h1>Create a New Task</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
      </div>
    </Layout>
  );
};

export default CreateTask;
