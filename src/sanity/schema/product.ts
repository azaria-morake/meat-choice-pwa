import { TagIcon } from '@sanity/icons';

export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'aisleLocation',
      title: 'Aisle Location',
      type: 'string',
      description: 'e.g., "Aisle 3B: Butchery" or "Aisle 1: Pantry Staples"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Current Price (R)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (R)',
      type: 'number',
      description: 'Leave empty if the item is not on sale.',
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'e.g., "1kg", "410g", "p/kg"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ In Stock', value: 'in_stock' },
          { title: '⚠️ Low Stock', value: 'low_stock' },
          { title: '❌ Out of Stock', value: 'out_of_stock' },
        ],
        layout: 'radio',
      },
      initialValue: 'in_stock',
    },
    {
      name: 'nutrition',
      title: 'Nutrition Facts',
      type: 'object',
      description: 'Data displayed in the Refined Brutalism modal grid.',
      fields: [
        { name: 'servingSize', type: 'string', title: 'Serving Size' },
        { name: 'calories', type: 'number', title: 'Calories' },
        { name: 'totalFat', type: 'string', title: 'Total Fat' },
        { name: 'saturatedFat', type: 'string', title: 'Saturated Fat' },
        { name: 'cholesterol', type: 'string', title: 'Cholesterol' },
        { name: 'sodium', type: 'string', title: 'Sodium' },
        { name: 'totalCarbohydrates', type: 'string', title: 'Total Carbohydrates' },
        { name: 'dietaryFiber', type: 'string', title: 'Dietary Fiber' },
        { name: 'sugars', type: 'string', title: 'Sugars' },
        { name: 'protein', type: 'string', title: 'Protein' },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
