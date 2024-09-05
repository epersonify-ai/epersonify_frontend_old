import { useEffect, useState } from 'react';
import { cardsData } from '../data';
import { CardType } from '../types';
import CardItem from './cardItem';
import SortComponent from './sortComponent';

type CardListProps = {
  activeTab: keyof typeof cardsData;
};

export default function CardList({ activeTab }: CardListProps) {
  const [sortedCards, setSortedCards] = useState<CardType[]>(cardsData[activeTab]);

  useEffect(() => {
    setSortedCards(cardsData[activeTab]);
  }, [activeTab]);

  const emptyMessages = {
    characters: "You haven't created any characters yet.",
    liked: "You haven't liked any characters yet.",
    personas: "You haven't made any personas yet.",
    voices: "You haven't created any voices yet.",
  };

  return (
    <div className="space-y-4">
      {['characters', 'liked'].includes(activeTab) && (
        <SortComponent cards={cardsData[activeTab]} onSortedCardsChange={setSortedCards} />
      )}
      {sortedCards.length > 0 ? (
        sortedCards.map((card: CardType, index: number) => (
          <CardItem key={index} card={card} />
        ))
      ) : (
        <div  className="text-center py-8 text-gray-500">{emptyMessages[activeTab]}</div>
      )}
    </div>
  );
}