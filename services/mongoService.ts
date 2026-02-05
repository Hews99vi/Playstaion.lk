import { Product } from '../types';

const API_URL = import.meta.env.VITE_MONGODB_DATA_API_URL;
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY;
const DATABASE = import.meta.env.VITE_MONGODB_DATABASE;
const COLLECTION = import.meta.env.VITE_MONGODB_COLLECTION;

const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
};

export const mongoService = {
  // Fetch all products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/action/find`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dataSource: 'Cluster0', // Default cluster name, update if different
          database: DATABASE,
          collection: COLLECTION,
          filter: {},
        }),
      });
      
      const data = await response.json();
      return data.documents || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Add a new product
  async addProduct(product: Product): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/action/insertOne`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: DATABASE,
          collection: COLLECTION,
          document: product,
        }),
      });
      
      const data = await response.json();
      return !!data.insertedId;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  },

  // Update a product
  async updateProduct(product: Product): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/action/updateOne`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: DATABASE,
          collection: COLLECTION,
          filter: { id: product.id },
          update: { $set: product },
        }),
      });
      
      const data = await response.json();
      return data.modifiedCount > 0 || data.matchedCount > 0;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  },

  // Delete a product
  async deleteProduct(productId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/action/deleteOne`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: DATABASE,
          collection: COLLECTION,
          filter: { id: productId },
        }),
      });
      
      const data = await response.json();
      return data.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Seed initial products (run once)
  async seedProducts(products: Product[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/action/insertMany`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: DATABASE,
          collection: COLLECTION,
          documents: products,
        }),
      });
      
      const data = await response.json();
      return !!data.insertedIds;
    } catch (error) {
      console.error('Error seeding products:', error);
      return false;
    }
  },
};
