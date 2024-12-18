import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../api";  // Import the login API

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    try {
      // Prepare the login payload
      const postData = { email, password };

      // Call the login API
      const response = await login(postData);

      if (response && response.data && response.data.token) {
        // Store the token in localStorage for use in subsequent requests
        localStorage.setItem("authToken", response.data.token);

        // Get user role from the response
        const userRole = response.data.role;

        console.log("User signed in:", response);

        // Redirect based on the role
        if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else if (userRole === "user") {
          router.push("/user/profile-update");
        } else {
          setError("Invalid role. Please contact support.");
        }
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
