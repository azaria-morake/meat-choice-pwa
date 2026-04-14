import { client } from '@/sanity/lib/client';
import { ACTIVE_CATALOGUES_QUERY } from '@/sanity/lib/queries';
import Link from 'next/link';
import { Calendar, ChevronRight, Star } from 'lucide-react';

export const revalidate = 60;

export default async function SalesPage() {
  let catalogues: any = null;
  try {
    catalogues = await client.fetch(ACTIVE_CATALOGUES_QUERY);
  } catch (error) {
    console.warn('Sanity fetch failed (likely using dummy credentials). Falling back to mock data.');
  }
  // Provide mock fallback if sanitiy is completely unseeded
  const activeCatalogues = catalogues?.length > 0 ? catalogues : MOCK_CATALOGUES;

  return (
    <div className="p-6 space-y-4 pb-24">
      <h2 className="text-sm font-black uppercase text-slate-400 mb-2">Available Catalogues</h2>
      {activeCatalogues.map((cat: any) => (
        <Link href={`/sales/${cat.slug}`} key={cat.slug} className="block">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center active:scale-95 transition-all hover:shadow-md cursor-pointer">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#E11D48]">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase">{cat.title}</h3>
                <p className="text-[10px] font-bold text-slate-400">Ends {new Date(cat.validTo).toLocaleDateString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star size={10} className="fill-amber-500" />
                    <span className="text-[10px] font-bold text-slate-600">4.9</span>
                  </div>
                  <span className="text-[10px] text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-slate-400">{cat.itemsCount} Items</span>
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
        </Link>
      ))}
    </div>
  );
}

const MOCK_CATALOGUES = [
  { slug: 'sep-26', title: 'Sizzling September Savings', validTo: '2026-09-30T23:59:00.000Z', itemsCount: 45 },
  { slug: 'aug-26', title: 'Mid-Month Choice Deals', validTo: '2026-08-31T23:59:00.000Z', itemsCount: 32 }
];
