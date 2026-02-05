
'use client';

import React, { useState, useEffect } from 'react';
import {
  getUserId,
  subscribeToInteractions,
  subscribeToComments,
  updateReaction,
  addComment,
  formatCommentDate,
  type Comment as FirebaseComment,
} from '@/lib/firebase/interactions';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export const Interactions: React.FC<{ contentId: string }> = ({ contentId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get or generate user ID
    const id = getUserId();
    setUserId(id);

    // Subscribe to real-time interaction updates
    const unsubscribeInteractions = subscribeToInteractions(contentId, (data) => {
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setUserReaction(data.userReactions[id] || null);
    });

    // Subscribe to real-time comment updates
    const unsubscribeComments = subscribeToComments(contentId, (firebaseComments) => {
      const formattedComments: Comment[] = firebaseComments.map((comment: FirebaseComment) => ({
        id: comment.id,
        author: comment.userId === id ? 'You' : comment.author,
        text: comment.text,
        date: formatCommentDate(comment.createdAt),
      }));
      setComments(formattedComments);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeInteractions();
      unsubscribeComments();
    };
  }, [contentId]);

  const handleLike = async () => {
    if (!userId) return;

    const newReaction = userReaction === 'like' ? null : 'like';

    // Optimistic update
    const prevReaction = userReaction;
    const prevLikes = likes;
    const prevDislikes = dislikes;

    if (newReaction === 'like') {
      setUserReaction('like');
      setLikes(prevReaction === 'dislike' ? likes + 1 : likes + 1);
      if (prevReaction === 'dislike') setDislikes(dislikes - 1);
    } else {
      setUserReaction(null);
      setLikes(likes - 1);
    }

    try {
      await updateReaction(contentId, userId, newReaction);
    } catch (error) {
      // Revert on error
      setUserReaction(prevReaction);
      setLikes(prevLikes);
      setDislikes(prevDislikes);
      console.error('Failed to update reaction:', error);
    }
  };

  const handleDislike = async () => {
    if (!userId) return;

    const newReaction = userReaction === 'dislike' ? null : 'dislike';

    // Optimistic update
    const prevReaction = userReaction;
    const prevLikes = likes;
    const prevDislikes = dislikes;

    if (newReaction === 'dislike') {
      setUserReaction('dislike');
      setDislikes(prevReaction === 'like' ? dislikes + 1 : dislikes + 1);
      if (prevReaction === 'like') setLikes(likes - 1);
    } else {
      setUserReaction(null);
      setDislikes(dislikes - 1);
    }

    try {
      await updateReaction(contentId, userId, newReaction);
    } catch (error) {
      // Revert on error
      setUserReaction(prevReaction);
      setLikes(prevLikes);
      setDislikes(prevDislikes);
      console.error('Failed to update reaction:', error);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userId || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addComment(contentId, userId, newComment.trim(), 'Guest Reader');
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 border-t border-woodblock pt-16">
      {/* Reactions */}
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-3 px-6 py-3 border-2 transition-all ${userReaction === 'like' ? 'bg-cinnabar border-cinnabar text-washi' : 'border-woodblock text-washi/40 hover:text-cinnabar'}`}
          >
            <span className="text-xl">▲</span>
            <span className="font-black text-xs tracking-generous">{likes} LIKES</span>
          </button>
          <button 
            onClick={handleDislike}
            className={`flex items-center gap-3 px-6 py-3 border-2 transition-all ${userReaction === 'dislike' ? 'bg-woodblock border-woodblock text-cinnabar' : 'border-woodblock text-washi/40 hover:text-cinnabar'}`}
          >
            <span className="text-xl">▼</span>
            <span className="font-black text-xs tracking-generous">{dislikes} DISLIKES</span>
          </button>
        </div>
        <p className="text-xs uppercase tracking-generous text-washi/20 italic">Share your thoughts below</p>
      </div>

      {/* Comments */}
      <div className="space-y-12">
        <h3 className="text-2xl font-black text-washi tracking-tighter uppercase">Discussion ({comments.length})</h3>
        
        <form onSubmit={submitComment} className="space-y-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="LEAVE A COMMENT..."
            className="w-full bg-woodblock/10 border-2 border-woodblock/40 p-6 text-xl text-washi focus:border-cinnabar outline-none transition-all placeholder:text-washi/10 rounded-sm"
            rows={3}
          />
          <button type="submit" className="px-10 py-4 bg-cinnabar text-washi font-bold uppercase tracking-generous text-xs hover:translate-y-[-2px] transition-all">
            POST COMMENT
          </button>
        </form>

        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-woodblock/5 border-l-2 border-woodblock p-8 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-cinnabar tracking-generous uppercase">{comment.author}</span>
                <span className="text-[10px] text-washi/20 font-mono uppercase">{comment.date}</span>
              </div>
              <p className="text-lg text-washi/70 leading-relaxed italic">&ldquo;{comment.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
