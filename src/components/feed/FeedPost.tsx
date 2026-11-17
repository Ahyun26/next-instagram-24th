import type { Post } from '@/types/post';
import type { User } from '@/types/user';

import FeedPostCaption from './FeedPostCaption';
import FeedPostHeader from './FeedPostHeader';
import FeedPostInteraction from './FeedPostInteraction';

interface FeedPostProps {
  post: Post;
  author: User;
}

/** 홈 피드 게시물 카드 하나: 헤더 / 사진 / 액션 줄 / 본문 */
export default function FeedPost({ post, author }: FeedPostProps) {
  return (
    <article className="pb-4">
      <FeedPostHeader post={post} author={author} />
      <FeedPostInteraction post={post} username={author.username} />
      <FeedPostCaption username={author.username} content={post.content} />
    </article>
  );
}
