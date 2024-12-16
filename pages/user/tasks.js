import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Detect authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the userId when user is logged in
      } else {
        setUserId(null); // Clear userId when logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        const taskQuery = query(
          collection(db, 'tasks'),
          where('assignee', '==', userId) // Only fetch tasks assigned to the logged-in user
        );

        try {
          const taskSnapshot = await getDocs(taskQuery);
          const tasksData = taskSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData); // Store the tasks in the state
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
      }
      setLoading(false); // Set loading state to false after the fetch is complete
    };

    fetchTasks(); // Call the fetch tasks function when userId changes (i.e., after login)
  }, [userId]); // Run the fetch only when userId changes (on login/logout)

  const updateTaskStatus = async (taskId, newStatus) => {
    const taskRef = doc(db, 'tasks', taskId);
    try {
      await updateDoc(taskRef, { status: newStatus, updatedAt: new Date() });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task
        )
      );

      // Show success SweetAlert
      Swal.fire({
        title: 'Success!',
        text: `Task status updated to ${newStatus}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating task status: ', error);

      // Show error SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the task status.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'task-pending';
      case 'in-progress':
        return 'task-in-progress';
      case 'completed':
        return 'task-completed';
      default:
        return '';
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (!userId) {
    return <div>Please log in to view your tasks.</div>; // Prompt for login if no user
  }

  return (
    <Layout>
      <div className="task-mang">
        <h1>Your Tasks</h1>

        <table className="task-table">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th> {/* Added column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={getStatusClass(task.status)}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.createdAt?.seconds * 1000).toLocaleString()}</td>
                <td>{new Date(task.updatedAt?.seconds * 1000).toLocaleString()}</td>
                <td>
                  {/* Added buttons to update status */}
                  {task.status !== 'completed' && (
                    <button className='not-completed-button' onClick={() => updateTaskStatus(task.id, 'completed')}>
                      Mark as Completed
                    </button>
                  )}
                  {task.status !== 'in-progress' && task.status !== 'completed' && (
                    <button className='pending-button' onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                      Mark as In Progress
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Tasks;
