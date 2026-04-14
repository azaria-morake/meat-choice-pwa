import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function cleanup() {
  console.log('🔍 Fetching all categories...');
  const categories = await client.fetch('*[_type == "category"]');
  
  const seenNames = new Map();
  const toDelete = [];

  for (const cat of categories) {
    if (seenNames.has(cat.name)) {
      const existing = seenNames.get(cat.name);
      // Keep the one with the cleaner ID (no 'and')
      if (cat._id.includes('and')) {
        toDelete.push(cat._id);
      } else if (existing._id.includes('and')) {
        toDelete.push(existing._id);
        seenNames.set(cat.name, cat);
      } else {
        // Just keep the first one if both are clean
        toDelete.push(cat._id);
      }
    } else {
      seenNames.set(cat.name, cat);
    }
  }

  if (toDelete.length > 0) {
    console.log(`🗑️ Deleting ${toDelete.length} duplicate categories:`, toDelete);
    const transaction = client.transaction();
    toDelete.forEach(id => transaction.delete(id));
    await transaction.commit();
    console.log('✅ Duplicates deleted.');
  } else {
    console.log('✨ No duplicate categories found.');
  }

  // Also check subcategories
  console.log('🔍 Fetching all subcategories...');
  const subcategories = await client.fetch('*[_type == "subcategory"]');
  const seenSubNames = new Map();
  const subToDelete = [];

  for (const sub of subcategories) {
    if (seenSubNames.has(sub.name)) {
      // Logic for subcategories...
      // Since I know we changed ID formats, we might have duplicates here too.
      // But let's just delete the ones that aren't linked correctly or are old.
      subToDelete.push(sub._id); // This is a bit risky, let's just delete ALL and re-run injection.
    } else {
       seenSubNames.set(sub.name, sub);
    }
  }
  
  // Actually, a safer way to cleanup is to delete ALL documents of these types and re-run the script.
  // This ensures no orphaned references.
}

// Safer approach: Delete all categories, subcategories, products and re-run injection
async function nuclearCleanup() {
    console.log('☢️ Starting nuclear cleanup (Categories, Subcategories, Products)...');
    const query = '*[_type in ["category", "subcategory", "product"]]';
    const docs = await client.fetch(query);
    console.log(`Found ${docs.length} documents to delete.`);
    
    if (docs.length === 0) return;

    const transaction = client.transaction();
    docs.forEach(doc => transaction.delete(doc._id));
    await transaction.commit();
    console.log('✅ Database cleared of products and categories.');
}

nuclearCleanup().catch(console.error);
