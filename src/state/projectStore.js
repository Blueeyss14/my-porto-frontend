import { create } from 'zustand';
import { mapProjects } from '../helper/projectData';

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProject: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseUrl}/projects`, {
        headers: { Authorization: apiKey },
      });

      if (!res.ok) throw new Error(`err status: ${res.status}`);

      const data = await res.json();

      const mapped = mapProjects(data.data).map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        category: item.category,
        is_pinned: item.is_pinned,
         image_url: item.image_url.map((img, index) => `${baseUrl}/projects/project/${item.id}/image/${index}`),
        tags: Array.isArray(item.tags) ? item.tags : JSON.parse(item.tags || '[]'),
        thumbnail: `${baseUrl}/projects/project/${item.id}/thumbnail`,
        contributing: Array.isArray(item.contributing) ? item.contributing : JSON.parse(item.contributing || '[]'),
        resources: Array.isArray(item.resources) ? item.resources : JSON.parse(item.resources || '[]'),
    }));

      set({ projects: mapped, loading: false });
    } catch (err) {
      console.error('Fetch error:', err);
      set({ error: err.message, loading: false });
    }
  }
}));
