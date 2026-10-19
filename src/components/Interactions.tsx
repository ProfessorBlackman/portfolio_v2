
'use client';

import React, { useState, useEffect } from 'react';
import {
  getUserId,
  subscribeToInteractions,
  subscribeToComments,
  updateReaction,
  addComment,
  formatCommentDate,
  incrementViews,
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

    // Views used to be counted on listing clicks; count them where the content is read instead.
    incrementViews(contentId).catch((error) => console.error('Failed to record view:', error));

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

  const reactionClass = (selected: boolean) =>
    `inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors ${
      selected ? 'bg-ink text-paper border-ink' : 'border-subtle text-ink/70 hover:border-ink hover:text-ink'
    }`;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <p className="mr-2 text-[15px] text-ink/70">Was this useful?</p>
        <button type="button" onClick={handleLike} aria-pressed={userReaction === 'like'} className={reactionClass(userReaction === 'like')}>
          <span aria-hidden="true">▲</span> Useful <span className="opacity-70">{likes}</span>
        </button>
        <button type="button" onClick={handleDislike} aria-pressed={userReaction === 'dislike'} className={reactionClass(userReaction === 'dislike')}>
          <span aria-hidden="true">▼</span> Not really <span className="opacity-70">{dislikes}</span>
        </button>
      </div>

      <div className="space-y-6">
        <form onSubmit={submitComment} className="space-y-3">
          <label htmlFor={`comment-${contentId}`} className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Leave a comment ({comments.length} so far)
          </label>
          <textarea
            id={`comment-${contentId}`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Questions, corrections, or a different take…"
            className="w-full bg-surface border border-subtle p-4 text-[15px] leading-relaxed text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors"
            rows={3}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-5 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-ink/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Posting…' : 'Post comment'}
          </button>
        </form>

        {comments.length > 0 && (
          <ul className="divide-y divide-subtle border-t border-subtle">
            {comments.map((comment) => (
              <li key={comment.id} className="py-5">
                <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span className="text-ink/70">{comment.author}</span>
                  <span>{comment.date}</span>
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85 whitespace-pre-line">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
