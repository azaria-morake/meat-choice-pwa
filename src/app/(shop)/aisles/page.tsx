import { Suspense } from 'react';
import { client } from '@/sanity/lib/client';
import { AislesClient } from '@/components/modules/aisles/AislesClient';

async function getAislesData() {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "subcategories": *[_type == "subcategory" && category._ref == ^._id] | order(name asc) {
      _id,
      name,
      "slug": slug.current
    }
  }`;
  return await client.fetch(query);
}

export default async function AislesPage() {
  const categories = await getAislesData();
  
  return (
    <Suspense fallback={<div className="p-8 text-center font-black uppercase text-slate-400">Loading Aisles...</div>}>
      <AislesClient categories={categories} />
    </Suspense>
  );
}
