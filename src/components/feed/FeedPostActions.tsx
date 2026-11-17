import type { ReactNode } from 'react';

import {
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  MessageIcon,
  RepostIcon,
} from '@/components/icons';
import formatCount from '@/lib/formatCount';

interface FeedPostActionsProps {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  onToggleLike: () => void;
}

function ActionButton({
  label,
  children,
  onClick,
  pressed,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="cursor-pointer p-2"
    >
      {children}
    </button>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="mr-1.5 text-sm font-semibold">{formatCount(value)}</span>
  );
}

/** 홈 피드 게시물 사진 아래 액션 줄: 좋아요, 댓글, 리포스트, 공유 / 저장 */
export default function FeedPostActions({
  likesCount,
  commentsCount,
  isLiked,
  onToggleLike,
}: FeedPostActionsProps) {
  return (
    <section className="flex items-center px-1 pt-1">
      <div className="flex flex-1 items-center">
        <ActionButton
          label={isLiked ? '좋아요 취소' : '좋아요'}
          pressed={isLiked}
          onClick={onToggleLike}
        >
          {isLiked ? (
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="#ff3040"
            >
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
            </svg>
          ) : (
            <HeartIcon />
          )}
        </ActionButton>
        {likesCount > 0 && <Count value={likesCount} />}

        <ActionButton label="댓글 달기">
          <CommentIcon />
        </ActionButton>
        {commentsCount > 0 && <Count value={commentsCount} />}

        <ActionButton label="리포스트">
          <RepostIcon />
        </ActionButton>
        <ActionButton label="공유하기">
          <MessageIcon />
        </ActionButton>
      </div>

      <ActionButton label="저장">
        <BookmarkIcon />
      </ActionButton>
    </section>
  );
}
