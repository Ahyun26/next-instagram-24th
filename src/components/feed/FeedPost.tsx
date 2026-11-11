import type { Post } from '@/types/post';
import type { User } from '@/types/user';

import FeedPostHeader from './FeedPostHeader';

interface FeedPostProps {
  post: Post;
  author: User;
}

/** 홈 피드 게시물 카드 하나. (사진, 액션, 본문은 다음 작업에서 추가) */
export default function FeedPost({ post, author }: FeedPostProps) {
  return (
    <article className="pb-4">
      <FeedPostHeader post={post} author={author} />
    </article>
  );
}
