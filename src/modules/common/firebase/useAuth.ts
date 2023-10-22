import { Auth, User, browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { auth } from './firebase';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return { currentUser, auth };
};


