import SettingsDialog from '@/components/dialogs/setting-dialog';
import ShareList from '@/components/lists/shareList';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/firebase/firebase-user-provider';
import { MessageCircle, Settings, Share2 } from 'lucide-react';

export default function ProfileHeader() {
  const {user, loading} = useUser();
  return (
    <Card className="mb-6 bg-slate-100">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar  className="mx-auto h-24 w-24 mb-2">
            <AvatarImage src={user.photoURL}></AvatarImage>
            <AvatarFallback>
            <div className="bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-4xl font-bold text-white">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-2">{user?.displayName}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {user?.followers || 0 } Followers • {user?.following || 0 } Following | <MessageCircle className="w-4 h-4 inline" /> {user?.chats || 0} Chats
          </p>
          <div className="flex space-x-2">
            <SettingsDialog />
            <ShareList />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
