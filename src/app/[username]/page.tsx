import { notFound } from 'next/navigation';

import ProfileHeader from '@/components/profile/ProfileHeader';
import { posts } from '@/data/posts';
import { users } from '@/data/users';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = users.find((user) => user.username === username);

  if (!user) {
    notFound();
  }

  const userPosts = posts.filter((post) => post.authorId === user.id);

  return (
    <div className="pt-[30px]">
      <ProfileHeader user={user} postCount={userPosts.length} />
    </div>
  );
}
