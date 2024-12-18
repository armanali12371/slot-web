/* AXIOS IMPORT */
import axios from "axios";

// export const API_PORT = `${process.env.API_PORT}`;

// const SERVER = `${process.env.API_PORT}/`;

const api = axios.create({
    baseURL: "http://159.89.169.237:3000",
    timeout: 2000000,
  });

const login = (postData) => {
	return api.post(`/auth/login`, postData);
};
// Create User API function
const createUser = (email, password, name, role, token) => {
    return api.post(
      `/user/createUser`,
      {
        email,
        password,
        name,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
// Get User List API function
const getUserList = (token) => {
    return api.get("/user/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
// Get User List API function
const getTaskList = (token) => {
    return api.get("/task/getTaskList", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  // Create task
const createTask = (token, taskData) => {
    return api.post('/task/createTask', taskData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  // Update Profile API
const updateProfile = (token, data) => {
    return api.post('/user/updateProfile', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  // Task Update Status API
const updateTaskStatus = (token, data) => {
    return api.patch('/task/updateStatus', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };
export {
	login,
    createUser,
    getUserList,
    getTaskList,
    createTask,
    updateProfile,
    updateTaskStatus
};
