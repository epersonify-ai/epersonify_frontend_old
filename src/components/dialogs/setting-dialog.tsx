"use client"
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/firebase/firebase-user-provider';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '@/firebase/config';
import { checkUsernameAvailability } from '@/firebase/services/profile-service';

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters long" }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }),
});

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState('/placeholder.jpg');
  const [avatarFile, setAvatarFile] = useState(null);
  const { user, loading } = useUser();
  const { toast } = useToast();
  
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      displayName: '',
      bio: '',
    },
  });

  const watchUsername = watch("username");

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        displayName: user.displayName || '',
        bio: user.bio || '',
      });
      setAvatar(user.photoURL || '/placeholder.jpg');
    }
  }, [user, reset]);

  const uploadImage = async (file:any) => {
    if (!file) return null;
    const storageRef = ref(storage, `profiles/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const onSubmit = async (data:any) => {
    if (!user) return;

    try {
      let updateData :Partial<User>= {};
      let photoURL = avatar;

      // Check if username has changed
      if (data.username !== user.username) {
        const isUsernameAvailable = await checkUsernameAvailability(data.username);
        if (!isUsernameAvailable) {
          toast({
            title: "Username not available",
            description: "Please choose a different username.",
            variant: "destructive",
          });
          return;
        }
        updateData.username = data.username;
      }

      // Upload new avatar if changed
      if (avatarFile) {
        photoURL = await uploadImage(avatarFile);
        updateData.photoURL = photoURL;
      }
 
      // Add other fields to update data
      updateData = {
        ...updateData,
        displayName: data.displayName,
        bio: data.bio,
      };

      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, updateData);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="public">Public Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="public">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-24 h-24 mx-auto cursor-pointer">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
    <div className="grid gap-4">
      <label  htmlFor="profile"  className="cursor-pointer">
        Upload Image
        <input
          id="profile"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </label>
    </div>
  </PopoverContent>
                </Popover>
                
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Username" />
                  )}
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                
                <Controller
                  name="displayName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Display Name" />
                  )}
                />
                {errors.displayName && <p className="text-red-500">{errors.displayName.message}</p>}
                
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} placeholder="Bio" />
                  )}
                />
                {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Your Current Plan</h3>
                <p className="bg-blue-100 text-blue-800 p-4 rounded">
                  Upgrade Now
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;