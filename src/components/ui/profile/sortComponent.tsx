import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownAZ, ArrowDownNarrowWide, ArrowUpAZ, ArrowUpNarrowWide, MessageCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CardType } from './types';

type SortProps = {
  cards: CardType[];
  onSortedCardsChange: (sortedCards: CardType[]) => void;
};

export default function SortComponent({ cards, onSortedCardsChange }: SortProps) {
  const [sortAttribute, setSortAttribute] = useState('title');
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    const sortedCards = sortCards(cards, sortAttribute, sortDirection);
    onSortedCardsChange(sortedCards);
  }, [cards, sortAttribute, sortDirection, onSortedCardsChange]);

  const sortCards = (cards: CardType[], attribute: string, direction: string) => {
    return [...cards].sort((a, b) => {
      let keyA = a[attribute as keyof CardType];
      let keyB = b[attribute as keyof CardType];
      if (typeof keyA === 'number' && typeof keyB === 'number') {
        return direction === 'ASC' ? keyA - keyB : keyB - keyA;
      } else {
        return direction === 'ASC'
          ? String(keyA).localeCompare(String(keyB))
          : String(keyB).localeCompare(String(keyA));
      }
    });
  };

  const handleSortChange = (attribute: string, direction: string) => {
    setSortAttribute(attribute);
    setSortDirection(direction);
  };

  return (
    <div className="flex justify-start items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent" variant="ghost" size="sm">
            Sort by
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem onSelect={() => handleSortChange('title', 'ASC')}>
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            <span>Name (A-Z)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('title', 'DESC')}>
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            <span>Name (Z-A)</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('likes', 'DESC')}>
            <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
            <span>Most Likes</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('likes', 'ASC')}>
            <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
            <span>Least Likes</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('chats', 'DESC')}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Most Chats</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('chats', 'ASC')}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Least Chats</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
