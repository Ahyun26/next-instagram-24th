import type { Post } from '@/types/post';

export const posts: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    imageUrl: '/images/post-1.jpg',
    content: '산책하기 좋은 날 🌿',
    createdAt: '2026-11-09T10:00:00+09:00',
    likesCount: 24,
    comments: [
      {
        id: 'comment-1',
        authorId: 'user-2',
        content: '사진 좋다!',
        createdAt: '2026-11-09T11:00:00+09:00',
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'user-1',
    imageUrl: '/images/post-2.jpg',
    content: '오늘의 커피 ☕',
    createdAt: '2026-11-08T14:00:00+09:00',
    likesCount: 18,
    comments: [],
  },
  {
    id: 'post-3',
    authorId: 'user-2',
    imageUrl: '/images/post-3-lemon.jpg',
    content: '주말 기록',
    createdAt: '2026-11-07T12:00:00+09:00',
    likesCount: 32,
    comments: [],
  },
];
