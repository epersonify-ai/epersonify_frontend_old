import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Instagram, Link, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';

const handleShareLink = () => {
  navigator.clipboard.writeText(window.location.href);
  // Toast notification here
};

export default function shareList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Share2 className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => window.open('https://www.instagram.com/create/story', '_blank')}>
          <Instagram className="w-4 h-4 mr-2" />
          Share on Instagram
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => window.open('https://twitter.com/intent/tweet', '_blank')}>
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleShareLink}>
          <Link className="w-4 h-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
