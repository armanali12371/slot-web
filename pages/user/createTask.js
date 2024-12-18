import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import axios from 'axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open'); // Default status
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Fetch token from localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login'); // Redirect to login if no token is found
    } else {
      setToken(authToken);
    }
  }, [router]);

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

    const taskData = {
      title,
      description,
      status,
    };

    try {
      const response = await axios.post(
        'http://159.89.169.237:3000/task/createTask',
        taskData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: 'Success!',
        text: 'Task created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus('open');
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error creating the task. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
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
              <option value="open">Open</option>
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
