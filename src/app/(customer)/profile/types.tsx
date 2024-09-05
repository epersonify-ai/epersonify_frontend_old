export interface ProfileData {
  name: string;
  followers: number;
  following: number;
  chats: number;
  profilePic: string;
}

/*
enum CardStatus {
  Private = 'private',
  Unlisted = 'unlisted',
  Public = 'public',
}
*/

export interface CardType {
  image: string;
  title: string;
  description: string;
  chats: string;
  likes: string;
  by: string;
}

export interface CardsType {
  characters: CardType[];
  liked: CardType[];
  personas: CardType[];
  voices: CardType[];
}

export type TabKey = 'characters' | 'liked' | 'personas' | 'voices';
