import { posts } from '@/data/posts';
import { currentUserId, users } from '@/data/users';

import shuffle from './shuffle';

/** 무한 스크롤에서 한 번에 불러오는 게시물 수 */
export const FEED_PAGE_SIZE = 2;

/** 홈 피드에 나올 수 있는 게시물 id (내 게시물 제외) */
function getFeedPostIds() {
  return posts
    .filter(
      (post) =>
        post.authorId !== currentUserId &&
        users.some((user) => user.id === post.authorId)
    )
    .map((post) => post.id);
}

/**
 * 피드 게시물 순서를 무작위로 정한다.
 * recentIds: 바로 앞에 보여준 게시물들. 새 바퀴의 첫 묶음에 들어가 있으면
 * 뒤쪽의 무작위 위치와 자리를 바꿔서, 방금 본 게시물이 곧바로 다시 나오지 않게 한다.
 */
export function createFeedOrder(recentIds: string[] = []) {
  const order = shuffle(getFeedPostIds());

  for (let i = 0; i < Math.min(FEED_PAGE_SIZE, order.length); i += 1) {
    if (!recentIds.includes(order[i])) continue;

    const candidates = order
      .map((id, index) => index)
      .filter(
        (index) => index >= FEED_PAGE_SIZE && !recentIds.includes(order[index])
      );
    if (candidates.length === 0) break;

    const j = candidates[Math.floor(Math.random() * candidates.length)];
    [order[i], order[j]] = [order[j], order[i]];
  }

  return order;
}

/** id 목록을 게시물 + 작성자로 바꾼다. 없는 id나 내 게시물은 걸러낸다. */
export function getFeedItems(ids: string[]) {
  return ids.flatMap((id) => {
    const post = posts.find(
      (item) => item.id === id && item.authorId !== currentUserId
    );
    const author = post && users.find((user) => user.id === post.authorId);
    return post && author ? [{ post, author }] : [];
  });
}
