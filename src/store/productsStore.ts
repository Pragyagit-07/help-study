// store/productsStore.ts
import { create } from "zustand";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  rating?: number;
}

interface StoreState {
  products: Product[];
  total: number;
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchProductsByCategory: (category: string, limit: number, skip: number) => Promise<void>;
}

export const useProductsStore = create<StoreState>((set) => ({
  products: [],
  total: 0,

  fetchProducts: async (limit, skip) => {
    try {
      const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      set({ products: res.data.products, total: res.data.total });
    } catch (err) {
      console.error("fetchProducts error", err);
      set({ products: [], total: 0 });
    }
  },

  searchProducts: async (query) => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
      set({ products: res.data.products, total: res.data.total });
    } catch (err) {
      console.error("searchProducts error", err);
      set({ products: [], total: 0 });
    }
  },

  fetchProductsByCategory: async (category, limit, skip) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
      );
      set({ products: res.data.products, total: res.data.total });
    } catch (err) {
      console.error("fetchProductsByCategory error", err);
      set({ products: [], total: 0 });
    }
  },
}));
