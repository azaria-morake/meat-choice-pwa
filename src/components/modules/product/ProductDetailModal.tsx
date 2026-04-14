'use client';

import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useBudgetStore } from '@/store/useBudgetStore';

export function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addItem } = useBudgetStore();

  if (!selectedProduct) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 z-[60] flex items-end justify-center backdrop-blur-md pt-10 px-0 md:pt-16 animate-in slide-in-from-bottom border-t border-slate-100" 
      onClick={() => setSelectedProduct(null)}
    >
      <div 
        className="w-full max-w-sm md:max-w-4xl bg-white rounded-t-[40px] flex flex-col relative max-h-[90vh] shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
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
  );
}
