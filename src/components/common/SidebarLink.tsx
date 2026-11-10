'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  href?: string;
  active?: boolean;
};

const itemClassName =
  'my-1 flex size-12 items-center justify-center rounded-lg p-3 transition-colors hover:bg-white/10';

/** 사이드바 메뉴 한 칸의 모양. href가 있으면 링크, 없으면 버튼으로 그린다. */
export function SidebarItem({
  label,
  icon,
  activeIcon,
  href,
  active = false,
}: SidebarItemProps) {
  const content = active && activeIcon ? activeIcon : icon;

  if (!href) {
    return (
      <button type="button" aria-label={label} className={itemClassName}>
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={itemClassName}
    >
      {content}
    </Link>
  );
}

/** 현재 URL을 읽어서 활성 상태를 정하는 메뉴. 페이지 이동이 있는 메뉴에만 쓴다. */
export default function SidebarLink(
  props: Omit<SidebarItemProps, 'active'> & { href: string }
) {
  const pathname = usePathname();
  const active =
    props.href === '/'
      ? pathname === '/'
      : pathname === props.href || pathname.startsWith(`${props.href}/`);

  return <SidebarItem {...props} active={active} />;
}
