'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bank,
  CreditCard,
  ChartBar,
  Plant,
  FileText,
  ChatCircle,
  IconWeight
} from '@phosphor-icons/react';

const navItems = [
  { href: '/accounts', label: 'Accounts', icon: Bank },
  { href: '/accounts/current', label: 'Cards', icon: CreditCard },
  { href: '/insights', label: 'Insights', icon: ChartBar },
  { href: '#', label: 'Invest', icon: Plant },
  { href: '#', label: 'Borrow', icon: FileText },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/accounts' || href === '/') {
      return pathname === '/' || pathname === '/accounts';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-3">
        {/* Pill-shaped container with rounded corners */}
        <div
          className="flex items-center justify-between h-20 px-10 bg-white border border-gray-200 shadow-sm"
          style={{ borderRadius: '60px' }}
        >

          {/* Logo Section */}
          <Link href="/accounts" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/wizard-logo.png"
                alt="FinWiz Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#2F04B0]">Fin</span>
              <span className="italic text-[#2F04B0]">Wiz</span>
            </span>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const weight: IconWeight = active ? 'fill' : 'regular';
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`
                      relative flex flex-col items-center gap-1 group py-3 px-2
                      ${active ? 'text-[#2F04B0]' : 'text-[#120048] hover:text-[#2F04B0]'}
                    `}
                  >
                    {/* Top line indicator for active state */}
                    <div
                      className={`
                        absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-b-full transition-all duration-300
                        ${active ? 'w-8 bg-[#2F04B0]' : 'w-0 bg-transparent'}
                      `}
                    />

                    {/* Icon Container - No background, filled when active */}
                    <div className="transition-all duration-300">
                      <Icon
                        size={24}
                        weight={weight}
                        className={`transition-all ${active ? 'text-[#2F04B0]' : 'text-[#120048] group-hover:text-[#2F04B0]'}`}
                      />
                    </div>
                    <span
                      className={`
                        text-xs font-medium tracking-wide transition-colors
                        ${active ? 'text-[#2F04B0]' : 'text-[#120048] group-hover:text-[#2F04B0]'}
                      `}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Account */}
            <button className="flex flex-col items-center gap-1 text-[#120048] hover:text-[#2F04B0] group">
              <div className="w-8 h-8 rounded-full overflow-hidden transition-colors relative bg-transparent">
                <Image
                  src="/user-avatar.png"
                  alt="Account"
                  fill
                  className="object-cover scale-125"
                />
              </div>
              <span className="text-xs font-medium text-[#2F04B0] transition-colors">Account</span>
            </button>

            {/* Chat */}
            <button className="flex flex-col items-center gap-1 text-[#120048] hover:text-[#2F04B0] group">
              <div className="h-8 flex items-center justify-center">
                <ChatCircle
                  size={24}
                  weight="regular"
                  className="text-[#120048] group-hover:text-[#2F04B0]"
                />
              </div>
              <span className="text-xs font-medium text-[#120048] group-hover:text-[#2F04B0] transition-colors">Chat</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

