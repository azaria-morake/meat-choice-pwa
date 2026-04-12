'use client';

import { useBudgetStore } from '@/store/useBudgetStore';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Share2, Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

export function BudgetDrawer() {
  const { isListOpen, setIsListOpen, basket, updateQuantity, removeItem, clearBasket, getTotal, removedItems, reAddItem, clearRemovedItems } = useBudgetStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const total = getTotal();

  const handleShare = () => {
    let msg = 'My Meat Choice Budget:\n\n';
    basket.forEach(item => {
      msg += `${item.quantity}x ${item.name} - R${(item.price * item.quantity).toFixed(2)}\n`;
    });
    msg += `\nTotal: R${total.toFixed(2)}`;
    
    // Fallback for native sharing if WhatsApp link is blocked or doesn't resolve cleanly
    const encoded = encodeURIComponent(msg);
    window.location.href = `whatsapp://send?text=${encoded}`;
  };

  return (
    <Drawer open={isListOpen} onOpenChange={setIsListOpen} direction={isDesktop ? 'right' : 'bottom'}>
      <DrawerContent className={`bg-white px-8 pb-8 pt-4 md:pt-12 shadow-2xl flex flex-col ${isDesktop ? 'h-full max-h-screen max-w-md rounded-l-[40px] ml-auto mr-0' : 'max-h-[85vh] max-w-md mx-auto rounded-t-[40px]'}`}>
        <DrawerTitle className="sr-only">Budget List</DrawerTitle>
        {!isDesktop && <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">My Budget List</h2>
          {confirmClear ? (
            <button 
              onClick={() => { clearBasket(); setConfirmClear(false); }} 
              className="text-white bg-red-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all"
            >
              Confirm Clear
            </button>
          ) : (
            <button onClick={() => basket.length > 0 && setConfirmClear(true)} className="p-2 text-red-600 transition-all hover:bg-red-50 rounded-full">
              <Trash2 size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2">
          {basket.length === 0 ? (
            <div className="text-center py-12 text-slate-400 uppercase font-black tracking-widest bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">List is empty</div>
          ) : (
            basket.map(item => (
              <div key={item.id} className="relative group overflow-hidden rounded-2xl shadow-sm">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-100 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 w-12 h-12 rounded-[14px] flex items-center justify-center overflow-hidden">
                      {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <div className="text-[9px] font-black text-slate-300">N/A</div>}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-black uppercase leading-tight line-clamp-1">{item.name}</p>
                      <p className="text-[11px] font-bold text-red-600 mt-0.5">R{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-inner">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-slate-800 transition-colors p-1"><Minus size={14} strokeWidth={3} /></button>
                    <span className="text-xs font-black min-w-[20px] text-center shrink-0">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-red-600 hover:text-red-700 transition-colors p-1"><Plus size={14} strokeWidth={3} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* RECENTLY REMOVED CACHE */}
          {removedItems && removedItems.length > 0 && (
            <div className="mt-8 pt-6 border-t-[3px] border-dashed border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recently Removed</h3>
                <button onClick={clearRemovedItems} className="text-[9px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest underline decoration-dotted underline-offset-4">Clear All</button>
              </div>
              <div className="space-y-3 opacity-70 hover:opacity-100 transition-opacity duration-300">
                {removedItems.map(item => (
                   <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200 group relative">
                     <span className="text-[10px] font-bold text-slate-500 line-through truncate max-w-[150px]">{item.name}</span>
                     <button 
                       onClick={() => reAddItem(item.id)}
                       className="bg-slate-200 hover:bg-slate-900 group-hover:text-white text-slate-500 text-[9px] font-black uppercase px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                     >
                       <Plus size={10} strokeWidth={4} /> Re-add
                     </button>
                   </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl mt-auto transition-transform">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Est. Total</span>
            <span className="text-3xl font-black">R{total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleShare}
            disabled={basket.length === 0}
            className="w-full bg-red-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 disabled:opacity-50 transition-all hover:bg-red-500"
          >
            <Share2 size={18} /> Share List
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
