"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Logo } from '../common/logo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useAtom, useSetAtom } from 'jotai';

import {
  
    authModalState,
    AuthModalView,
  } from '@/store/authModalAtom';

const Navbar = () => {
  

  const setAuthModalState = useSetAtom(authModalState);
    const [user] = useAuthState(auth);
    if (user) return <></>;
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
     <Logo></Logo>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
         
            <Button variant="outline" className="text-gray-800 border-gray-800"  onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.logIn })
            }>
              Login
            </Button>
         
            <Button className="bg-gray-800 text-white"  onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.logIn })
            }>
              Sign Up
            </Button>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
