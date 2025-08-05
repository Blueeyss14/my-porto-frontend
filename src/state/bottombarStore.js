import { create } from 'zustand';

const useBottombarStore = create((set) => ({
  activeIndex: 0,
  setClickedIndex: (index) => set({ activeIndex: index }),
}));

export default useBottombarStore;
