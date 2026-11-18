import FeedPostSkeleton from './FeedPostSkeleton';

interface FeedSkeletonProps {
  count?: number;
}

/** 첫 진입 fallback과 다음 페이지 로딩에 공통으로 사용한다. */
export default function FeedSkeleton({ count = 1 }: FeedSkeletonProps) {
  return (
    <div role="status" className="flex w-full flex-col">
      <span className="sr-only">게시물을 불러오는 중입니다.</span>
      {Array.from({ length: count }, (_, index) => (
        <FeedPostSkeleton key={index} />
      ))}
    </div>
  );
}
