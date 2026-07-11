/**
 * Import MSI GPU products from WooCommerce CSV export into local MongoDB.
 * Usage: node scripts/import-msi-gpus.mjs
 */

import { readFileSync } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';

const CSV_PATH  = 'C:\\Users\\heman\\Downloads\\wc-product-export-6-7-2026-1783336899881.csv';
const MONGO_URI = 'mongodb://localhost:27017/rookie-ninja';
const CLOUD     = 'df52xzi3y';

const cf = (url) =>
  `https://res.cloudinary.com/${CLOUD}/image/fetch/f_auto,q_auto/${encodeURI(url)}`;

/* ── CSV parser (handles quoted fields with nested HTML) ── */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuote = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuote) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuote = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuote = true; }
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (ch === '\r') { /* skip */ }
      else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/* ── Strip HTML, extract <li> bullets (short, max 6 words) ── */
function extractBullets(html) {
  if (!html) return [];
  const bullets = [];
  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(html)) !== null) {
    const full = m[1]
      .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '$1')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    if (full.length < 4) continue;

    // Use text before first colon if it exists and is short enough
    const colonIdx = full.indexOf(':');
    let short;
    if (colonIdx > 0 && colonIdx <= 50) {
      short = full.slice(0, colonIdx).trim();
    } else {
      // Take first 6 words
      short = full.split(' ').slice(0, 6).join(' ').replace(/[,;]$/, '');
    }
    if (short.length > 3) bullets.push(short);
  }
  return bullets;
}

/* ── Slug from product name ── */
function toSlug(name) {
  return name
    .replace(/[™®©]/g, '')
    .replace(/™|®|©/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  const text = readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(text);
  if (rows.length < 2) { console.error('CSV is empty'); process.exit(1); }

  const headers = rows[0];
  console.log(`CSV columns: ${headers.length}, data rows: ${rows.length - 1}`);

  // Column indices (0-based)
  const COL_NAME      = 4;
  const COL_SHORT_DESC = 8;
  const COL_IMAGES    = 30;

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to local MongoDB');

  const db       = client.db('rookie-ninja');
  const brandsCol  = db.collection('brands');
  const productsCol = db.collection('products');

  const msiBrand = await brandsCol.findOne({ slug: 'msi' });
  if (!msiBrand) {
    console.error('MSI brand not found in local DB. Add it first via the admin panel.');
    await client.close();
    process.exit(1);
  }
  console.log(`Found MSI brand: ${msiBrand._id}`);

  let inserted = 0, updated = 0, skipped = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[COL_NAME] || '').trim();
    if (!name) { skipped++; continue; }

    const bullets   = extractBullets(row[COL_SHORT_DESC]);
    const imagesRaw = (row[COL_IMAGES] || '').split(',').map(u => u.trim()).filter(Boolean);
    const images    = imagesRaw.slice(0, 4).map(cf);

    const slug = toSlug(name);

    const doc = {
      brand:            msiBrand._id,
      brandSlug:        'msi',
      name,
      slug,
      sku:              '',
      images,
      shortDescription: bullets.join('\n'),
      description:      '',
      category:         'Graphics Cards',
      specs:            [],
      tags:             [],
    };

    const res = await productsCol.updateOne(
      { brandSlug: 'msi', slug },
      { $set: doc },
      { upsert: true }
    );

    if (res.upsertedCount) { inserted++; console.log(`  + ${name}`); }
    else                   { updated++;  console.log(`  ~ ${name}`); }
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated, ${skipped} skipped`);
  await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
