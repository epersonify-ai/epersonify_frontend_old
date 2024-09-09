'use client';

import { auth, firestore } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { DocumentData, Query, QueryConstraint, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CardItem from './cardItem';
import SortComponent from './sortComponent';

// CardType Interface
export interface CardType {
  id: string;
  image: string;
  title: string;
  description: string;
  chats: string;
  likes: string;
  by: string;
  status: string;
  userId: string;
}

type CardListProps = {
  activeTab: 'characters' | 'liked' | 'personas' | 'voices';
};

export default function CardList({ activeTab }: CardListProps) {
  const [sortedCards, setSortedCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCards(user.uid); // Fetch cards for the logged-in user
      } else {
        setSortedCards([]); // Clear cards if the user is logged out
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [activeTab]); // Re-run the effect when activeTab changes

  const fetchCards = async (userId: string) => {
    setLoading(true);
    try {
      let q: Query<DocumentData> | undefined;

      // Define the collection and query based on the activeTab
      if (activeTab === 'characters') {
        q = query(collection(firestore, 'personalities'), where('userId', '==', userId));
      } else if (activeTab === 'liked') {
        q = query(collection(firestore, 'likes'), where('userId', '==', userId));  // Needs better logic
      } else if (activeTab === 'personas') {
        q = query(collection(firestore, 'personas'), where('userId', '==', userId));
      } else if (activeTab === 'voices') {
        q = query(collection(firestore, 'voices'), where('userId', '==', userId));
      }

      if (q) {
        const querySnapshot = await getDocs(q);
        const cards: CardType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            // rename properties
            id: doc.id,
            image: data.image || '/placeholder.png',
            title: data.name || 'Untitled',
            description: data.description || 'No description available',
            chats: data.chats || '0',
            likes: data.likes || '0',
            by: data.by || 'Anonymous',
            status: data.status || 'inactive',
            userId: data.userId || userId,
          };
        });
        setSortedCards(cards); // Update the state with fetched cards
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const emptyMessages = {
    characters: "You haven't created any characters yet.",
    liked: "You haven't liked any characters yet.",
    personas: "You haven't created any personas yet.",
    voices: "You haven't created any voices yet.",
  };

  return (
    <div className="space-y-4">
      {['characters', 'liked'].includes(activeTab) && <SortComponent cards={sortedCards} onSortedCardsChange={setSortedCards} />}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : sortedCards.length > 0 ? (
        sortedCards.map((card: CardType) => <CardItem key={card.id} card={card} />)
      ) : (
        <div className="text-center py-8 text-gray-500">{emptyMessages[activeTab]}</div>
      )}
    </div>
  );
}
