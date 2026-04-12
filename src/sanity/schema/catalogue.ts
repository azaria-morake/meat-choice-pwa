export default {
  name: 'catalogue',
  title: 'Sales Catalogues',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'validFrom', title: 'Valid From', type: 'datetime' },
    { name: 'validTo', title: 'Valid To', type: 'datetime' },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
  ],
};
