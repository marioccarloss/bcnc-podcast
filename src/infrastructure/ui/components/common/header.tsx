import Link from 'next/link';
import './header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__title">
          Podcaster
        </Link>
      </div>
    </header>
  );
}
