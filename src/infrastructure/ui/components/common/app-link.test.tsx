'use client';

import { render, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppLink } from './app-link';

const startNavigationMock = vi.fn();
const resetSearchMock = vi.fn();
let mockPathname = '/';

vi.mock('@/infrastructure/ui/context', () => ({
  useNavigation: () => ({
    startNavigation: startNavigationMock,
  }),
}));

vi.mock('@/infrastructure/ui/hooks', () => ({
  useResetSearch: () => resetSearchMock,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: { children: ReactNode; href: string } & Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('AppLink', () => {
  beforeEach(() => {
    startNavigationMock.mockClear();
    resetSearchMock.mockClear();
    mockPathname = '/';
  });

  it('should reset search when navigating away from home', () => {
    const { getByRole } = render(<AppLink href="/podcast/1">Ir a podcast</AppLink>);

    fireEvent.click(getByRole('link'));

    expect(resetSearchMock).toHaveBeenCalledTimes(1);
    expect(startNavigationMock).toHaveBeenCalledTimes(1);
  });

  it('should not reset search when current path is not home', () => {
    mockPathname = '/podcast/1';

    const { getByRole } = render(<AppLink href="/podcast/2">Otro podcast</AppLink>);

    fireEvent.click(getByRole('link'));

    expect(resetSearchMock).not.toHaveBeenCalled();
    expect(startNavigationMock).toHaveBeenCalledTimes(1);
  });

  it('should ignore clicks when navigating to the same route', () => {
    mockPathname = '/podcast/1';

    const { getByRole } = render(<AppLink href="/podcast/1">Mismo podcast</AppLink>);

    fireEvent.click(getByRole('link'));

    expect(resetSearchMock).not.toHaveBeenCalled();
    expect(startNavigationMock).not.toHaveBeenCalled();
  });
});
