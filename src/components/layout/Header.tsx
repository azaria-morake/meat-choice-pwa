'use client';

import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useState } from 'react';
import { SearchModal } from '@/components/modules/search/SearchModal';

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const isSale = pathname.startsWith('/sales');
  const { getTotal, getTotalItems, setIsListOpen } = useBudgetStore();
  const total = getTotal();
  const count = getTotalItems();
  
  return (
    <header className="bg-white px-6 md:px-12 pt-12 md:pt-6 pb-4 flex justify-between items-center sticky top-0 z-20 border-b border-slate-100 shadow-sm">
      <Link href="/home" className="flex-shrink-0">
        <h1 className="text-2xl font-black tracking-tight uppercase">
          Meat <span className="text-[#E11D48]">Choice</span>
        </h1>
        <p className="text-[10px] text-slate-400 font-bold tracking-widest">
          {isSale ? 'DIGITAL CATALOGUE' : 'FRESH TO FROZEN'}
        </p>
      </Link>
      
      {/* DESTKOP NAV LINKS */}
      <nav className="hidden md:flex flex-1 items-center justify-center gap-12 font-black uppercase tracking-widest text-sm text-slate-400">
        <Link href="/home" className={pathname === '/home' ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Home</Link>
        <Link href="/aisles" className={pathname.startsWith('/aisles') ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Aisles</Link>
        <Link href="/sales" className={pathname.startsWith('/sales') ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Sales</Link>
      </nav>

      <div className="flex gap-4 items-center">
        <button onClick={() => setIsSearchOpen(true)} className="p-2 bg-slate-50 rounded-full border border-slate-100 outline-none hover:bg-slate-100 transition-colors">
          <Search size={20} className="text-slate-500" />
        </button>
        
        {/* DESKTOP CART/BUDGET BUTTON */}
        <button 
          onClick={() => setIsListOpen(true)}
          className="hidden md:flex bg-slate-900 border-2 border-slate-900 hover:bg-white hover:text-slate-900 text-white rounded-full px-5 py-2.5 items-center gap-2 transition-colors active:scale-95 group relative"
        >
          <span className="font-black uppercase text-sm tracking-widest group-hover:scale-105 transition-transform">
            Budget
          </span>
          {count > 0 && (
            <div className="absolute -top-2 -right-2 bg-[#E11D48] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm leading-none">
              {count}
            </div>
          )}
        </button>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
