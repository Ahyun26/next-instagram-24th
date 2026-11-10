'use client';

import { useState } from 'react';

import PostGrid from '@/components/profile/PostGrid';
import ProfileEmptyState from '@/components/profile/ProfileEmptyState';
import ProfileTabs, { type ProfileTab } from '@/components/profile/ProfileTabs';
import type { Post } from '@/types/post';

interface ProfileContentProps {
  posts: Post[];
  username: string;
  isOwnProfile: boolean;
}

export default function ProfileContent({
  posts,
  username,
  isOwnProfile,
}: ProfileContentProps) {
  const [selectedTab, setSelectedTab] = useState<ProfileTab>('posts');
  const visiblePosts = selectedTab === 'posts' ? posts : [];

  return (
    <>
      <ProfileTabs
        isOwnProfile={isOwnProfile}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      {isOwnProfile && selectedTab === 'saved' && (
        <div className="flex items-center justify-between gap-[16px] py-[24px]">
          <p className="text-[12px] leading-[16px] text-[#8e8e8e]">
            저장한 내용은 회원님만 볼 수 있습니다
          </p>
          <button
            type="button"
            className="shrink-0 cursor-pointer text-[14px] leading-[18px] font-semibold text-[#85a1ff]"
          >
            + 새 컬렉션
          </button>
        </div>
      )}
      {visiblePosts.length > 0 ? (
        <PostGrid posts={visiblePosts} username={username} />
      ) : (
        <ProfileEmptyState tab={selectedTab} isOwnProfile={isOwnProfile} />
      )}
    </>
  );
}
