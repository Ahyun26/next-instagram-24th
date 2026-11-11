import { connection } from 'next/server';

import { posts } from '@/data/posts';
import { currentUserId, users } from '@/data/users';

import FeedPost from './FeedPost';

/*
 * 홈 피드 목록. 내 게시물은 빼고 다른 사람 게시물만 보여준다.
 */
export default async function Feed() {
  await connection();

  const feedPosts = posts.flatMap((post) => {
    if (post.authorId === currentUserId) return [];
    const author = users.find((user) => user.id === post.authorId);
    return author ? [{ post, author }] : [];
  });

  return (
    <div className="flex flex-col">
      {feedPosts.map(({ post, author }) => (
        <FeedPost key={post.id} post={post} author={author} />
      ))}
    </div>
  );
}
