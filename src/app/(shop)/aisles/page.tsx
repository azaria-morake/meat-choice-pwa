import { client } from '@/sanity/lib/client';
import { AislesClient } from './AislesClient';

async function getAislesData() {
  const query = `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "subcategories": *[_type == "subcategory" && category._ref == ^._id] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "productCount": count(*[_type == "product" && subcategory._ref == ^._id])
    }
  }`;
  
  return await client.fetch(query);
}

export default async function AislesPage() {
  const categories = await getAislesData();
  
  return <AislesClient categories={categories} />;
}
