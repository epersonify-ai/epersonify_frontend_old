"use client"
import React, { useState } from 'react';
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

const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters long" }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters" }),
});

const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState('/placeholder.jpg');
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      displayName: '',
      bio: '',
    },
  });

  const onSubmit = (data:any) => {
    console.log(data);
    setOpen(false);
  };

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('avatar', file);
      console.log('FormData:', formData);
    }
  };

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
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <div className="grid gap-4">
                      <Button onClick={() => console.log('Generate Image')}>Generate Image</Button>
                      <label className="cursor-pointer">
                        <Input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        <Button >Upload Image</Button>
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
          <TabsContent value="settings">
            <p>Settings content here</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;