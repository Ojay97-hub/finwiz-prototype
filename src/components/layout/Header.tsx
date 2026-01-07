'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Wallet, BarChart3, Sprout, Receipt, MessageCircle } from 'lucide-react';

const navItems = [
  { href: '/accounts', label: 'Accounts', icon: Home },
  { href: '/accounts/current', label: 'Cards', icon: Wallet },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '#', label: 'Invest', icon: Sprout },
  { href: '#', label: 'Borrow', icon: Receipt },
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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-28">

          {/* Logo Section */}
          <Link href="/accounts" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/wizard-logo.png"
                alt="FinWiz Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              <span className="text-[#120048]">Fin</span>
              <span
                className="text-white"
                style={{
                  WebkitTextStroke: '1px #120048',
                  textShadow: '0 0 1px rgba(18, 0, 72, 0.1)' // subtle sharpening
                }}
              >
                Wiz
              </span>
            </span>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 ml-12">
            <div className="flex items-center gap-12">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`
                      flex flex-col items-center gap-1 group py-2
                      ${active ? 'text-[#2F04B0]' : 'text-[#120048] hover:text-[#2F04B0]'}
                    `}
                  >
                    {/* Icon Container with Active Background */}
                    <div
                      className={`
                        p-2.5 rounded-2xl transition-all duration-300
                        ${active ? 'bg-[#2F04B0] text-white' : 'bg-transparent'}
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all ${active ? 'fill-white stroke-white' : 'stroke-[1.5]'}`}
                        strokeWidth={active ? 0 : 1.5}
                      />
                    </div>
                    <span
                      className={`
                        text-sm font-bold tracking-wide transition-colors
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
          <div className="flex items-center gap-8">
            {/* Account */}
            <button className="flex flex-col items-center gap-1 text-[#120048] hover:text-[#2F04B0] group">
              <div className="w-10 h-10 rounded-full overflow-hidden transition-colors relative bg-transparent">
                <Image
                  src="/user-avatar.png"
                  alt="Account"
                  fill
                  className="object-cover scale-125"
                />
              </div>
              <span className="text-sm font-bold text-[#120048] group-hover:text-[#2F04B0] transition-colors">Account</span>
            </button>

            {/* Chat */}
            <button className="flex flex-col items-center gap-1 text-[#120048] hover:text-[#2F04B0] group">
              <div className="h-10 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-sm font-bold text-[#120048] group-hover:text-[#2F04B0] transition-colors">Chat</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
