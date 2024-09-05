"use client"
import SettingsDialog from '@/components/dialogs/setting-dialog';
import PrivateRoute from '@/components/guards/private-route';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from '@/firebase/config';
import { useUser } from '@/firebase/firebase-user-provider';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CardList from './(tabs)/cardList';
import NavigationTab from './(tabs)/navigationTab';
import ProfileHeader from './profileHeader';
import { TabKey } from './types';



const Profile = () => {
  return (
    <PrivateRoute>
      <ProfileUI></ProfileUI>
    </PrivateRoute>
  )
}

export default Profile


const ProfileUI = () => {
  const {user, loading} = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user) return <></>

const [activeTab, setActiveTab] = useState<TabKey>('characters');

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="bg-white shadow-none border-none rounded-lg overflow-hidden">
        <CardHeader className="text-center pb-0">
          <ProfileHeader/>
        </CardHeader>
        <CardContent>
        <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <CardList activeTab={activeTab} />
        </CardContent>
      </Card>
    </div>
  );
};
