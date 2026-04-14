'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Grid, ShoppingBag, Tag } from 'lucide-react';
import { useBudgetStore } from '@/store/useBudgetStore';
import { MoreMenuModal } from '@/components/navigation/MoreMenuModal';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { getTotal, getTotalItems, setIsListOpen } = useBudgetStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const total = getTotal();
  const count = getTotalItems();

  return (
    <nav className="fixed bottom-0 w-full max-w-md md:hidden bg-white border-t border-slate-200 px-8 py-4 flex justify-between items-center z-20 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => router.push('/home')} 
        className={`flex flex-col items-center gap-1 ${pathname === '/home' || pathname === '/' ? 'text-red-600' : 'text-blue-950 opacity-60 hover:opacity-100'}`}
      >
        <Home size={22} />
        <span className="text-[9px] font-black uppercase">Home</span>
      </button>

      <button onClick={() => router.push('/aisles')} className={`flex flex-col items-center gap-1 ${pathname.startsWith('/aisles') ? 'text-red-600' : 'text-blue-950 opacity-60 hover:opacity-100'}`}>
        <Grid size={22} />
        <span className="text-[9px] font-black uppercase">Aisles</span>
      </button>
      
      {/* CALCULATOR FAB */}
      <button 
        onClick={() => setIsListOpen(true)}
        className="bg-slate-900 text-white w-20 h-20 rounded-full -mt-12 border-[6px] border-[#F4F4F5] shadow-xl flex flex-col items-center justify-center relative active:scale-95 transition-transform"
      >
        <ShoppingBag size={24} className="mb-0.5" />
        <span className="text-[10px] font-black leading-none">R{mounted ? total.toFixed(0) : '0'}</span>
        {mounted && count > 0 && (
           <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm leading-none">
             {count}
           </div>
        )}
      </button>

      <button onClick={() => router.push('/sales')} className={`flex flex-col items-center gap-1 ${pathname.startsWith('/sales') ? 'text-red-600' : 'text-blue-950 opacity-60 hover:opacity-100'}`}>
        <Tag size={22} />
        <span className="text-[9px] font-black uppercase">Sales</span>
      </button>

      <MoreMenuModal />
    </nav>
  );
}
