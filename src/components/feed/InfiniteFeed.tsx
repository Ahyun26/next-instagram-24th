'use client';

import {
  Fragment,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type FeedCursor, loadMoreFeed } from './actions';
import FeedSkeleton from './FeedSkeleton';

/** 새 바퀴를 불러올 때 Skeleton을 보여주는 최소 시간 */
const NEW_ROUND_MIN_LOADING_MS = 800;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface InfiniteFeedProps {
  /** 서버에서 미리 그린 첫 묶음 */
  children: ReactNode;
  initialCursor: FeedCursor;
}

/**
 * 홈 피드 무한 스크롤.
 * 목록 맨 아래의 센티널(빈 div)이 화면에 보이면 다음 묶음을 불러와 뒤에 붙인다.
 */
export default function InfiniteFeed({
  children,
  initialCursor,
}: InfiniteFeedProps) {
  const [pages, setPages] = useState<ReactNode[]>([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>(
    'idle'
  );
  const sentinelRef = useRef<HTMLDivElement>(null);
  // 상태 업데이트는 비동기라, 같은 순간에 두 번 요청하지 않도록 ref로도 막는다.
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setStatus('loading');

    try {
      // 이번 바퀴를 다 보여줬으면 서버가 새로 섞어서 다음 바퀴를 시작한다.
      // 새 묶음을 불러오는 느낌이 나도록, 이때만 Skeleton을 최소 0.5초 보여준다.
      // (응답이 0.5초보다 느리면 응답을 기다리므로 더 늦어지지는 않는다)
      const isNewRound = cursor.queue.length === 0;
      const [result] = await Promise.all([
        loadMoreFeed(cursor),
        isNewRound ? wait(NEW_ROUND_MIN_LOADING_MS) : null,
      ]);
      setPages((previous) => [...previous, result.node]);
      setCursor(result.cursor);
      setStatus(result.hasMore ? 'idle' : 'done');
    } catch {
      setStatus('error');
    } finally {
      isLoadingRef.current = false;
    }
  }, [cursor]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    // 불러오는 중이거나 실패했거나 더 없으면 감시하지 않는다.
    if (!sentinel || status !== 'idle') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      // 센티널이 화면에 들어오는 순간(바닥에 닿았을 때) 불러온다.
      { rootMargin: '0px' }
    );
    observer.observe(sentinel);

    // 다시 실행되거나 화면에서 사라질 때 감시를 멈춘다.
    // 새로 붙인 뒤에도 센티널이 계속 보이면, 새 observer가 바로 다시 알려준다.
    return () => observer.disconnect();
  }, [loadMore, status]);

  return (
    <div className="flex flex-col">
      {children}
      {pages.map((page, index) => (
        <Fragment key={index}>{page}</Fragment>
      ))}

      {status === 'loading' && <FeedSkeleton />}
      {status === 'error' && (
        <button
          type="button"
          onClick={() => void loadMore()}
          className="mx-auto my-4 cursor-pointer text-sm font-semibold text-ig-secondary-text"
        >
          게시물을 불러오지 못했어요. 다시 시도
        </button>
      )}

      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
    </div>
  );
}
