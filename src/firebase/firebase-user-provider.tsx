"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth, firestore } from './config'; // Adjust this import based on your Firebase configuration
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, onSnapshot, QuerySnapshot } from 'firebase/firestore';

interface FirestoreUserData {
  uid: string;
  name: string;
  imageUrl: string;
  username: string;
  bio: string;
  email: string | null; // email can be null depending on your Firebase config
  providerData: any[]; // Replace `any` with a more specific type if you have it
}

type User = FirebaseUser & FirestoreUserData;

interface Error {
  message: string;
}

// Define the context type
interface UserContextType {
  user: User;
  loading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        const q = query(collection(firestore, 'users'), where('uid', '==', authUser.uid));

        unsubscribeFirestore = onSnapshot(
          q,
          (querySnapshot: QuerySnapshot) => {
            if (!querySnapshot.empty) {
              const firestoreData = querySnapshot.docs[0].data() as FirestoreUserData;
              setUser({ ...authUser, ...firestoreData });
              setError(null); // Reset any previous error
            } else {
              // User document doesn't exist in Firestore
              setUser(authUser as User);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching user data:", error);
            setError({ message: error.message || "An error occurred while fetching user data" });
            setUser(authUser as User);
            setLoading(false);
          }
        );
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
        setError(null); // Reset error when user signs out
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
        }
      }
    });

    // Cleanup function
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
