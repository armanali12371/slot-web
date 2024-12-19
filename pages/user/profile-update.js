import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebase';
import Layout from '../../components/Layout'; // Your Layout component

export default function ProfileUpdate() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch existing user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (userId) {
          const userRef = doc(db, 'users', userId);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setName(userData.name || '');
            setAge(userData.age || '');
            setProfilePictureURL(userData.profilePictureURL || '');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth, db]);

  // Handle form submission to update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const userId = auth.currentUser?.uid;
      const userRef = doc(db, 'users', userId);

      let updatedProfilePictureURL = profilePictureURL;

      // Upload new profile picture if selected
      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        await uploadBytes(storageRef, profilePicture);
        updatedProfilePictureURL = await getDownloadURL(storageRef);
      }

      // Update user data in Firestore
      await updateDoc(userRef, {
        name,
        age,
        profilePictureURL: updatedProfilePictureURL,
      });

      setSuccess('Profile updated successfully!');
      setProfilePictureURL(updatedProfilePictureURL);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };
  console.log("Updating document at path: users/", auth.currentUser?.uid);

  if (loading) {
    return <div>Loading...</div>; // Show loading until user data is fetched
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>Update Profile</h2>
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              style={styles.fileInput}
            />
            {profilePictureURL && (
              <div style={styles.imageContainer}>
                <p>Current Profile Picture:</p>
                <img
                  src={profilePictureURL}
                  alt="Profile"
                  style={styles.profileImage}
                />
              </div>
            )}
          </div>
          <button type="submit" style={styles.button}>
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.8rem',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1.6rem',
  },
  fileInput: {
    marginTop: '5px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  imageContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '2px solid #ddd',
    marginTop: '5px',
  },
};
