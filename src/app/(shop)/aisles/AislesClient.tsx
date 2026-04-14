'use client';

import { useState } from 'react';
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?._id || null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
      <div className="mb-10 text-left">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-blue-950 mb-4 italic">
          Store Aisles
        </h2>
        <div className="h-2 w-24 bg-[#E11D48] mb-6 shadow-[4px_4px_0_0_#2B2B2B]" />
        <p className="text-slate-600 font-bold max-w-xl text-sm md:text-base leading-relaxed">
          Navigate the physical-to-digital floor plan. Select a section to view available sub-departments and stock counts.
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
              className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none group-active:scale-[0.99] transition-transform"
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
                    {category.subcategories.length} Departments • {category.subcategories.reduce((acc, sub) => acc + sub.productCount, 0)} Total Items
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
                      href={`/home?category=${category.name}&subcategory=${sub.name}`}
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
                        <span className="bg-slate-100 text-[10px] font-black px-2 py-1 rounded-md text-slate-500">
                          {sub.productCount}
                        </span>
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

      {/* FOOTER CALLOUT */}
      <div className="mt-16 p-8 bg-blue-950 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[16px_16px_0_0_#E11D48]">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-black uppercase tracking-widest mb-1 italic">Physical Map Sync</h4>
          <p className="text-blue-200/60 text-xs font-bold uppercase tracking-tight">Real-time floor inventory and aisle location tracking system active.</p>
        </div>
        <div className="h-px w-full md:h-12 md:w-px bg-white/20" />
        <div className="text-center">
            <span className="text-4xl font-black italic">Live</span>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#E11D48]">Update Active</p>
        </div>
      </div>
    </div>
  );
}
