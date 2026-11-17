import { Suspense } from 'react';

import Feed from '@/components/feed/Feed';
import FeedSkeleton from '@/components/feed/FeedSkeleton';

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-[468px] py-6">
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </section>
  );
}
