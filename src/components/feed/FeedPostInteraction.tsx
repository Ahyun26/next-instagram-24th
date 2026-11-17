'use client';

import { useCallback, useState } from 'react';

import PostLikeEffect from '@/components/post/PostLikeEffect';
import type { Post } from '@/types/post';

import FeedPostActions from './FeedPostActions';
import FeedPostImage from './FeedPostImage';

interface FeedPostInteractionProps {
  post: Post;
  username: string;
}

export default function FeedPostInteraction({
  post,
  username,
}: FeedPostInteractionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeEffectKey, setLikeEffectKey] = useState(0);
  const clearLikeEffect = useCallback(() => setLikeEffectKey(0), []);

  return (
    <>
      <FeedPostImage
        src={post.imageUrl}
        alt={`${username}님의 게시물 사진`}
        onDoubleClick={() => {
          setIsLiked((liked) => !liked);
          if (isLiked) clearLikeEffect();
          else setLikeEffectKey((key) => key + 1);
        }}
      >
        {likeEffectKey > 0 && (
          <PostLikeEffect key={likeEffectKey} onComplete={clearLikeEffect} />
        )}
      </FeedPostImage>
      <FeedPostActions
        likesCount={post.likesCount + (isLiked ? 1 : 0)}
        commentsCount={post.comments.length}
        isLiked={isLiked}
        onToggleLike={() => {
          setIsLiked((liked) => !liked);
          clearLikeEffect();
        }}
      />
    </>
  );
}
