"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSignInWithEmailLink } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { isSignInWithEmailLink, signInWithEmailLink as firebaseSignInWithEmailLink } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignInWithLinkPage() {
  const [signInWithEmailLink, user, loading, error] = useSignInWithEmailLink(auth);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInAndRedirect(email);
  };

  const signInAndRedirect = async (email: string) => {
    try {
      const result = await firebaseSignInWithEmailLink(auth, email, window.location.href);
      if (result.user) {
        // Clean localStorage
        window.localStorage.removeItem('emailForSignIn');
        
        // Redirect user to home page
        router.push('/');
      }
    } catch (error) {
      console.error('Error in signInAndRedirect: ', error);
    }
  };

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // If the email isn't in localStorage, prompt the user for it
        email = window.prompt('Please provide your email for confirmation');
      }
      
      if (email) {
        signInAndRedirect(email);
      }
    }
  }, []);

  if (loading) {
    return <p className="text-sm mt-16">⏱️ Wait while authenticating you...</p>;
  }

  if (error) {
    return <p className="text-sm mt-16">Error: {error.message}</p>;
  }

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center relative top-52 text-center w-full max-w-lg mx-auto h-screen">
      <div className="w-full flex flex-col items-stretch text-center">
        <Image
          className="mx-auto"
          src="/images/react-firebase.svg"
          alt="Firebase React Logo"
          width={96}
          height={96}
        />
        <h1 className="text-2xl font-bold mt-5">Signing In With Magic Link</h1>
        <p className="text-sm mt-16">
          Please, confirm the email you used to request this sign-in link
          so we can confirm your identity.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Enter email used to sign-in..."
              className="mt-8"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="mt-5">
              Confirm Email & Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}