import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/admin/login"); // Redirect to login if no token found
        return;
      }

      try {
        // Decode token to get user role (assuming token contains role)
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload

        if (decodedToken?.role !== "admin") {
          router.push("/"); // Redirect if not admin
        } else {
          // Set user info if admin
          setUser(decodedToken);
          setLoading(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        router.push("/admin/login"); // Invalid token, redirect to login
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-200 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user?.email}</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Total Users</h2>
            <p className="text-2xl font-semibold text-blue-500">150</p>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-2">Active Sessions</h2>
            <p className="text-2xl font-semibold text-green-500">45</p>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-2">New Signups</h2>
            <p className="text-2xl font-semibold text-purple-500">10</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
