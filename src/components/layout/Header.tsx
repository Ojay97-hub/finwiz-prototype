'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Accounts', icon: AccountsIcon },
    { href: '/accounts/current', label: 'Cards', icon: CardsIcon },
    { href: '/insights', label: 'Insights', icon: InsightsIcon },
    { href: '#', label: 'Invest', icon: InvestIcon },
    { href: '#', label: 'Borrow', icon: BorrowIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' || href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-divider shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-orange-3 flex items-center justify-center">
              <span className="text-lg">🧙</span>
            </div>
            <span className="text-xl font-bold text-brand-primary">
              Fin<span className="text-brand-logo">Wiz</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center rounded-xl transition-all duration-200
                    ${active
                      ? 'text-brand-primary gap-1.5 px-6 py-3'
                      : 'text-text-secondary hover:text-text-primary gap-0.5 px-4 py-2'
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${active ? 'text-brand-primary' : ''}`}
                    filled={active}
                  />
                  <span className={`text-xs font-medium ${active ? 'border-b-2 border-brand-primary' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="relative p-2 rounded-full hover:bg-surface-base transition-colors">
              <BellIcon className="w-5 h-5 text-text-secondary" />
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-primary/20 cursor-pointer">
              <div className="w-full h-full bg-gradient-orange-3 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">OJ</span>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-surface-base transition-colors">
              <MoreIcon className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Icon Components

interface IconProps {
  className?: string;
  filled?: boolean;
}

function AccountsIcon({ className, filled }: IconProps) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="currentColor" />
        <path d="M9 22V12h6v10" fill="white" />
      </svg> // Solid house with white door
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
}

function CardsIcon({ className, filled }: IconProps) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="none">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" fill="currentColor" />
        <line x1="1" y1="10" x2="23" y2="10" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function InsightsIcon({ className, filled }: IconProps) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
        <line x1="18" y1="18" x2="18" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="18" x2="6" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function InvestIcon({ className, filled }: IconProps) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function BorrowIcon({ className, filled }: IconProps) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="currentColor" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function MoreIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
