"use client";
import { auth } from '@/firebase/config';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component in Shadcn UI
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignInWithProvider: React.FC = () => {
  const [signInWithGoogle, user, loading, fbError] = useSignInWithGoogle(auth);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button disabled={loading} onClick={() => signInWithGoogle()}>
        Continue with Google
      </Button>
      {fbError && (
        <p className="text-center text-red-500 text-xs">
          {fbError.message}
        </p>
      )}
    </div>
  );
};

export default SignInWithProvider;
