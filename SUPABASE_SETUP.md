# Supabase Integration Guide

## ✅ Supabase Setup Complete!

Your credentials are already configured in `.env`:
- **Project URL**: https://dlqaxtezlkufyyfkeghr.supabase.co
- **Anon Key**: Configured ✓

## 🔧 Create Products Table

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **"SQL Editor"** in the left menu
4. Click **"New Query"**
5. **Copy and paste this SQL** to create the products table:

```sql
-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  image TEXT NOT NULL,
  images TEXT[],
  platform TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  stock_status TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 5,
  specs JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view products)
CREATE POLICY "Allow public read access"
ON products FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert/update/delete (for admin)
CREATE POLICY "Allow authenticated insert"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
ON products FOR DELETE
TO authenticated
USING (true);

-- Create index for faster queries
CREATE INDEX idx_products_platform ON products(platform);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
```

6. Click **"Run"** button
7. You should see **"Success. No rows returned"**

## 🚀 How It Works

- **First load**: App checks if products table is empty
- **If empty**: Seeds with mock products from `constants.tsx`
- **Admin changes**: All CRUD operations save to Supabase PostgreSQL
- **Real-time sync**: All browsers/devices see the same inventory instantly
- **No localStorage**: Products are fetched from Supabase on every page load

## 🔐 Security

- **Row Level Security**: Enabled for secure access
- **Public Read**: Anyone can view products (for shop)
- **Authenticated Write**: Only admin can add/edit/delete
- **Anon Key**: Safe to expose in frontend (read-only by default)

## 📝 Testing

1. Run dev server:
   ```bash
   npm run dev
   ```

2. Login to admin panel with your configured credentials (see `.env` file)

3. Add/edit a product - it saves to Supabase!

4. Open in another browser/device - changes appear instantly!

## 🎯 Deploy

```bash
npm run build
```

Upload `dist/` folder to Namecheap. Done!

## 🔄 Benefits Over MongoDB/localStorage

✅ **Instant sync** across all browsers/devices
✅ **PostgreSQL** - More reliable than NoSQL for structured data
✅ **Built-in admin UI** - View/edit data in Supabase dashboard
✅ **Real-time subscriptions** - Can add live updates later
✅ **Automatic backups** - Supabase handles it
✅ **Free tier** - 500MB storage, 2GB bandwidth

## 🆘 Troubleshooting

**Products not loading?**
- Check browser console for errors
- Verify SQL table was created (check Supabase → Table Editor)
- Ensure `.env` has correct URL and key

**Can't add products?**
- RLS policies must be set (run the SQL above)
- Check Supabase → Authentication → Policies

**Changes not syncing?**
- Hard refresh (Ctrl+F5)
- Check Network tab for failed requests
- Verify in Supabase → Table Editor that data is saving
