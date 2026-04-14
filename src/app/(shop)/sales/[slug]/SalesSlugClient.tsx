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

      <div className="p-6 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20">
        {catalogue.products?.map((product: any) => (
          <div 
            key={product._id} 
            onClick={() => setSelectedProduct(product)} 
            className="bg-white p-4 rounded-[28px] border-2 border-teal-50 shadow-sm active:scale-95 transition-transform flex flex-col relative overflow-hidden cursor-pointer hover:shadow-md hover:border-teal-100"
          >
            <div className="bg-teal-50 aspect-square rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-teal-700 font-bold uppercase text-[10px]">Photo</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-[#E11D48] text-white text-[8px] font-black px-2 py-1 rounded-full shadow-sm">
                SALE
              </div>
            )}
            <p className="text-[9px] font-black text-teal-700 uppercase mb-1 tracking-tighter line-clamp-1">{product.category || 'Sale Item'}</p>
            <p className="text-xs font-black text-blue-950 leading-tight line-clamp-2 h-8">{product.name}</p>
            
            <div className="mt-auto pt-3 flex flex-col">
              {product.originalPrice && (
                <span className="text-[10px] font-bold text-teal-700/60 line-through">R{product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-[17px] font-black text-[#E11D48]">R{product.price.toFixed(2)}</span>
            </div>
            
            <button 
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ ...product, id: product._id });
                toast.success(`${product.name} added to list`);
              }}
              className="w-full mt-3 py-3 bg-blue-950 text-white text-[9px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-blue-900 transition-colors"
            >
              <Plus size={14} /> Add to list
            </button>
          </div>
        ))}
      </div>

      {/* SINGLE CATALOGUE MODAL REUSE (Side-by-side Layout) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-30 flex items-end justify-center backdrop-blur-md pt-10 px-0 md:pt-16 animate-in slide-in-from-bottom border-t border-slate-100" onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-sm md:max-w-4xl bg-white rounded-t-[40px] flex flex-col relative max-h-[90vh] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-full shrink-0 relative pt-6 pb-4">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-6 md:top-5 md:right-8 bg-slate-100 text-slate-500 rounded-full p-2 hover:bg-slate-200 transition-colors z-20"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            
            <div className="px-6 md:px-10 pb-8 flex flex-col overflow-y-auto no-scrollbar">
              <div className="flex flex-row items-start gap-4 md:gap-8 mb-6 w-full">
              {/* LEFT: 1:1 Image */}
              <div className="bg-teal-50 shrink-0 w-28 md:w-64 aspect-square rounded-2xl md:rounded-[32px] flex items-center justify-center overflow-hidden shadow-inner border-2 md:border-4 border-teal-100">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-teal-700 font-bold uppercase text-[10px]">Photo</span>
                )}
              </div>
              
              {/* RIGHT: Meta Info */}
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-xl md:text-4xl font-black uppercase mb-1 md:mb-2 tracking-tight leading-none text-[#2B2B2B] line-clamp-3">{selectedProduct.name}</h2>
                <p className="text-[10px] md:text-sm font-black text-teal-700 uppercase tracking-widest mb-3 md:mb-6 border-b-2 border-teal-50 pb-2 md:pb-4">
                  {selectedProduct.unit} • Aisle: {selectedProduct.category}
                </p>
                
                <div className="w-full flex items-center gap-2 md:gap-3 flex-wrap">
                  <div className={`text-[9px] md:text-[10px] uppercase font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 ${
                    selectedProduct.stockStatus === 'low_stock' ? 'border-amber-500 text-amber-700 bg-amber-50' : 
                    selectedProduct.stockStatus === 'out_of_stock' ? 'border-red-500 text-red-600 bg-red-50' : 
                    'border-teal-500 text-teal-800 bg-teal-50'
                  }`}>
                    {selectedProduct.stockStatus === 'low_stock' ? '⚠️ Low Stock' : selectedProduct.stockStatus === 'out_of_stock' ? '❌ Out of Stock' : '✅ In Stock' }
                  </div>
                  <div className="text-blue-950 font-black text-[9px] md:text-[10px] uppercase bg-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-blue-200">
                    📍 {selectedProduct.aisleLocation}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ ...selectedProduct, id: selectedProduct._id });
                toast.success(`${selectedProduct.name} added to list!`);
              }} 
              className="w-full bg-[#E11D48] text-white px-6 py-4 md:py-5 mb-8 rounded-[20px] font-black uppercase tracking-[0.1em] text-xs md:text-sm active:scale-95 transition-transform hover:bg-[#be163b] flex items-center justify-center gap-2"
            >
              <Plus size={16} strokeWidth={3} /> Add to list (R{selectedProduct.price.toFixed(2)})
            </button>

            {/* NUTRITION LABEL GRID */}
            <div className="w-full max-w-xl mx-auto border-4 border-blue-950 p-6 md:p-8 text-left bg-white shadow-[8px_8px_0_0_#2B2B2B] text-blue-950">
              <h3 className="font-black text-3xl md:text-4xl border-b-8 border-blue-950 pb-2 mb-4 tracking-tighter uppercase italic pr-8">
                Nutrition Facts
              </h3>
              <div className="flex justify-between text-sm md:text-base font-black border-b-4 border-blue-950 pb-2 mb-3">
                <span>Serving Size</span>
                <span>{selectedProduct.nutrition?.servingSize || '100g'}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span>Calories</span><span>{selectedProduct.nutrition?.calories || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span>Total Fat</span><span>{selectedProduct.nutrition?.totalFat || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span className="pl-4 font-bold text-teal-800">Saturated Fat</span><span>{selectedProduct.nutrition?.saturatedFat || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span>Cholesterol</span><span>{selectedProduct.nutrition?.cholesterol || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span>Sodium</span><span>{selectedProduct.nutrition?.sodium || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span>Total Carbs</span><span>{selectedProduct.nutrition?.totalCarbohydrates || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span className="pl-4 font-bold text-teal-800">Dietary Fiber</span><span>{selectedProduct.nutrition?.dietaryFiber || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black border-b-2 border-blue-950/20 pb-1.5">
                  <span className="pl-4 font-bold text-teal-800">Sugars</span><span>{selectedProduct.nutrition?.sugars || '--'}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm font-black pt-1 mb-2 border-b-4 border-blue-950 pb-2">
                  <span>Protein</span><span>{selectedProduct.nutrition?.protein || '--'}</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
