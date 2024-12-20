# Task Management System

This is a task management system built using **Next.js** and **Firebase**. The application allows users to log in, view their assigned tasks, and update task statuses. It also provides a clean and intuitive user interface for managing tasks effectively.

## Features

- **Authentication**:
  - User login and logout using Firebase Authentication.
  - Tasks are filtered based on the logged-in user's ID.

- **Task Management**:
  - Fetch tasks from Firestore, assigned specifically to the authenticated user.
  - View task details such as title, description, status, creation date, and last updated date.
  - Update task statuses dynamically (e.g., mark as "In Progress" or "Completed").

- **SweetAlert Integration**:
  - Visual feedback for successful or failed operations.

## Technologies Used

### Frontend
- [Next.js](https://nextjs.org/): A React framework for server-side rendering and static site generation.
- [React](https://reactjs.org/): For building interactive user interfaces.
- [SweetAlert2](https://sweetalert2.github.io/): For modern and customizable alert dialogs.

### Backend
- [Firebase Firestore](https://firebase.google.com/products/firestore): For real-time database storage.
- [Firebase Authentication](https://firebase.google.com/products/auth): For secure user authentication.

## Prerequisites

- **Node.js** (>= 18.8.0)
- **Firebase Project** set up with Firestore and Authentication enabled.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Create a `firebase.js` file in the `pages/` directory.
   - Add your Firebase configuration:
     ```javascript
     import { initializeApp } from 'firebase/app';
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';

     const firebaseConfig = {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_STORAGE_BUCKET',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID',
     };

     const app = initializeApp(firebaseConfig);

     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000/`.


## How to Use

1. **Login**: Log in to the application with your Firebase-authenticated credentials.
2. **View Tasks**: Once logged in, view your assigned tasks in a table format.
3. **Update Tasks**:
   - Use the action buttons to change the status of tasks.
   - Statuses include "Pending," "In Progress," and "Completed."
4. **Alerts**: Get real-time feedback through SweetAlert2 notifications.

## Deployment

To deploy the application to a production environment:

1. CICD is setup on push command.
   ```

Alternatively, you can deploy the application to platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

## Troubleshooting

### Common Issues
- **Invalid Firebase Config**: Double-check your Firebase configuration in `firebase.js`.
- **Permission Errors**: Ensure that Firestore rules allow read/write access for authenticated users.
- **Authentication State**: Ensure Firebase Authentication is properly set up in your Firebase console.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [SweetAlert2 Documentation](https://sweetalert2.github.io/)

---

Feel free to contribute or report issues to improve this project!
