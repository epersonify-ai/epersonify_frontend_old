"use client"
import PrivateRoute from '@/components/guards/private-route'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from '@/firebase/config';
import SettingsDialog from '@/components/dialogs/setting-dialog';



const Profile = () => {
  return (
    <PrivateRoute>
      <ProfileUI></ProfileUI>
    </PrivateRoute>
  )
}

export default Profile


const ProfileUI = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="bg-white shadow-none border-none rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-0">
          <Avatar className="mx-auto h-24 w-24">
            <AvatarFallback className="bg-orange-500 text-white text-4xl">
              T
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl font-semibold">
            {user?.displayName || 'tahirwaleed399'}
          </CardTitle>
          <SettingsDialog></SettingsDialog>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around my-6">
            <div className="text-center">
              <p className="font-bold">0</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">0</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold">0</p>
              <p className="text-sm text-gray-500">Chats</p>
            </div>
          </div>
          
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="personas">Personas</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>

              <TabsTrigger value="voices">Voices</TabsTrigger>
            </TabsList>
            <TabsContent value="characters">  <div className="text-center py-8 text-gray-500">
                You haven't made any characters yet
              </div></TabsContent>
            <TabsContent value="liked">  <div className="text-center py-8 text-gray-500">
                You haven't liked any thing yet
              </div></TabsContent>

            

            <TabsContent value="personas">
              <div className="text-center py-8 text-gray-500">
                You haven't made any persnoas yet
              </div>
            </TabsContent>
            <TabsContent value="voices">  <div className="text-center py-8 text-gray-500">
                You voices made any persnoas yet
              </div></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
