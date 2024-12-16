import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return user;
};

export default useAuth;
