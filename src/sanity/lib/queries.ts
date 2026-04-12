import { groq } from 'next-sanity';

export const CATALOGUE_BY_SLUG_QUERY = groq`
  *[_type == "catalogue" && slug.current == $slug][0]{
    title,
    validFrom,
    validTo,
    "products": products[]->{
      _id,
      name,
      price,
      originalPrice,
      "slug": slug.current,
      aisleLocation,
      nutrition,
      unit,
      stockStatus,
      "category": category->name,
      "image": image.asset->url
    }
  }
`;

export const ACTIVE_CATALOGUES_QUERY = groq`
  *[_type == "catalogue" && validFrom <= now() && validTo >= now()]{
    title,
    "slug": slug.current,
    validFrom,
    validTo,
    "itemsCount": count(products)
  }
`;

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"]{
    _id,
    name,
    price,
    originalPrice,
    "slug": slug.current,
    aisleLocation,
    nutrition,
    unit,
    stockStatus,
    "category": category->name,
    "image": image.asset->url
  }
`;

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"]{
    "slug": slug.current,
    name
  }
`;
