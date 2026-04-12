'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { CatalogueCountdown } from '@/components/modules/catalogue/CatalogueCountdown';
import { useBudgetStore } from '@/store/useBudgetStore';

export function SalesSlugClient({ catalogue }: { catalogue: any }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const addItem = useBudgetStore(state => state.addItem);

  const handleShare = () => {
    let msg = `Check out "${catalogue.title}" at Meat Choice!\n\nExpires: ${new Date(catalogue.validTo).toLocaleDateString()}\n\n`;
    const encoded = encodeURIComponent(msg);
    window.location.href = `whatsapp://send?text=${encoded}`;
  };

  return (
    <>
      <div className="bg-[#E11D48] text-white p-6 mb-2">
        <Link href="/sales" className="text-[10px] font-bold uppercase mb-4 flex items-center gap-1 opacity-80 underline hover:opacity-100 transition-opacity w-fit">
          ← All Catalogues
        </Link>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black uppercase leading-tight mr-4">{catalogue.title}</h2>
          </div>
          <button onClick={handleShare} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors shrink-0">
            <Share2 size={18}/>
          </button>
        </div>
        <CatalogueCountdown validTo={catalogue.validTo} />
      </div>

      <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-24">
        {catalogue.products?.map((product: any) => (
          <div 
            key={product._id} 
            onClick={() => setSelectedProduct(product)} 
            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm active:scale-95 transition-transform flex flex-col relative overflow-hidden cursor-pointer hover:shadow-md"
          >
            <div className="bg-red-50 aspect-square rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-red-300 font-bold uppercase text-xs">Sale</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-[#E11D48] text-white text-[8px] font-black px-2 py-1 rounded-full shadow-sm">
                SALE
              </div>
            )}
            <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-tighter line-clamp-1">{product.category || 'Sale Item'}</p>
            <p className="text-xs font-black text-slate-800 leading-tight line-clamp-2 h-8">{product.name}</p>
            
            <div className="mt-auto pt-3 flex flex-col">
              {product.originalPrice && (
                <span className="text-[10px] font-bold text-slate-500 line-through">R{product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-lg font-black text-[#E11D48]">R{product.price.toFixed(2)}</span>
            </div>
            
            <button 
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ ...product, id: product._id });
                toast.success(`${product.name} added to list`);
              }}
              className="w-full mt-3 py-3 bg-slate-900 text-white text-[9px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors"
            >
              <Plus size={14} /> Add to list
            </button>
          </div>
        ))}
      </div>

      {/* SINGLE CATALOGUE MODAL REUSE */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-30 flex items-end md:items-center justify-center backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-md md:max-w-2xl bg-white rounded-t-[40px] md:rounded-[40px] p-10 animate-in slide-in-from-bottom md:zoom-in-95 flex flex-col md:flex-row md:items-start items-center text-center md:text-left relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full hover:bg-slate-200 transition-colors">
              <X size={20} className="text-slate-700" />
            </button>
            
            <div className="bg-red-50 w-28 h-28 rounded-[32px] flex items-center justify-center mb-6 overflow-hidden shadow-inner">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-red-300 font-bold uppercase text-[10px]">Photo</span>
              )}
            </div>
            
            <h2 className="text-3xl font-black uppercase mb-1 tracking-tight leading-none">{selectedProduct.name}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
              {selectedProduct.unit} • Aisle: {selectedProduct.category || 'N/A'}
            </p>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ ...selectedProduct, id: selectedProduct._id });
                setSelectedProduct(null);
                toast.success(`${selectedProduct.name} added to list`);
              }} 
              className="w-full bg-[#E11D48] text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-600/30 active:scale-95 transition-transform hover:bg-[#be163b]"
            >
              Add to list (R{selectedProduct.price.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </>
  );
}
