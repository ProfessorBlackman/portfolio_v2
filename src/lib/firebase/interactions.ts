import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// Generate a unique user ID and store it in localStorage
export const getUserId = (): string => {
  const STORAGE_KEY = 'portfolio_user_id';

  if (typeof window === 'undefined') {
    return 'ssr-user'; // Fallback for SSR
  }

  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(STORAGE_KEY, userId);
  }

  return userId;
};

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Timestamp;
  author: string;
}

export interface InteractionData {
  likes: number;
  dislikes: number;
  userReactions: { [userId: string]: 'like' | 'dislike' };
}

// Get or create interaction document for a content item
export const getInteractions = async (contentId: string): Promise<InteractionData> => {
  const docRef = doc(db, 'interactions', contentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as InteractionData;
  } else {
    const initialData: InteractionData = {
      likes: 0,
      dislikes: 0,
      userReactions: {},
    };
    await setDoc(docRef, initialData);
    return initialData;
  }
};

// Subscribe to real-time interaction updates
export const subscribeToInteractions = (
  contentId: string,
  callback: (data: InteractionData) => void
): (() => void) => {
  const docRef = doc(db, 'interactions', contentId);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as InteractionData);
    } else {
      callback({
        likes: 0,
        dislikes: 0,
        userReactions: {},
      });
    }
  });
};

// Handle like/dislike reactions
export const updateReaction = async (
  contentId: string,
  userId: string,
  reaction: 'like' | 'dislike' | null
): Promise<void> => {
  const docRef = doc(db, 'interactions', contentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      likes: 0,
      dislikes: 0,
      userReactions: {},
    });
  }

  const currentData = docSnap.exists() ? (docSnap.data() as InteractionData) : {
    likes: 0,
    dislikes: 0,
    userReactions: {},
  };

  const previousReaction = currentData.userReactions[userId];

  // Calculate updates
  const updates: {
    likes?: ReturnType<typeof increment>;
    dislikes?: ReturnType<typeof increment>;
    [key: string]: any;
  } = {};

  // Remove previous reaction
  if (previousReaction === 'like') {
    updates.likes = increment(-1);
  } else if (previousReaction === 'dislike') {
    updates.dislikes = increment(-1);
  }

  // Add new reaction
  if (reaction === 'like') {
    updates.likes = increment(updates.likes ? -1 + 1 : 1);
    updates[`userReactions.${userId}`] = 'like';
  } else if (reaction === 'dislike') {
    updates.dislikes = increment(updates.dislikes ? -1 + 1 : 1);
    updates[`userReactions.${userId}`] = 'dislike';
  } else {
    // Remove reaction
    updates[`userReactions.${userId}`] = null;
  }

  await updateDoc(docRef, updates);
};

// Add a comment
export const addComment = async (
  contentId: string,
  userId: string,
  text: string,
  author: string = 'Guest Reader'
): Promise<void> => {
  const commentsRef = collection(db, 'interactions', contentId, 'comments');

  await addDoc(commentsRef, {
    userId,
    text,
    author,
    createdAt: serverTimestamp(),
  });
};

// Get comments for a content item
export const getComments = async (contentId: string, limitCount: number = 50): Promise<Comment[]> => {
  const commentsRef = collection(db, 'interactions', contentId, 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(limitCount));

  const querySnapshot = await getDocs(q);
  const comments: Comment[] = [];

  querySnapshot.forEach((doc) => {
    comments.push({
      id: doc.id,
      ...doc.data(),
    } as Comment);
  });

  return comments;
};

// Subscribe to real-time comment updates
export const subscribeToComments = (
  contentId: string,
  callback: (comments: Comment[]) => void,
  limitCount: number = 50
): (() => void) => {
  const commentsRef = collection(db, 'interactions', contentId, 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(limitCount));

  return onSnapshot(q, (querySnapshot) => {
    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      } as Comment);
    });
    callback(comments);
  });
};

// Helper function to format timestamp
export const formatCommentDate = (timestamp: Timestamp): string => {
  if (!timestamp) return 'Just now';

  const date = timestamp.toDate();
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
