'use client';

import { useNavigation } from '@/infrastructure/ui/context';

export function HeaderLoader() {
  const { isNavigating } = useNavigation();

  return <div className={`header__loader ${isNavigating ? 'active' : ''}`} id="global-loader" />;
}
