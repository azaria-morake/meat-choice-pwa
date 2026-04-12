'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useBudgetStore } from '@/store/useBudgetStore';

export function HomeClient({ initialProducts, initialCategories }: any) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const addItem = useBudgetStore(state => state.addItem);

  const categories = ['All', ...initialCategories.map((c: any) => c.name)];

  const filteredProducts = initialProducts.filter((p: any) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <>
      <div className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-10 flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-6 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20">
        {filteredProducts.map((product: any) => (
          <div 
            key={product._id} 
            onClick={() => setSelectedProduct(product)} 
            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm active:scale-95 transition-transform flex flex-col relative overflow-hidden cursor-pointer hover:shadow-md"
          >
            <div className="bg-slate-50 aspect-square rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-slate-300 font-bold uppercase text-xs">No Image</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-[#E11D48] text-white text-[8px] font-black px-2 py-1 rounded-full shadow-sm">
                SALE
              </div>
            )}
            <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-tighter line-clamp-1">{product.category}</p>
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

      {/* PRODUCT DETAILS MODAL (Refined Brutalism) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-30 flex items-end justify-center backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="w-full max-w-md bg-white rounded-t-[40px] p-10 animate-in slide-in-from-bottom flex flex-col items-center text-center relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full hover:bg-slate-200 transition-colors">
              <X size={20} className="text-slate-700" />
            </button>
            
            <div className="bg-slate-100 w-28 h-28 rounded-[32px] flex items-center justify-center mb-6 overflow-hidden shadow-inner">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-slate-300 font-bold uppercase text-[10px]">Photo</span>
              )}
            </div>
            
            <h2 className="text-3xl font-black uppercase mb-1 tracking-tight leading-none">{selectedProduct.name}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
              {selectedProduct.unit} • Aisle: {selectedProduct.category}
            </p>
            
            <div className="w-full flex items-center justify-between mb-8">
              <div className={`text-[10px] uppercase font-black px-3 py-1.5 rounded-full border-2 ${
                selectedProduct.stockStatus === 'low_stock' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                selectedProduct.stockStatus === 'out_of_stock' ? 'border-red-500 text-red-600 bg-red-50' : 
                'border-emerald-500 text-emerald-600 bg-emerald-50'
              }`}>
                {selectedProduct.stockStatus === 'low_stock' ? '⚠️ Low Stock' : selectedProduct.stockStatus === 'out_of_stock' ? '❌ Out of Stock' : '✅ In Stock' }
              </div>
              <div className="text-slate-600 font-bold text-xs uppercase bg-slate-100 px-3 py-1.5 rounded-full">
                📍 {selectedProduct.aisleLocation}
              </div>
            </div>

            {/* NUTRITION LABEL GRID - Brutalism */}
            <div className="w-full border-4 border-slate-900 p-6 mb-8 text-left bg-white shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
              <h3 className="font-black text-3xl border-b-8 border-slate-900 pb-2 mb-4 tracking-tighter uppercase italic pr-8">
                Nutrition Facts
              </h3>
              <div className="flex justify-between text-sm font-black border-b-4 border-slate-900 pb-2 mb-2">
                <span>Serving Size</span>
                <span>{selectedProduct.nutrition?.servingSize || '100g'}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span>Calories</span><span>{selectedProduct.nutrition?.calories || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span>Total Fat</span><span>{selectedProduct.nutrition?.totalFat || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span className="pl-4 font-medium text-slate-600">Saturated Fat</span><span>{selectedProduct.nutrition?.saturatedFat || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span>Cholesterol</span><span>{selectedProduct.nutrition?.cholesterol || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span>Sodium</span><span>{selectedProduct.nutrition?.sodium || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span>Total Carbs</span><span>{selectedProduct.nutrition?.totalCarbohydrates || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span className="pl-4 font-medium text-slate-600">Dietary Fiber</span><span>{selectedProduct.nutrition?.dietaryFiber || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-slate-300 pb-1">
                  <span className="pl-4 font-medium text-slate-600">Sugars</span><span>{selectedProduct.nutrition?.sugars || '--'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span>Protein</span><span>{selectedProduct.nutrition?.protein || '--'}</span>
                </div>
              </div>
            </div>
            
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
