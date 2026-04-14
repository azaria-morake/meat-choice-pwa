import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

// Simple .env.local loader
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;
      
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnv();

const token = process.env.SANITY_API_TOKEN;

// Validation
if (token && !token.startsWith('sk')) {
  console.warn('⚠️  Warning: SANITY_API_TOKEN does not start with "sk". mutations will likely fail.');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: token,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const data = [
  {
    category: 'Meat & Poultry',
    subcategories: [
      {
        name: 'Chicken',
        products: [
          { name: 'Rainbow Chicken Breasts', price: 89.99, unit: '1kg', aisle: 'Aisle 4: Poultry' },
          { name: 'Goldi Whole Chicken', price: 65.50, unit: '1.2kg', aisle: 'Aisle 4: Poultry' },
          { name: 'County Fair Wings', price: 45.99, unit: '500g', aisle: 'Aisle 4: Poultry' },
          { name: 'Fresh Chicken Drumsticks', price: 55.00, unit: '800g', aisle: 'Aisle 4: Poultry' },
          { name: 'Chicken Thighs Bulk Pack', price: 120.00, unit: '2kg', aisle: 'Aisle 4: Poultry' },
          { name: 'Marinated Spatchcock Chicken', price: 85.00, unit: 'per unit', aisle: 'Aisle 4: Poultry' },
          { name: 'Chicken Gizzards', price: 25.00, unit: '500g', aisle: 'Aisle 4: Poultry' },
          { name: 'Crumbed Chicken Schnitzel', price: 75.00, unit: '400g', aisle: 'Aisle 4: Poultry' },
          { name: 'Chicken Mince', price: 60.00, unit: '500g', aisle: 'Aisle 4: Poultry' },
          { name: 'Smoked Chicken Fillets', price: 95.00, unit: '300g', aisle: 'Aisle 4: Poultry' },
        ],
      },
      {
        name: 'Beef',
        products: [
          { name: 'Karan Beef Mince', price: 110.00, unit: '1kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Spartan Beef T-Bone', price: 145.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Chuck', price: 95.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Rump Steak', price: 185.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Brisket', price: 105.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Short Rib', price: 125.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Lean Beef Mince', price: 130.00, unit: '1kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Stir-Fry Strips', price: 85.00, unit: '500g', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Stewing Meat', price: 89.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
          { name: 'Beef Fillet Steak', price: 240.00, unit: 'p/kg', aisle: 'Aisle 1: Butchery' },
        ],
      },
    ],
  },
  {
    category: 'Dairy & Eggs',
    subcategories: [
      {
        name: 'Milk',
        products: [
          { name: 'Clover Full Cream Milk', price: 18.99, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Fairview Fresh Milk', price: 17.50, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Clover Low Fat Milk', price: 18.99, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Fairview Organic Milk', price: 24.00, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Firsti Long Life Milk', price: 16.50, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Almond Breeze Unsweetened', price: 45.00, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'MilkLab Oat Milk', price: 55.00, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Clover 2L Full Cream', price: 34.00, unit: '2L', aisle: 'Fridge 2: Dairy' },
          { name: 'Ultra Mel Custard', price: 29.00, unit: '1L', aisle: 'Fridge 2: Dairy' },
          { name: 'Sterie Stumpie Chocolate', price: 14.00, unit: '350ml', aisle: 'Fridge 2: Dairy' },
        ],
      },
      {
        name: 'Eggs',
        products: [
          { name: 'Nulaid Large Eggs', price: 42.00, unit: '18s', aisle: 'Aisle 5: Baking' },
          { name: 'Nulaid Jumbo Eggs', price: 48.00, unit: '18s', aisle: 'Aisle 5: Baking' },
          { name: 'Free Range Large Eggs', price: 55.00, unit: '12s', aisle: 'Aisle 5: Baking' },
          { name: 'Mixed Grain Eggs', price: 38.00, unit: '12s', aisle: 'Aisle 5: Baking' },
          { name: 'Nulaid 30-Pack Eggs', price: 75.00, unit: '30s', aisle: 'Aisle 5: Baking' },
          { name: 'Liquid Egg Whites', price: 45.00, unit: '500ml', aisle: 'Aisle 5: Baking' },
          { name: 'Quail Eggs Specialty', price: 35.00, unit: '12s', aisle: 'Aisle 5: Baking' },
          { name: 'Enriched Omega Eggs', price: 62.00, unit: '18s', aisle: 'Aisle 5: Baking' },
          { name: 'Barn Eggs Extra Large', price: 44.00, unit: '12s', aisle: 'Aisle 5: Baking' },
          { name: 'Nulaid Medium Eggs', price: 58.00, unit: '30s', aisle: 'Aisle 5: Baking' },
        ],
      },
    ],
  },
  {
    category: 'Deli & Fresh',
    subcategories: [
      {
        name: 'Cold Meats',
        products: [
          { name: 'Enterprise Polony', price: 35.00, unit: '500g', aisle: 'Deli Counter' },
          { name: 'Eskort Smoked Viennas', price: 42.00, unit: '500g', aisle: 'Deli Counter' },
          { name: 'Honey Glazed Gammon', price: 85.00, unit: '250g', aisle: 'Deli Counter' },
          { name: 'Pastrami Shaved Beef', price: 65.00, unit: '200g', aisle: 'Deli Counter' },
          { name: 'Hickory Ham', price: 55.00, unit: '200g', aisle: 'Deli Counter' },
          { name: 'Salami Milano', price: 75.00, unit: '150g', aisle: 'Deli Counter' },
          { name: 'Roast Chicken Slices', price: 48.00, unit: '200g', aisle: 'Deli Counter' },
          { name: 'Corned Beef Slices', price: 52.00, unit: '200g', aisle: 'Deli Counter' },
          { name: 'Turkey Breast Smoked', price: 70.00, unit: '200g', aisle: 'Deli Counter' },
          { name: 'Chorizo Sliced', price: 80.00, unit: '150g', aisle: 'Deli Counter' },
        ],
      },
      {
        name: 'Prepared Salads',
        products: [
          { name: 'Creamy Potato Salad', price: 35.00, unit: '400g', aisle: 'Deli Fridge' },
          { name: 'Greek Salad with Feta', price: 45.00, unit: '350g', aisle: 'Deli Fridge' },
          { name: 'Coleslaw with Mayo', price: 30.00, unit: '400g', aisle: 'Deli Fridge' },
          { name: 'Three Bean Salad', price: 32.00, unit: '400g', aisle: 'Deli Fridge' },
          { name: 'Pasta Salad Italian', price: 38.00, unit: '400g', aisle: 'Deli Fridge' },
          { name: 'Couscous & Roasted Veg', price: 42.00, unit: '350g', aisle: 'Deli Fridge' },
          { name: 'Beetroot & Onion Salad', price: 28.00, unit: '400g', aisle: 'Deli Fridge' },
          { name: 'Garden Salad Bowl', price: 40.00, unit: '250g', aisle: 'Deli Fridge' },
          { name: 'Chicken Mayo Salad', price: 55.00, unit: '300g', aisle: 'Deli Fridge' },
          { name: 'Quinoa & Kale Salad', price: 60.00, unit: '300g', aisle: 'Deli Fridge' },
        ],
      },
    ],
  },
  {
    category: 'Household & Cleaning',
    subcategories: [
      {
        name: 'Laundry',
        products: [
          { name: 'Omo Auto Liquid', price: 145.00, unit: '2L', aisle: 'Aisle 8: Household' },
          { name: 'Ariel Washing Powder', price: 120.00, unit: '2kg', aisle: 'Aisle 8: Household' },
          { name: 'Comfort Fabric Softener', price: 65.00, unit: '800ml', aisle: 'Aisle 8: Household' },
          { name: 'Sta-soft Refill', price: 55.00, unit: '500ml', aisle: 'Aisle 8: Household' },
          { name: 'Vanish Stain Remover', price: 85.00, unit: '1kg', aisle: 'Aisle 8: Household' },
          { name: 'Skip Intelligent Flakes', price: 110.00, unit: '1kg', aisle: 'Aisle 8: Household' },
          { name: 'Sunlight Laundry Soap', price: 15.00, unit: '500g', aisle: 'Aisle 8: Household' },
          { name: 'Bio-Classic Capsules', price: 95.00, unit: '20s', aisle: 'Aisle 8: Household' },
          { name: 'Woolite Delicates', price: 75.00, unit: '750ml', aisle: 'Aisle 8: Household' },
          { name: 'Ironing Water Lavender', price: 25.00, unit: '1L', aisle: 'Aisle 8: Household' },
        ],
      },
      {
        name: 'Dishwashing',
        products: [
          { name: 'Sunlight Dish Liquid', price: 32.00, unit: '750ml', aisle: 'Aisle 8: Household' },
          { name: 'Finish Powerball Tablets', price: 185.00, unit: '50s', aisle: 'Aisle 8: Household' },
          { name: 'Morning Fresh Liquid', price: 28.00, unit: '400ml', aisle: 'Aisle 8: Household' },
          { name: 'Sunlight Lemon Refill', price: 24.00, unit: '500ml', aisle: 'Aisle 8: Household' },
          { name: 'Finish Rinse Aid', price: 65.00, unit: '400ml', aisle: 'Aisle 8: Household' },
          { name: 'Dishwasher Salt', price: 35.00, unit: '2kg', aisle: 'Aisle 8: Household' },
          { name: 'Steel Wool Pads', price: 18.00, unit: '5s', aisle: 'Aisle 8: Household' },
          { name: 'Kitchen Sponge 3-Pack', price: 22.00, unit: '3s', aisle: 'Aisle 8: Household' },
          { name: 'Gloves Medium Rubber', price: 30.00, unit: 'pair', aisle: 'Aisle 8: Household' },
          { name: 'Drain Unclocker Gel', price: 75.00, unit: '1L', aisle: 'Aisle 8: Household' },
        ],
      },
    ],
  },
];

function getNutrition(name, subcategory) {
  const isCleaning = ['Laundry', 'Dishwashing'].includes(subcategory);
  if (isCleaning) return null;

  // Realistic-ish defaults based on category
  const nutrition = {
    servingSize: '100g',
    calories: 150,
    totalFat: '8g',
    saturatedFat: '3g',
    cholesterol: '45mg',
    sodium: '120mg',
    totalCarbohydrates: '1g',
    dietaryFiber: '0g',
    sugars: '0g',
    protein: '20g'
  };

  const nameLower = name.toLowerCase();

  if (subcategory === 'Chicken') {
    nutrition.calories = 165;
    nutrition.protein = '31g';
    nutrition.totalFat = '3.6g';
    nutrition.saturatedFat = '1g';
  } else if (subcategory === 'Beef') {
    nutrition.calories = 250;
    nutrition.protein = '26g';
    nutrition.totalFat = '15g';
    nutrition.saturatedFat = '6g';
  } else if (subcategory === 'Milk') {
    nutrition.servingSize = '250ml';
    nutrition.calories = 146;
    nutrition.protein = '8g';
    nutrition.totalFat = '8g';
    nutrition.saturatedFat = '5g';
    nutrition.totalCarbohydrates = '12g';
    nutrition.sugars = '12g';
  } else if (subcategory === 'Eggs') {
    nutrition.servingSize = '1 large egg (50g)';
    nutrition.calories = 72;
    nutrition.protein = '6g';
    nutrition.totalFat = '5g';
    nutrition.saturatedFat = '1.6g';
    nutrition.cholesterol = '186mg';
  } else if (subcategory === 'Cold Meats') {
    nutrition.calories = 110;
    nutrition.protein = '12g';
    nutrition.totalFat = '6g';
    nutrition.sodium = '800mg'; // High sodium for processed meats
  } else if (subcategory === 'Prepared Salads') {
    nutrition.calories = 120;
    nutrition.protein = '2g';
    nutrition.totalCarbohydrates = '15g';
    nutrition.dietaryFiber = '2g';
    nutrition.sugars = '4g';
    if (nameLower.includes('potato')) nutrition.calories = 180;
    if (nameLower.includes('chicken')) nutrition.protein = '15g';
  }

  return nutrition;
}

async function inject() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is missing in .env.local');
    return;
  }

  console.log('🚀 Starting data injection...');

  for (const cat of data) {
    const catSlug = cat.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const categoryDoc = {
      _type: 'category',
      name: cat.category,
      slug: { _type: 'slug', current: catSlug },
    };

    console.log(`📂 Creating Category: ${cat.category}`);
    const createdCategory = await client.createOrReplace({
      _id: `cat-${catSlug}`,
      ...categoryDoc,
    });

    for (const sub of cat.subcategories) {
      const subSlug = sub.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const subcategoryDoc = {
        _type: 'subcategory',
        name: sub.name,
        slug: { _type: 'slug', current: subSlug },
        category: {
          _type: 'reference',
          _ref: createdCategory._id,
        },
      };

      console.log(`  └─ Creating Sub-category: ${sub.name}`);
      const createdSubcategory = await client.createOrReplace({
        _id: `sub-${subSlug}`,
        ...subcategoryDoc,
      });

      for (const prod of sub.products) {
        const prodSlug = prod.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const productDoc = {
          _type: 'product',
          name: prod.name,
          slug: { _type: 'slug', current: prodSlug },
          subcategory: {
            _type: 'reference',
            _ref: createdSubcategory._id,
          },
          price: prod.price,
          originalPrice: prod.originalPrice || null,
          unit: prod.unit,
          aisleLocation: prod.aisle,
          stockStatus: 'in_stock',
          nutrition: getNutrition(prod.name, sub.name),
        };

        console.log(`    ├── Creating Product: ${prod.name}`);
        await client.createOrReplace({
          _id: `prod-${prodSlug}`,
          ...productDoc,
        });
      }
    }
  }

  console.log('✅ Injection complete!');
}

inject().catch(console.error);
