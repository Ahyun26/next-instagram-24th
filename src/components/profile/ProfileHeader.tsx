import Avatar from '@/components/common/Avatar';
import type { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
  postCount: number;
}

export default function ProfileHeader({ user, postCount }: ProfileHeaderProps) {
  return (
    <header className="mx-auto mb-[16px] w-full max-w-[680px] text-[#f5f5f5]">
      <div className="flex items-center">
        <div className="mr-[28px] shrink-0 pt-[31px]">
          <Avatar
            src={user.profileImage}
            alt={`${user.username} 프로필`}
            size={150}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="my-[16px] flex flex-col items-start gap-y-[4px]">
            <h1 className="text-[24px] leading-[30px] font-bold">
              {user.username}
            </h1>

            <p className="text-[14px] leading-[18px] font-normal">
              {user.name}
            </p>

            <ul className="flex items-center gap-x-[16px] text-[14px] leading-[18px]">
              <li>
                게시물 <span className="font-semibold">{postCount}</span>
              </li>
              <li>
                팔로워{' '}
                <span className="font-semibold">{user.followersCount}</span>
              </li>
              <li>
                팔로우{' '}
                <span className="font-semibold">{user.followingCount}</span>
              </li>
            </ul>
          </div>

          {user.bio && (
            <p className="whitespace-pre-wrap text-[14px] leading-[18px]">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-[12px] py-[12px]">
        <div className="flex items-center gap-x-[8px]">
          <button
            type="button"
            className="flex h-[44px] min-w-0 flex-1 items-center justify-center rounded-[12px] bg-[#25292e] px-[20px] text-[14px] leading-[18px] font-semibold text-white"
          >
            프로필 편집
          </button>

          <button
            type="button"
            className="flex h-[44px] min-w-0 flex-1 items-center justify-center rounded-[12px] bg-[#25292e] px-[20px] text-[14px] leading-[18px] font-semibold text-white"
          >
            보관함 보기
          </button>
        </div>
      </div>
    </header>
  );
}
