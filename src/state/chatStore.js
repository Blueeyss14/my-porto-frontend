import { create } from 'zustand';
import { mapChatData } from "../helper/chatData";

// const chats = mapChatData(chatData);
// VITE_BASE_URL=http://localhost:3000
// VITE_API_KEY=sdhfjksdfhsdkfh1k3GdfnIijdwfklwflkeflkgjlkj%skm@msods1mfsdGzw$klhjk

const fetchChatsFromServer = async () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const res = await fetch(`${baseUrl}/messages`, {
      headers: { 'Authorization': apiKey },
    });
    const data = await res.json();
    return mapChatData(data.data);
    
  } catch (err) {
    console.error('Fetch error:', err);
    return []; 
  }
};

export const useChatStore = create((set, get) => ({
  chatList: [],
  originalChats: [],
  currentIndex: 0,
  visibleIndexes: new Set(),

   initChats: async () => {
    const chats = await fetchChatsFromServer();
    set({ originalChats: chats, chatList: [], currentIndex: 0 });
  },

  addNextChat: () => {
    const { chatList, originalChats } = get();
    if (originalChats.length === 0) return;
    const nextIndex = chatList.length % originalChats.length;
    set((state) => ({
      chatList: [...state.chatList, originalChats[nextIndex]],
      currentIndex: state.currentIndex + 1,
    }));
  },

  revealLatestChat: () => {
    const { chatList, visibleIndexes } = get();
    const latestIndex = chatList.length - 1;
    if (latestIndex >= 0) {
      const newSet = new Set(visibleIndexes);
      newSet.add(latestIndex);
      set({ visibleIndexes: newSet });
    }
  },
}));
