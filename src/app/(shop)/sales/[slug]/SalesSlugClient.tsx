'use client';

import Link from 'next/link';
import { Share2, Plus, ArrowLeft, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { CatalogueCountdown } from '@/components/modules/catalogue/CatalogueCountdown';
import { useBudgetStore } from '@/store/useBudgetStore';

export function SalesSlugClient({ catalogue }: { catalogue: any }) {
  const setSelectedProduct = useBudgetStore(state => state.setSelectedProduct);
  const addItem = useBudgetStore(state => state.addItem);

  const handleShare = () => {
    let msg = `🔥 check out "${catalogue.title}" at Meat Choice!\n\nDeals expire soon!\n\n`;
    const encoded = encodeURIComponent(msg);
    window.location.href = `whatsapp://send?text=${encoded}`;
  };

  return (
    <div className="pb-24">
      {/* HERO HEADER */}
      <div className="bg-[#E11D48] text-white p-8 md:p-12 mb-8 border-b-8 border-blue-950 shadow-[0_8px_0_0_#2B2B2B]">
        <div className="max-w-6xl mx-auto">
          <Link href="/sales" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-8 bg-blue-950/20 px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft size={14} /> Back to Deals
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={20} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Live Catalogue</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter italic mr-4 max-w-2xl text-shadow-lg">
                {catalogue.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <CatalogueCountdown validTo={catalogue.validTo} />
              <button onClick={handleShare} className="bg-blue-950 text-white p-4 rounded-2xl border-2 border-white/20 hover:bg-white hover:text-blue-950 transition-all shadow-lg active:scale-95">
                <Share2 size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {catalogue.products?.map((product: any) => (
            <div 
              key={product._id} 
              onClick={() => setSelectedProduct(product)} 
              className="group bg-white border-4 border-blue-950 p-4 md:p-6 transition-all duration-300 shadow-[6px_6px_0_0_#2B2B2B] hover:shadow-[10px_10px_0_0_#2B2B2B] hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer flex flex-col relative"
            >
              {/* SALE BADGE */}
              {product.originalPrice && (
                <div className="absolute top-[-12px] right-[-12px] bg-yellow-400 text-blue-950 text-[10px] font-black px-4 py-1.5 border-2 border-blue-950 shadow-[4px_4px_0_0_#2B2B2B] rotate-3 group-hover:rotate-0 transition-transform z-10 uppercase tracking-widest">
                  Save R{(product.originalPrice - product.price).toFixed(0)}
                </div>
              )}

              <div className="bg-slate-50 aspect-square rounded-xl mb-4 flex items-center justify-center overflow-hidden border-2 border-slate-100 group-hover:border-blue-950 transition-colors">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full mix-blend-multiply" />
                ) : (
                  <Zap size={32} className="text-slate-200" />
                )}
              </div>

              <div className="space-y-1 mb-8">
                <p className="text-[9px] font-black text-blue-950/40 uppercase tracking-[0.15em] line-clamp-1">
                  {product.category || 'Special Deal'}
                </p>
                <h4 className="text-xs md:text-sm font-black text-blue-950 uppercase leading-tight line-clamp-2 h-10 group-hover:text-[#E11D48] transition-colors">
                  {product.name}
                </h4>
              </div>
              
              <div className="mt-auto pt-4 border-t-2 border-slate-50 flex flex-col items-start gap-1">
                {product.originalPrice && (
                  <span className="text-[10px] font-bold text-slate-400 line-through">R{product.originalPrice.toFixed(2)}</span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#E11D48]">R{product.price.toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{product.unit}</span>
                </div>
              </div>
              
              <button 
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem({ ...product, id: product._id });
                  toast.success(`${product.name} added to list`);
                }}
                className="w-full mt-6 py-4 bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#E11D48] transition-all active:scale-95"
              >
                <Plus size={16} strokeWidth={3} /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
