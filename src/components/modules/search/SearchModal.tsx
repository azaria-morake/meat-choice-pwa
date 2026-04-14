'use client';

import { useState, useEffect } from 'react';
import { Search, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { useBudgetStore } from '@/store/useBudgetStore';
import { toast } from 'sonner';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const { addItem, setSelectedProduct } = useBudgetStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setProducts([]);
      setPage(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim() || query.length < 2) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const results = await client.fetch(
          `*[_type == "product" && (name match $searchQuery || subcategory->name match $searchQuery || subcategory->category->name match $searchQuery)] { 
            _id, 
            name, 
            price, 
            originalPrice, 
            "subcategory": subcategory->name,
            "category": subcategory->category->name, 
            "image": image.asset->url, 
            aisleLocation,
            unit,
            stockStatus,
            nutrition 
          }`,
          { searchQuery: `${query}*` }
        );
        setProducts(results || []);
      } catch (e) {
        // Minimal Mock Fallback so app doesn't break locally without sanity keys
        const mockFallback = [
          { _id: 'm1', name: 'Premium Wagyu Beef Mince', price: 149.99, category: 'Beef' },
          { _id: 'm2', name: 'Free-Range Chicken Breasts', price: 89.99, category: 'Chicken' },
          { _id: 'm3', name: 'Pork Belly Roast', price: 129.99, category: 'Pork' },
          { _id: 'm4', name: 'Lamb Loin Chops', price: 189.99, category: 'Lamb' },
          { _id: 'm5', name: 'Smoked Salmon Ribbons', price: 219.99, category: 'Seafood' },
          { _id: 'm6', name: 'Ostrich Fillets', price: 159.99, category: 'Game' },
        ];
        setProducts(mockFallback.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
      }
      setLoading(false);
      setPage(0);
    };

    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start md:items-center justify-center p-4 pt-20 md:pt-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-[40px] p-6 shadow-2xl flex flex-col md:max-h-[85vh]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">Search</h2>
          <button onClick={onClose} className="p-2 bg-slate-50 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-700" />
          </button>
        </div>

        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for meats, cuts, or categories..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-[50vh] md:min-h-0 space-y-3">
          {loading ? (
            <div className="text-center py-10 font-bold text-slate-400 uppercase tracking-widest text-xs">Searching...</div>
          ) : products.length > 0 ? (
            currentProducts.map(product => (
              <div 
                key={product._id} 
                onClick={() => {
                  setSelectedProduct(product);
                }}
                className="flex items-center justify-between bg-white border-2 border-slate-100 p-4 rounded-2xl shadow-sm cursor-pointer hover:border-red-100 transition-colors"
              >
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] font-black uppercase text-slate-500 mb-1">{product.category || 'Item'}</span>
                  <span className="text-sm font-black text-slate-800 leading-tight mb-1">{product.name}</span>
                  <span className="text-sm font-black text-[#E11D48]">R{product.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem({ ...product, id: product._id });
                    toast.success(`${product.name} added to list`);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white shrink-0 p-3 rounded-xl transition-all active:scale-95"
                >
                  <Plus size={18} />
                </button>
              </div>
            ))
          ) : query.length >= 2 ? (
            <div className="text-center py-10 font-bold text-slate-400 uppercase tracking-widest text-xs">No products found</div>
          ) : (
            <div className="text-center py-10 font-bold text-slate-400 uppercase tracking-widest text-xs opacity-50">Type to start searching</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t-2 border-slate-100 pt-6">
            <button 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border-2 border-slate-200 rounded-xl font-bold text-xs uppercase disabled:opacity-30 flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={14} /> Back
            </button>
            <span className="font-black text-xs text-slate-400 uppercase tracking-widest">
              Page {page + 1} of {totalPages}
            </span>
            <button 
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase disabled:opacity-30 flex items-center gap-2 hover:bg-slate-800 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
