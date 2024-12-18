import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";  // Your Layout component
import { getUserList } from '../../api'; // Import the getUserList function from api.js

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated by checking the token
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not found
      router.push('/admin/login');
    } else {
      fetchUsers(token); // Fetch users if token is available
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      // Fetch the list of users using the getUserList API function
      const response = await getUserList(token);
      console.log(response)
      setUsers(response.data.users); // Store the users list in state
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-lg font-semibold text-white">Loading users...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-200 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        {error && <p className="text-red-600">{error}</p>}
        <div className="bg-white p-4 rounded shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{user.Name || "N/A"}</td>
                    <td className="p-2">{user.Email || "N/A"}</td>
                    <td className="p-2">{user.Role || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
