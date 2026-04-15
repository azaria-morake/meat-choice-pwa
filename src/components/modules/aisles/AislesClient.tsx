'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Store, Box, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  productCount: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export function AislesClient({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Only set on mount to avoid hydration mismatch
    const paramsExpanded = searchParams.get('expanded');
    setExpandedCategory(paramsExpanded || categories[0]?._id || null);
  }, [searchParams, categories]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 pb-24">
      <div className="mb-10 text-left">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-blue-950 mb-4 italic">
          Store Aisles
        </h2>
        <div className="h-2 w-24 bg-[#E11D48] mb-6 shadow-[4px_4px_0_0_#2B2B2B]" />
        <p className="text-slate-600 font-bold max-w-xl text-sm md:text-base leading-relaxed">
          Navigate the physical-to-digital floor plan. Select a section to view available sub-departments.
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div 
            key={category._id}
            className={`group border-4 border-blue-950 transition-all duration-300 bg-white ${
              expandedCategory === category._id 
                ? 'shadow-[12px_12px_0_0_#2B2B2B] translate-x-[-4px] translate-y-[-4px]' 
                : 'shadow-[6px_6px_0_0_#2B2B2B] hover:shadow-[10px_10px_0_0_#2B2B2B] hover:translate-x-[-2px] hover:translate-y-[-2px]'
            }`}
          >
            {/* CATEGORY HEADER */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category._id ? null : category._id)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none transition-transform"
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl border-2 border-blue-950 transition-colors ${
                  expandedCategory === category._id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-blue-950'
                }`}>
                  <Store size={24} strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-blue-950">
                    {category.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                    {category.subcategories.length} Departments
                  </p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
                <ChevronDown size={28} strokeWidth={4} className="text-[#E11D48]" />
              </div>
            </button>

            {/* SUBCATEGORIES LIST */}
            {expandedCategory === category._id && (
              <div className="border-t-4 border-dashed border-slate-100 px-6 py-6 md:px-8 md:py-8 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub._id}
                      href={`/home?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub.name)}&categoryId=${category._id}`}
                      className="flex items-center justify-between bg-white border-2 border-slate-200 p-4 rounded-2xl hover:border-[#E11D48] hover:bg-red-50/30 transition-all group/sub shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-slate-400 group-hover/sub:text-[#E11D48] transition-colors">
                          <Box size={18} strokeWidth={2.5} />
                        </div>
                        <span className="font-black uppercase text-xs tracking-widest text-blue-950">
                          {sub.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-300 group-hover/sub:text-[#E11D48]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
