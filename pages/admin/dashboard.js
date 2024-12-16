import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth ,app} from "../firebase";
import Layout from "../../components/Layout";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role !== 'admin') {
          router.push('/'); // Redirect if not admin
        }
      } else {
        router.push('/admin/login');
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/admin/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
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
