'use server';

import { createFeedOrder, FEED_PAGE_SIZE, getFeedItems } from '@/lib/feed';

import FeedPost from './FeedPost';

/**
 * 무한 스크롤 진행 상태
 * - queue: 이번 바퀴에서 아직 보여주지 않은 게시물 id (처음 섞은 순서 그대로)
 * - round: 몇 번째 바퀴인지 (같은 게시물이 반복될 때 key를 구분하는 데 사용)
 * - recentIds: 바로 앞 묶음에서 보여준 게시물 id
 */
export interface FeedCursor {
  queue: string[];
  round: number;
  recentIds: string[];
}

/**
 * 다음 묶음을 서버에서 그려서 돌려준다. (InfiniteFeed에서 호출하는 Server Action)
 * 이번 바퀴를 다 보여줬으면 새로 섞어서 다음 바퀴를 시작한다.
 */
export async function loadMoreFeed(cursor: FeedCursor) {
  // 브라우저에서 넘어온 값이라 형식과 길이를 한 번 정리한다.
  const toIds = (value: unknown, max: number) =>
    Array.isArray(value)
      ? value.filter((id): id is string => typeof id === 'string').slice(0, max)
      : [];
  let queue = toIds(cursor.queue, 100);
  const recentIds = toIds(cursor.recentIds, FEED_PAGE_SIZE);
  let round =
    Number.isSafeInteger(cursor.round) && cursor.round >= 0 ? cursor.round : 0;

  if (queue.length === 0) {
    queue = createFeedOrder(recentIds);
    round += 1;
  }

  const ids = queue.slice(0, FEED_PAGE_SIZE);
  const items = getFeedItems(ids);

  return {
    node: items.map(({ post, author }) => (
      <FeedPost key={`${round}-${post.id}`} post={post} author={author} />
    )),
    cursor: {
      queue: queue.slice(FEED_PAGE_SIZE),
      round,
      recentIds: ids.length > 0 ? ids : recentIds,
    },
    hasMore: items.length > 0,
  };
}
