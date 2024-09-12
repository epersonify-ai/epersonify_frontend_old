export const profileData = {
  name: 'Franz',
  followers: 0,
  following: 0,
  chats: 0,
  profilePic: '/placeholder.svg?height=100&width=100',
};

export const cardsData = {
  characters: [
    ...Array(10)
      .fill(null)
      .map((_, i) => ({
        image: '/placeholder.png',
        title: `Character ${i}`,
        description: `Description for Character ${i}`,
        chats: `${i}m`,
        likes: `${i * 1000}`,
        by: `@user${i}`,
        status: 'private',
      })),
  ],
  liked: [
    {
      image: '/placeholder.png',
      title: 'Sci-Fi Explorer',
      description: 'Discover new worlds and technologies',
      chats: '12.3m',
      likes: '5,432',
      by: '@spacefan',
      status: 'public',
    },
    {
      image: '/placeholder.png',
      title: 'Detective Noir',
      description: 'Solve mysteries in a gritty urban setting',
      chats: '8.7m',
      likes: '3,210',
      by: '@mysterywriter',
      status: 'public',
    },
  ],
  personas: [],
  voices: [
    {
      image: '/placeholder.png',
      title: 'Morgan Freeman',
      description: 'Iconic voice for narration and storytelling',
      chats: '45.2m',
      likes: '15,789',
      by: '@voicemaster',
      status: 'private',
    },
  ],
};

// Delete This

import { Mic, ThumbsUp, User } from 'lucide-react';

export const tabsData = [
  { id: 'characters', label: 'Characters', icon: <User className="w-4 h-4" /> },
  { id: 'liked', label: 'Liked', icon: <ThumbsUp className="w-4 h-4" /> },
  { id: 'personas', label: 'Personas', icon: <User className="w-4 h-4" /> },
  { id: 'voices', label: 'Voices', icon: <Mic className="w-4 h-4" /> },
];
