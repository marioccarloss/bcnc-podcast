'use client';

import { createContext, useContext, useState, ReactNode, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  startNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function NavigationProviderContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams?.toString());

  const currentSearchParamsStr = searchParams?.toString();

  if (pathname !== prevPath || currentSearchParamsStr !== prevSearchParams) {
    setPrevPath(pathname);
    setPrevSearchParams(currentSearchParamsStr);

    if (isNavigating) {
      setIsNavigating(false);
    }
  }

  const startNavigation = () => {
    setIsNavigating(true);
  };

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NavigationProviderContent>{children}</NavigationProviderContent>
    </Suspense>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation debe utilizarse dentro de un NavigationProvider');
  }
  return context;
}
