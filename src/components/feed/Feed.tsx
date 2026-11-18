import { connection } from 'next/server';

import { createFeedOrder, FEED_PAGE_SIZE, getFeedItems } from '@/lib/feed';

import FeedPost from './FeedPost';
import InfiniteFeed from './InfiniteFeed';

/*
 * 홈 피드. 내 게시물은 빼고 다른 사람 게시물을 무작위 순서로 보여준다.
 * 접속할 때 한 번 섞은 순서대로 첫 묶음만 서버에서 그리고,
 * 나머지는 InfiniteFeed가 스크롤에 맞춰 같은 순서로 이어서 불러온다.
 * (connection()으로 요청마다 새로 섞고, page.tsx에서 Suspense로 감싼다)
 */
export default async function Feed() {
  await connection();

  const order = createFeedOrder();
  if (order.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ig-secondary-text">
        아직 게시물이 없어요.
      </p>
    );
  }

  const firstIds = order.slice(0, FEED_PAGE_SIZE);

  return (
    <InfiniteFeed
      initialCursor={{
        queue: order.slice(FEED_PAGE_SIZE),
        round: 0,
        recentIds: firstIds,
      }}
    >
      {getFeedItems(firstIds).map(({ post, author }) => (
        <FeedPost key={`0-${post.id}`} post={post} author={author} />
      ))}
    </InfiniteFeed>
  );
}
