import { client } from '@/sanity/lib/client';
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/sanity/lib/queries';
import { HomeClient } from './HomeClient';

export const revalidate = 60;

export default async function HomePage() {
  let products = null;
  let categories = null;
  
  try {
    products = await client.fetch(ALL_PRODUCTS_QUERY);
    categories = await client.fetch(ALL_CATEGORIES_QUERY);
  } catch (error) {
    console.warn('Sanity fetch failed (likely using dummy credentials). Falling back to mock data.');
  }
  
  // If the sanity database is completely empty (or fetch failed), provide mock array
  const isSanityEmpty = !products || products.length === 0;

  return (
    <HomeClient 
      initialProducts={isSanityEmpty ? MOCK_PRODUCTS : products} 
      initialCategories={isSanityEmpty ? MOCK_CATEGORIES : categories} 
    />
  );
}

const MOCK_CATEGORIES = [
  { name: 'Meat', slug: 'meat' },
  { name: 'Deli', slug: 'deli' },
  { name: 'Pantry', slug: 'pantry' },
  { name: 'Household', slug: 'household' },
];

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Deli Goudveld Wors', category: 'Meat', price: 79.99, originalPrice: 89.99, unit: 'p/kg', stockStatus: 'in_stock', aisleLocation: 'Aisle 3B' },
  { _id: '2', name: 'Papa Super Maize', category: 'Pantry', price: 109.99, originalPrice: null, unit: '12.5kg', stockStatus: 'in_stock', aisleLocation: 'Aisle 1A' },
  { _id: '3', name: 'Lucky Star Pilchards', category: 'Pantry', price: 25.00, originalPrice: 32.50, unit: '410g', stockStatus: 'low_stock', aisleLocation: 'Aisle 2C' },
  { _id: '4', name: 'Real Tea Tagless', category: 'Pantry', price: 29.99, originalPrice: 39.99, unit: '100s', stockStatus: 'in_stock', aisleLocation: 'Aisle 3A' },
  { _id: '5', name: 'Bulk Pork Pack', category: 'Meat', price: 99.99, originalPrice: 120.00, unit: '2kg', stockStatus: 'in_stock', aisleLocation: 'Aisle 3B' },
  { _id: '6', name: 'Sunshine Brown Sugar', category: 'Pantry', price: 39.99, originalPrice: null, unit: '2kg', stockStatus: 'in_stock', aisleLocation: 'Aisle 1B' },
];
