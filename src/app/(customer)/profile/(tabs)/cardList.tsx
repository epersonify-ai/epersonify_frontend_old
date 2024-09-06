'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/firebase/config';
import { CardType } from '../types';
import CardItem from './cardItem';
import SortComponent from './sortComponent';

type CardListProps = {
  activeTab: 'characters' | 'liked' | 'personas' | 'voices';
};

export default function CardList({ activeTab }: CardListProps) {
  const [sortedCards, setSortedCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCards(user.uid);
      } else {
        setSortedCards([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [activeTab]);

  const fetchCards = async (userId: string) => {
    setLoading(true);
    try {
      let q;
      if (activeTab === 'characters') {
        q = query(collection(firestore, 'personalities'), where('userId', '==', userId));
      } else if (activeTab === 'liked') {
        q = query(collection(firestore, 'likes'), where('userId', '==', userId));
      } else {
        // For 'personas' and 'voices', you might need to implement similar queries
        q = query(collection(firestore, activeTab), where('userId', '==', userId));
      }

      const querySnapshot = await getDocs(q);
      const cards: CardType[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<CardType, 'id'>;
        return {
          id: doc.id,
          ...data
        };
      });
      setSortedCards(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const emptyMessages = {
    characters: "You haven't created any characters yet.",
    liked: "You haven't liked any characters yet.",
    personas: "You haven't made any personas yet.",
    voices: "You haven't created any voices yet.",
  };

  return (
    <div className="space-y-4">
      {['characters', 'liked'].includes(activeTab) && (
        <SortComponent cards={sortedCards} onSortedCardsChange={setSortedCards} />
      )}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : sortedCards.length > 0 ? (
        sortedCards.map((card: CardType) => (
          <CardItem key={card.id} card={card} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">{emptyMessages[activeTab]}</div>
      )}
    </div>
  );
}