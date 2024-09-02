import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Settings } from 'lucide-react';
import { useState } from 'react';

interface ProfileDialogProps {
  profileData: {
    name: string;
    username: string;
    bio: string;
  };
  onProfileUpdate: (updatedData: { name: string; username: string; bio: string }) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ profileData, onProfileUpdate }) => {
  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onProfileUpdate({
      name: (formData.get('name') as string) || profileData.name,
      username: (formData.get('username') as string) || profileData.username,
      bio: (formData.get('bio') as string) || profileData.bio,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full text-xs px-3 py-1">
          <Settings className="w-3 h-3 mr-1" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                {profileData.name[0]}
              </div>
              <Button type="button" variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" name="name" defaultValue={profileData.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" defaultValue={profileData.username} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" defaultValue={profileData.bio} />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
