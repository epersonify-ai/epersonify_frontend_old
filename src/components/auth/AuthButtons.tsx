"use client";

import { signOut } from 'firebase/auth';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component in Shadcn UI
import { cn } from '@/lib/utils'; // Utility function to handle conditional classes
import { auth } from '@/firebase/config';
import AuthModal from './AuthModal';

const AuthButtons: React.FC = () => {
  
  const [user] = useAuthState(auth);

  return (
    <div className={cn('flex w-full gap-5 flex-col sm:flex-row justify-center sm:justify-between')}>
        
      
      {user ? (
        <Button
          className="max-w-[300px] mx-auto"
          variant="default"
          onClick={() => signOut(auth)}
        >
          Log Out
        </Button>
      ) : (
        <>
          <Button
            variant="default"
           
          >
            Log In
          </Button>
       
        </>
      )}
    </div>
  );
};

export default AuthButtons;
