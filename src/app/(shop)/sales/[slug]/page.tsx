import { client } from '@/sanity/lib/client';
import { CATALOGUE_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { SalesSlugClient } from './SalesSlugClient';

export const revalidate = 60;

export default async function CatalogueDetailPage({ params }: { params: { slug: string } }) {
  let catalogue: any = null;
  try {
    catalogue = await client.fetch(CATALOGUE_BY_SLUG_QUERY, { slug: params.slug });
  } catch (error) {
    console.warn('Sanity fetch failed (likely using dummy credentials). Falling back to mock data.');
  }
  
  if (!catalogue) {
    // If not found in Sanity and using Mock Data, generate a mock catalogue for demonstration
    if (params.slug === 'sep-26' || params.slug === 'aug-26') {
      const MOCK = {
        title: params.slug === 'sep-26' ? 'Sizzling September Savings' : 'Mid-Month Choice Deals',
        validTo: '2026-04-12T23:59:00.000Z', // Make it expire in 1 day for demo
        products: [
          { _id: '1', name: 'Deli Goudveld Wors', category: 'Meat', price: 79.99, originalPrice: 89.99, unit: 'p/kg', stockStatus: 'in_stock', aisleLocation: 'Aisle 3B' },
          { _id: '3', name: 'Lucky Star Pilchards', category: 'Pantry', price: 25.00, originalPrice: 32.50, unit: '410g', stockStatus: 'low_stock', aisleLocation: 'Aisle 2C' }
        ]
      };
      return <SalesSlugClient catalogue={MOCK} />;
    }
    
    return (
      <div className="p-8 text-center text-slate-500 font-bold uppercase mt-12">
        Catalogue not found or has expired.
      </div>
    );
  }

  return <SalesSlugClient catalogue={catalogue} />;
}
