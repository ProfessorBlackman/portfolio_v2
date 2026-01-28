
import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

export const Interactions: React.FC<{ contentId: string }> = ({ contentId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'S. Tanaka', text: 'Exceptional reasoning on the architectural trade-offs.', date: '2 days ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') setDislikes(dislikes - 1);
      setLikes(likes + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') setLikes(likes - 1);
      setDislikes(dislikes + 1);
      setUserReaction('dislike');
    }
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      author: 'Guest Reader',
      text: newComment,
      date: 'Just now'
    };
    setComments([comment, ...comments]);
    setNewComment('');
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
              <p className="text-lg text-washi/70 leading-relaxed italic">"{comment.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
