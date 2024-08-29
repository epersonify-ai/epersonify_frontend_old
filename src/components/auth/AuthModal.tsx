"use client"
import React, { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useAuthState, useSendSignInLinkToEmail, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { authModalState, AuthModalView } from '@/store/authModalAtom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const ModernSignInModal = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendSignInLinkToEmail, sending, fbError] = useSendSignInLinkToEmail(auth);
  const setAuthModalState = useSetAtom(authModalState);
  const [modalState, setModalState] = useAtom(authModalState);
  const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth);

  const actionCodeSettings = {
    url: process.env.NEXT_PUBLIC_FIREBASE_MAGIC_LINK_CONTINUE_URL as string,
    handleCodeInApp: true,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setAuthModalState((prev) => ({ ...prev, open: false }));
  };
if(user) return <></>


  return (
    <Dialog open={modalState.open}  onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">Welcome Back</DialogTitle>
         
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-6 p-6">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <CheckCircle2 size={48} className="mx-auto text-green-500" />
              <p className="text-lg text-gray-800">Check your email 💌</p>
              <p className="text-sm text-gray-600">Weve sent a magic link to your inbox.</p>
              <Button variant="outline" className="w-full"  onClick={handleClose}>
                Got it
              </Button>
            </div>
          ) : (
            <>
              <div className="w-full space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500"
                  />
                  {fbError && (
                    <div className="flex items-center text-red-500 text-sm">
                      <AlertCircle size={16} className="mr-2" />
                      <span>{fbError.message}</span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full"
                  >
                    {sending ? 'Sending...' : 'Continue with Email'}
                  </Button>
                </form>
              </div>

              <div className="w-full flex items-center justify-between">
                <hr className="w-full border-gray-300" />
                <span className="px-2 text-gray-500">OR</span>
                <hr className="w-full border-gray-300" />
              </div>

              <Button
               onClick={() => signInWithGoogle()}
                className="w-full bg-white text-gray-800 font-semibold py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Continue with Google
              </Button>
            </>
          )}
        </div>

        <DialogFooter className="text-sm text-center text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModernSignInModal;