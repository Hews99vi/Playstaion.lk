import { createClient } from '@supabase/supabase-js';
import { Product } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Transform TypeScript camelCase to PostgreSQL snake_case
const toSnakeCase = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  old_price: product.oldPrice,
  image: product.image,
  images: product.images,
  platform: product.platform,
  category: product.category,
  description: product.description,
  stock_status: product.stockStatus,
  rating: product.rating,
  specs: product.specs
});

// Transform PostgreSQL snake_case to TypeScript camelCase
const toCamelCase = (row: any): Product => ({
  id: row.id,
  name: row.name,
  price: row.price,
  oldPrice: row.old_price,
  image: row.image,
  images: row.images,
  platform: row.platform,
  category: row.category,
  description: row.description,
  stockStatus: row.stock_status,
  rating: row.rating,
  specs: row.specs
});

export const supabaseService = {
  // Fetch all products
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(toCamelCase);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Add a new product
  async addProduct(product: Product): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .insert([toSnakeCase(product)]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  },

  // Update a product
  async updateProduct(product: Product): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .update(toSnakeCase(product))
        .eq('id', product.id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  },

  // Delete a product
  async deleteProduct(productId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Seed initial products (run once)
  async seedProducts(products: Product[]): Promise<boolean> {
    try {
      const snakeCaseProducts = products.map(toSnakeCase);
      const { error } = await supabase
        .from('products')
        .insert(snakeCaseProducts);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error seeding products:', error);
      return false;
    }
  },

  // Check if products table is empty
  async isTableEmpty(): Promise<boolean> {
    try {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count === 0;
    } catch (error) {
      console.error('Error checking table:', error);
      return true;
    }
  },

  // Subscribe to real-time changes (sync across all browsers)
  subscribeToProducts(callback: (payload: any) => void) {
    const channel = supabase
      .channel('products-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          // Transform database response to camelCase
          const transformedPayload = {
            ...payload,
            new: payload.new ? toCamelCase(payload.new) : null,
            old: payload.old ? toCamelCase(payload.old) : null
          };
          callback(transformedPayload);
        }
      )
      .subscribe();

    return channel;
  }
};
