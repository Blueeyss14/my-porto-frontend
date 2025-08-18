import { create } from 'zustand';
import { mapCategoryData } from '../helper/mapCategoryData';

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  
  activeIndex: 0,
  setClickedIndex: (index) => set({ activeIndex: index }),

  fetchCategory: async () => {
    set({ loading: true, error: null });
    try {    
      const res = await fetch(`${baseUrl}/categories`, {
        headers: { Authorization: apiKey },
      });
      
      if (!res.ok) throw new Error(`err status: ${res.status}`);
      
      const data = await res.json();

       const mapped = [
        { id: "all", name: "All" },
        ...mapCategoryData(data.data).map(item => ({
            id: item.id,
            name: item.name
        }))
    ];


      set({ categories: mapped, loading: false });
    } catch (err) {
      console.error('Fetch error:', err);
      set({ error: err.message, categories: [], loading: false });
    }
  }
}));