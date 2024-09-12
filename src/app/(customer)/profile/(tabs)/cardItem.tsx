import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Ellipsis, LockKeyhole, MessageCircle, Pencil, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CardType } from '../types';

type CardItemType = {
  card: CardType;
};

const CardItem = React.memo(function CardItem({ card }: { card: CardType }) {
  return (
    <Card className="flex items-start space-x-4 bg-transparent border-transparent shadow-transparent">
      <Image src={card.image || '/placeholder.svg?height=80&width=80'} alt={card.title} width={80} height={80} className="rounded-md" />
      <div className="flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">{card.description}</p>
          <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
            <MessageCircle className="w-3 h-3" />
            <span>{card.chats} chats</span>
            <ThumbsUp className="w-3 h-3 ml-2" />
            <span>{card.likes} likes</span>
            <span className="ml-2">By {card.by}</span>
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col">
        <Button variant="ghost" size="icon" className="shrink-0">
          <LockKeyhole className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Ellipsis className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/character/${card.id}/edit`} className="flex items-center">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            {/* Add more dropdown items here if needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
});

export default CardItem;
