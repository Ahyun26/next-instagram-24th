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
      {visiblePosts.length > 0 ? (
        <PostGrid posts={visiblePosts} username={username} />
      ) : (
        <ProfileEmptyState tab={selectedTab} isOwnProfile={isOwnProfile} />
      )}
    </>
  );
}
