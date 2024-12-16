import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../pages/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Sidebar = () => {
  const router = useRouter();
  const [role, setRole] = useState(null); // State to hold the user's role
  const db = getFirestore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser; // Check logged-in user
        if (user) {
          const userRef = doc(db, "users", user.uid); // Fetch user document
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setRole(userDoc.data().role); // Set role from Firestore
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [db]);

  return (
    <div className="side-bar-menu bg-gray-800 text-white h-screen flex flex-col p-4">
      <div className="admin-logo mb-6">
        <img style={{ height: "30px" }} src="/logo.svg" alt="Logo" />
      </div>

      <ul className="flex-1">
        {role === "admin" && (
          <>
            <li className="mb-4">
              <Link href="/admin/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/create-user" className="hover:text-blue-400">
                Add User
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/users" className="hover:text-blue-400">
                Users
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/booking" className="hover:text-blue-400">
                Booking
              </Link>
            </li>

            <li className="mb-4">
              <Link href="/admin/create-task" className="hover:text-blue-400">
                Task Management
              </Link>
            </li>
            <li className="mb-4">
            <Link href="/admin/task" className="hover:text-blue-400">
            View All Tasks
              </Link>
            
          </li>
          </>
        )}
        {role === "user" && (
          <>          <li className="mb-4">
            <Link href="/user/profile-update" className="hover:text-blue-400">
              Profile Update
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/user/createTask" className="hover:text-blue-400">
             Create Tasks
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/user/tasks" className="hover:text-blue-400">
             Tasks
            </Link>
          </li>
          </>

        )}
      </ul>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
