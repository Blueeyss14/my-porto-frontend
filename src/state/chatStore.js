import { create } from 'zustand';
import { chatData, mapChatData } from "../helper/chatData";

const chats = mapChatData(chatData);

export const useChatStore = create((set, get) => ({
  chatList: [],
  currentIndex: 0,
  visibleIndexes: new Set(),

  addNextChat: () => {
    const { chatList } = get();
    const nextIndex = chatList.length % chats.length;
    set((state) => ({
      chatList: [...state.chatList, chats[nextIndex]],
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
