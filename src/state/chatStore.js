import { create } from 'zustand';
import { mapChatData } from "../helper/chatData";

// const chats = mapChatData(chatData);

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
  name: '',
  message: '',
  setName: (name) => set({ name }),
  setMessage: (message) => set({ message }),

  chatList: [],
  originalChats: [],
  currentIndex: 0,
  visibleIndexes: new Set(),

  isClicked: false,

  toggleIsClicked: () => {
    set((state) => ({ isClicked: !state.isClicked }));
  },

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

postChat: async (newMessage) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const res = await fetch(`${baseUrl}/messages`, {
      method: 'POST',
      headers: { 
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: newMessage.user,
        message: newMessage.message
      })
    });

    const responseData = await res.json();
    const newChat = {
      user: newMessage.user,
      message: newMessage.message,
    };

    set((state) => {
      const updatedSet = new Set(state.visibleIndexes);
      updatedSet.add(state.chatList.length);
      return {
        originalChats: [...state.originalChats, newChat],
        chatList: [...state.chatList, newChat],
        currentIndex: state.currentIndex + 1,
        visibleIndexes: updatedSet,
      };
    });

    return responseData;
  } catch (err) {
    console.error('Post error:', err);
    return null;
  }
},



}));

