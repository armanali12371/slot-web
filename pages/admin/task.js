import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore imports
import app from '../firebase'; // Firebase config
import Swal from 'sweetalert2';
import Layout from '../../components/Layout'; // Layout component
export default function AdminTaskList() {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users to resolve user names later (assignee and creator)
  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, [db]);

  // Fetch tasks for the admin
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksRef);
        const tasksList = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksList);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error fetching tasks. Please try again.',
          icon: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [db]);

  // Resolve user names based on user ID
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <Layout>
    <div className="container task-mang">
      <h2>All Tasks (Admin)</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{getUserName(task.assignee)}</td> {/* Display assignee name */}
                <td>{getUserName(task.createdBy)}</td> {/* Display creator name */}
                <td>{new Date(task.createdAt?.seconds * 1000).toLocaleString()}</td>
                <td>{new Date(task.updatedAt?.seconds * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </Layout>
  );
}
