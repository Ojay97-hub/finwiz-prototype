'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bank,
  CreditCard,
  ChartBar,
  Plant,
  FileText,
  IconWeight
} from '@phosphor-icons/react';

const navItems = [
  { href: '/accounts', label: 'Accounts', icon: Bank },
  { href: '/accounts/current', label: 'Cards', icon: CreditCard },
  { href: '/insights', label: 'Insights', icon: ChartBar },
  { href: '#', label: 'Invest', icon: Plant },
  { href: '#', label: 'Borrow', icon: FileText },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/accounts' || href === '/') {
      return pathname === '/' || pathname === '/accounts';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden pb-safe">
      <nav className="flex items-center justify-around h-[88px] px-2 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const weight: IconWeight = active ? 'fill' : 'regular';
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex flex-col items-center justify-center w-full h-full gap-1
                ${active ? 'text-[#2F04B0]' : 'text-[#8F9BB3]'}
              `}
            >
              <div className={`
                p-1.5 rounded-xl transition-all duration-300
                ${active ? 'bg-[#2F04B0]/5 translate-y-[-2px]' : 'bg-transparent'}
              `}>
                <Icon
                  size={24}
                  weight={weight}
                  className={`transition-all duration-300 ${active ? 'scale-110' : ''}`}
                />
              </div>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
