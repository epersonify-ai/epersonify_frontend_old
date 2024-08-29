"use client";
import { auth } from '@/firebase/config';
import { authModalState } from '@/store/authModalAtom';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component in Shadcn UI
import { Input } from '@/components/ui/input'; // Assuming you have an Input component in Shadcn UI
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { useSendSignInLinkToEmail } from 'react-firebase-hooks/auth';

const SignInWithMagicLink: React.FC = () => {
  const [sendSignInLinkToEmail, sending, fbError] = useSendSignInLinkToEmail(auth);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const setAuthModalState = useSetAtom(authModalState);

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAGIC_LINK_CONTINUE_URL as string,
    handleCodeInApp: true,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendSignInLinkToEmail(email, actionCodeSettings);

    // Temporarily store user's email in localStorage for match-check on sign-in page
    window.localStorage.setItem('emailForSignIn', email);

    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col w-full">
      {isSuccess ? (
        <>
          <p className="mt-3">Check your email 💌</p>
          <Button
            variant="default"
            className="mt-5"
            onClick={() => setAuthModalState((prev) => ({ ...prev, open: false }))}
          >
            Ok
          </Button>
        </>
      ) : (
        <>
          <p>Enter your email and we will send you a link to sign in.</p>

          <form onSubmit={handleSubmit} className="mt-3">
            <Input
              required
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3"
            />

            {fbError && <p className="text-red-500">{fbError.message}</p>}

            <Button
              type="submit"
              disabled={sending}
              className={`mt-3 ${sending ? 'bg-primary-80' : 'bg-primary-100'}`}
            >
              Send Link To Sign-In
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInWithMagicLink;
