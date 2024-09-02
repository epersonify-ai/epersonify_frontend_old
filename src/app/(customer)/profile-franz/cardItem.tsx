import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ellipsis, LockKeyhole, MessageCircle, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { CardType } from './types';

type CardItemType = {
  card: CardType;
};

export default function CardItem({ card }: CardItemType) {
  return (
    <Card className="flex items-start space-x-4 bg-transparent border-transparent shadow-transparent">
      <Image src={card.image} alt={card.title} width={80} height={80} className="rounded-md" />
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <LockKeyhole cx="12" cy="12" r="1" />
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <Ellipsis cx="12" cy="12" r="1" />
          </svg>
        </Button>
      </div>
    </Card>
  );
}
