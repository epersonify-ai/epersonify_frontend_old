import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}