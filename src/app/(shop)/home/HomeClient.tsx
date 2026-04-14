'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useBudgetStore } from '@/store/useBudgetStore';

export function HomeClient({ initialProducts, initialCategories }: any) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [activeSubcategory, setActiveSubcategory] = useState(searchParams.get('subcategory') || 'All');
  const { addItem, selectedProduct, setSelectedProduct } = useBudgetStore();

  const uniqueNames: string[] = Array.from(new Set(initialCategories.map((c: any) => c.name as string)));
  const categories: string[] = ['All', ...uniqueNames];

  const filteredProducts = initialProducts.filter((p: any) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSubcategory = activeSubcategory === 'All' || p.subcategory === activeSubcategory;
    return matchesCategory && matchesSubcategory;
  });

  return (
    <>
      <div className="bg-[#E11D48] px-6 py-4 sticky top-[84px] md:top-[92px] z-10 flex gap-2 overflow-x-auto no-scrollbar border-b-4 border-dashed border-white shadow-sm mb-4">
        {(categories as string[]).map((cat: string) => (
          <button 
            key={cat} 
            onClick={() => {
              setActiveCategory(cat);
              setActiveSubcategory('All');
            }}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap border-2 ${
              activeCategory === cat 
                ? 'bg-blue-950 border-blue-950 text-white shadow-lg' 
                : 'bg-white/20 text-white border-transparent hover:bg-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {activeSubcategory !== 'All' && (
        <div className="px-6 mb-4 flex items-center gap-2">
          <div className="bg-teal-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border-2 border-blue-950 shadow-[4px_4px_0_0_#2B2B2B] flex items-center gap-2">
            <span>Aisle: {activeSubcategory}</span>
            <button 
              onClick={() => setActiveSubcategory('All')}
              className="hover:scale-110 transition-transform"
            >
              <X size={12} strokeWidth={4} />
            </button>
          </div>
        </div>
      )}

      <div className="p-6 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20">
        {filteredProducts.map((product: any) => (
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
            <p className="text-[9px] font-black text-teal-700 uppercase mb-1 tracking-tighter line-clamp-1">{product.category}</p>
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
    </>
  );
}
