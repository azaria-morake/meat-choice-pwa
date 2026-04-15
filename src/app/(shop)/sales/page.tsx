import { client } from '@/sanity/lib/client';
import { ACTIVE_CATALOGUES_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import { Sparkles, Calendar, ChevronRight, Zap } from 'lucide-react';

export const revalidate = 60;

export default async function SalesPage() {
  let catalogues: any = null;
  try {
    catalogues = await client.fetch(ACTIVE_CATALOGUES_QUERY);
  } catch (error) {
    console.warn('Sanity fetch failed. Falling back to empty state.');
  }

  const activeCatalogues = catalogues && catalogues.length > 0 ? catalogues : [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 pb-24">
      <div className="mb-10 text-left">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-blue-950 mb-4 italic">
          Active Deals
        </h2>
        <div className="h-2 w-24 bg-[#E11D48] mb-6 shadow-[4px_4px_0_0_#2B2B2B]" />
        <p className="text-slate-600 font-bold max-w-xl text-sm md:text-base leading-relaxed">
          Exclusive seasonal savings and flash catalogues. Tap a card to explore current promotions.
        </p>
      </div>

      <div className="space-y-8">
        {activeCatalogues.length > 0 ? (
          activeCatalogues.map((cat: any) => (
            <Link href={`/sales/${cat.slug}`} key={cat.slug} className="block group">
              <div className="relative border-4 border-blue-950 bg-white p-8 md:p-10 transition-all duration-300 shadow-[12px_12px_0_0_#2B2B2B] group-hover:shadow-[16px_16px_0_0_#E11D48] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]">
                {/* PROMO TAG */}
                <div className="absolute top-0 right-0 bg-[#E11D48] text-white px-6 py-2 border-l-4 border-b-4 border-blue-950 font-black italic uppercase text-xs tracking-widest flex items-center gap-2">
                  <Zap size={14} fill="currentColor" /> Live Now
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#E11D48]">
                      <Sparkles size={24} fill="currentColor" />
                      <span className="text-xs font-black uppercase tracking-widest">Premium Promotion</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-blue-950 leading-tight">
                      {cat.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border-2 border-blue-950/10">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-500">
                          Ends {new Date(cat.validTo).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-950/10">
                        <Zap size={16} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase text-blue-600">
                          {cat.itemsCount} Verified Deals
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-950 text-white p-4 rounded-2xl group-hover:bg-[#E11D48] transition-colors self-start md:self-center">
                    <ChevronRight size={32} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="border-4 border-dashed border-slate-200 rounded-[40px] p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Sparkles size={40} />
            </div>
            <h3 className="text-xl font-black uppercase text-slate-400">No active catalogues found</h3>
            <p className="text-xs font-bold text-slate-300 mt-2">Check back soon for new sizzling savings!</p>
          </div>
        )}
      </div>
    </div>
  );
}
