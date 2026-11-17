import {
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  MessageIcon,
  OptionsIcon,
  RepostIcon,
} from '@/components/icons';

/** 기존 피드 카드의 여백과 이미지 비율을 유지하는 로딩 화면. */
export default function FeedPostSkeleton() {
  return (
    <div aria-hidden="true" className="pb-4 motion-safe:animate-pulse">
      <div className="flex items-center gap-3 px-3 pb-3">
        <div className="size-8 shrink-0 rounded-full bg-ig-secondary-button-background" />
        <div className="min-w-0 flex-1">
          <div className="w-2/3 rounded-sm bg-ig-secondary-button-background text-sm leading-[18px]">
            &nbsp;
          </div>
          <div className="w-1/3 rounded-sm bg-ig-secondary-button-background text-xs leading-4">
            &nbsp;
          </div>
        </div>
        <div className="flex h-8 shrink-0 items-center rounded-lg bg-ig-secondary-button-background px-4 text-sm font-semibold text-transparent">
          팔로우
        </div>
        <OptionsIcon className="shrink-0 text-ig-secondary-button-background" />
      </div>

      <div className="aspect-[4/5] w-full rounded-sm bg-ig-secondary-button-background" />

      <div className="flex items-center px-1 pt-1 text-ig-secondary-button-background">
        <div className="flex flex-1 items-center">
          <span className="p-2">
            <HeartIcon />
          </span>
          <span className="p-2">
            <CommentIcon />
          </span>
          <span className="p-2">
            <RepostIcon />
          </span>
          <span className="p-2">
            <MessageIcon />
          </span>
        </div>
        <span className="p-2">
          <BookmarkIcon />
        </span>
      </div>

      <div className="px-3">
        <div className="w-2/3 rounded-sm bg-ig-secondary-button-background text-sm leading-[18px]">
          &nbsp;
        </div>
      </div>
    </div>
  );
}
