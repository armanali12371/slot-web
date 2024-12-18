import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout'; // Layout component
import Swal from 'sweetalert2';
import { getTaskList } from '../../api'; // Import the getTaskList function from api.js

export default function AdminTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login page if token is not found
      router.push('/admin/login');
    } else {
      fetchTasks(token); // Fetch tasks if token is available
    }
  }, [router]);

  const fetchTasks = async (token) => {
    try {
      const response = await getTaskList(token);
      console.log(response)
      setTasks(response.data.tasks); // Store tasks in state
    } catch (error) {
      setError('Error fetching tasks');
      Swal.fire({
        title: 'Error!',
        text: 'There was an error fetching tasks. Please try again.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-lg font-semibold text-white">Loading tasks...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container task-mang">
        <h2>All Tasks (Admin)</h2>

        {error && <p className="text-red-600">{error}</p>}

        <div className="bg-white p-4 rounded shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="p-2 text-left">Task Title</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Assigned To</th>
                <th className="p-2 text-left">Created By</th>
                <th className="p-2 text-left">Created At</th>
                <th className="p-2 text-left">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id}>
                  <td>{task.TaskTitle}</td>
                    <td>{task.Description}</td>
                    <td>{task.Status}</td>
                    <td>{task.AssignedTo || 'N/A'}</td>
                    <td>{task.CreatedBy || 'N/A'}</td>
                    <td>{new Date(task.CreatedAt).toLocaleString()}</td>
                    <td>{new Date(task.UpdatedAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-2 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
