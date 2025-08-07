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


  postChat: async (name) => {
    if (!name || name.trim() === "") {
      const event = new CustomEvent("show-snackbar", {
        detail: "Name cannot be empty",
      });
      window.dispatchEvent(event);
      return;
    }

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Authorization": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error("Failed to post chat");
      }

      await res.json();
      await get().initChats();

      const event = new CustomEvent("show-snackbar", {
        detail: "Message sent",
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error("Post error:", err);
      const event = new CustomEvent("show-snackbar", {
        detail: "Failed to post chat",
      });
      window.dispatchEvent(event);
    }
  },
}));

