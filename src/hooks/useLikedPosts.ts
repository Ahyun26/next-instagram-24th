'use client';

import { useMemo, useSyncExternalStore } from 'react';

const changeEvent = 'instagram:liked-posts-change';
const fallbackStorage = new Map<string, string>();

function readSnapshot(key: string) {
  try {
    return fallbackStorage.get(key) ?? window.localStorage.getItem(key) ?? '[]';
  } catch {
    return fallbackStorage.get(key) ?? '[]';
  }
}

function parseIds(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === 'string'))]
      : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}

/** 저장 기능과 동일하게 사용자별 좋아요 ID를 저장하고 화면 간 동기화한다. */
export default function useLikedPosts(userId: string) {
  const key = `instagram:liked-posts:${userId}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => readSnapshot(key),
    () => null
  );
  const likedPostIds = useMemo(() => parseIds(raw), [raw]);

  const toggleLikedPost = (postId: string) => {
    const previous = parseIds(readSnapshot(key));
    const nextLiked = !previous.includes(postId);
    const next = nextLiked
      ? [...previous, postId]
      : previous.filter((id) => id !== postId);
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(key, serialized);
      fallbackStorage.delete(key);
    } catch {
      fallbackStorage.set(key, serialized);
    }
    window.dispatchEvent(new Event(changeEvent));
    return nextLiked;
  };

  return { likedPostIds, toggleLikedPost };
}
