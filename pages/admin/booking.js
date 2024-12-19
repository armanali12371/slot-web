import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../components/firebase";  // Import auth and db
import { collection, getDocs } from "firebase/firestore";
import Layout from "../../components/Layout";  // Your Layout component

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for authentication status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Authenticated user:", currentUser);

      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        fetchUsers(); // Fetch users once authenticated
      } else {
        setLoading(false);
        window.location.href = "/admin/login"; // Redirect to login if no user is found
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const fetchUsers = async () => {
    try {
    
    //   console.log(usersList)
      const usersCollectionRef = collection(db, "bookings"); 
      
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users: ", error);
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
        <div className="bg-white p-4 rounded shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">partySize</th>
                <th className="p-2 text-left">date</th>
              </tr>
            </thead>
            <tbody>
  {users.length > 0 ? (
    users.map((user, index) => (
      <tr key={index} className="border-b">
        <td className="p-2">{user.name || "N/A"}</td>
        <td className="p-2">{user.email || "N/A"}</td>
        <td className="p-2">{user.phone || "N/A"}</td>
        <td className="p-2">{user.partySize || "N/A"}</td>
        <td className="p-2">{user.date || "N/A"}</td>
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
