import { useEffect, useState } from 'react';
import CardItem from './cardItem';
import { cardsData } from './data';
import SortComponent from './sortComponent';
import { CardType } from './types';

type CardListProps = {
  activeTab: keyof typeof cardsData;
};

export default function CardList({ activeTab }: CardListProps) {
  const [sortedCards, setSortedCards] = useState<CardType[]>(cardsData[activeTab]);

  useEffect(() => {
    setSortedCards(cardsData[activeTab]);
  }, [activeTab]);

  return (
    <div className="space-y-4">
      {['characters', 'liked'].includes(activeTab) && (
        <SortComponent cards={cardsData[activeTab]} onSortedCardsChange={setSortedCards} />
      )}
      {sortedCards.map((card: CardType, index: number) => (
        <CardItem key={index} card={card} />
      ))}
    </div>
  );
}
