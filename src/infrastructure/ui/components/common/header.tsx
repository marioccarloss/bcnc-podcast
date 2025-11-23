import { AppLink } from '@/infrastructure/ui/components/common/app-link';
import { HeaderLoader } from '@/infrastructure/ui/components/common/header-loader';
import './header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <AppLink href="/" className="header__title">
          Podcaster
        </AppLink>
        <HeaderLoader />
      </div>
    </header>
  );
}
