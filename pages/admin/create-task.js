import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout'; // Layout component
import { createTask, getUserList } from '../../api'; // Import the createTask and getUserList functions

export default function CreateTask() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchUsers(token); // Fetch users when token is available
    }
  }, [router]);

  const fetchUsers = async (token) => {
    try {
      const response = await getUserList(token); // Use getUserList API to fetch users
      setUsers(response.data.users); // Assuming response contains user data
    } catch (error) {
      setError('Error fetching users');
      Swal.fire({
        title: 'Error!',
        text: 'There was an error fetching users. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('You are not authenticated.');
      return;
    }

    try {
      setLoading(true); // Show loading state

      // Prepare task data
      const taskData = {
        title,
        description,
        status,
        assignee,
      };

      // Call the API to create a task
      await createTask(token, taskData);

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
      setStatus('pending');
    } catch (error) {
      setLoading(false); // Hide loading state
      setError('Error creating task');

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
                <option key={user.UserID} value={user.UserID}>
                  {user.Name}
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

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Layout>
  );
}
