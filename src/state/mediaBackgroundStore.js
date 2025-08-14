import { create } from 'zustand';
import { mapMediaBackground } from '../helper/mapMediaBackground';

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const useMediaBackgroundStore = create((set) => ({
  mediaBackground: [],
  loading: false,
  error: null,

  fetchMediaBackground: async () => {
    set({ loading: true, error: null });
    try {    
      const res = await fetch(`${baseUrl}/mediaBackground`, {
        headers: { Authorization: apiKey },
      });
      
      if (!res.ok) throw new Error(`err status: ${res.status}`);
      
      const data = await res.json();
      console.log('Raw API response:', data);

      const mapped = mapMediaBackground(data.data).map(item => ({
        url: `${baseUrl}/mediaBackground/${encodeURIComponent(item.id)}`,
        mimetype: item.mimetype,
        type: item.mimetype.split('/')[0]
      }));

      set({ mediaBackground: mapped, loading: false });
    } catch (err) {
      console.error('Fetch error:', err);
      set({ error: err.message, mediaBackground: [], loading: false });
    }
  }
}));