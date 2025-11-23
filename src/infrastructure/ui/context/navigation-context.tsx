'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextType {
  isNavigating: boolean;
  startNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function NavigationProviderContent({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

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
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
