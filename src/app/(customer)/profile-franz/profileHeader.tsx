import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Settings, Share2 } from 'lucide-react';
import { profileData } from './data';
import ShareList from './shareList';

export default function ProfileHeader() {
  return (
    <Card className="mb-6 bg-slate-200">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-4xl font-bold text-white">{profileData.name[0]}</div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {profileData.followers} Followers • {profileData.following} Following | <MessageCircle className="w-4 h-4 inline" /> {profileData.chats} Chats
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" className="rounded-full">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <ShareList />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
