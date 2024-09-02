"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAtom } from 'jotai';
import { authModalState, AuthModalView } from '@/store/authModalAtom';
import { auth } from '@/firebase/config';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [authModal, setAuthModal] = useAtom(authModalState);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
    }
  }, [loading]);

  useEffect(() => {
    if (isAuthChecked && !user) {
      setAuthModal({ open: true, view: AuthModalView.logIn });
      router.push('/');
    }
  }, [isAuthChecked, user, router, setAuthModal]);

  if (loading || !isAuthChecked) {
    // You can replace this with a loading spinner or any other loading indicator
    return <div>Loading...</div>;
  }

  return <>{user ? children : null}</>;
};

export default PrivateRoute;