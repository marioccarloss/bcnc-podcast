'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode, MouseEvent } from 'react';
import { useNavigation } from '@/infrastructure/ui/context';
import { useResetSearch } from '@/infrastructure/ui/hooks';
import { usePathname } from 'next/navigation';

interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function AppLink({ children, onClick, href, ...props }: AppLinkProps) {
  const { startNavigation } = useNavigation();
  const resetSearch = useResetSearch();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    const targetPath = typeof href === 'string' ? href : href.pathname;

    if (targetPath !== pathname) {
      if (pathname === '/') {
        resetSearch();
      }
      startNavigation();
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
