'use client';

import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useState, useEffect } from 'react';
import { SearchModal } from '@/components/modules/search/SearchModal';
import localFont from 'next/font/local';

const cooperBlack = localFont({
  src: '../../fonts/COOPBL.woff',
  display: 'swap',
});

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isSale = pathname.startsWith('/sales');
  const { getTotal, getTotalItems, setIsListOpen } = useBudgetStore();
  const total = getTotal();
  const count = getTotalItems();
  
  return (
    <header className="bg-white px-6 md:px-12 pt-4 md:pt-6 pb-4 flex justify-between items-center sticky top-0 z-20">
      <Link href="/home" className="flex-shrink-0">
        <h1 className={`${cooperBlack.className} text-3xl tracking-tight text-[#2B2B2B]`}>
          <span className="text-[#E74043]">Meat</span> Choice
        </h1>
        <p className={`${cooperBlack.className} text-[13px] text-[#333333] tracking-wide text-center mt-[-2px]`}>
          {isSale ? 'Digital Catalogue' : 'Fresh to Frozen'}
        </p>
      </Link>
      
      {/* DESTKOP NAV LINKS */}
      <nav className="hidden md:flex flex-1 items-center justify-center gap-12 font-black uppercase tracking-widest text-sm text-blue-950/60">
        <Link href="/home" className={pathname === '/home' ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Home</Link>
        <Link href="/aisles" className={pathname.startsWith('/aisles') ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Aisles</Link>
        <Link href="/sales" className={pathname.startsWith('/sales') ? 'text-[#E11D48]' : 'hover:text-slate-800 transition-colors'}>Sales</Link>
      </nav>

      <div className="flex gap-4 items-center">
        <button onClick={() => setIsSearchOpen(true)} className="p-2 bg-teal-50 rounded-full border border-teal-100 outline-none hover:bg-teal-100 transition-colors">
          <Search size={20} className="text-teal-800" />
        </button>
        
        {/* DESKTOP CART/BUDGET BUTTON */}
        <button 
          onClick={() => setIsListOpen(true)}
          className="hidden md:flex bg-slate-900 border-2 border-slate-900 hover:bg-white hover:text-slate-900 text-white rounded-full px-5 py-2.5 items-center gap-2 transition-colors active:scale-95 group relative"
        >
          <span className="font-black uppercase text-sm tracking-widest group-hover:scale-105 transition-transform">
            Budget
          </span>
          {mounted && count > 0 && (
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
