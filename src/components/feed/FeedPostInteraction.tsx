'use client';

import { useCallback, useState } from 'react';

import PostLikeEffect from '@/components/post/PostLikeEffect';
import { currentUserId } from '@/data/users';
import useLikedPosts from '@/hooks/useLikedPosts';
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
  const { likedPostIds, toggleLikedPost } = useLikedPosts(currentUserId);
  const isLiked = likedPostIds.includes(post.id);
  const [likeEffectKey, setLikeEffectKey] = useState(0);
  const clearLikeEffect = useCallback(() => setLikeEffectKey(0), []);

  return (
    <>
      <FeedPostImage
        src={post.imageUrl}
        alt={`${username}님의 게시물 사진`}
        onDoubleClick={() => {
          const nextLiked = toggleLikedPost(post.id);
          if (nextLiked) setLikeEffectKey((key) => key + 1);
          else clearLikeEffect();
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
          toggleLikedPost(post.id);
          clearLikeEffect();
        }}
      />
    </>
  );
}
