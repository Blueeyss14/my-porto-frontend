import { useEffect, useState } from "react";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import { chatData, mapChatData } from "../../helper/chatData";

const ChatOverlay = () => {
  const chats = mapChatData(chatData);
  const [chatList, setChatList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleIndexes, setVisibleIndexes] = useState(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setChatList((prev) => {
        const nextIndex = prev.length % chats.length;
        return [...prev, chats[nextIndex]];
      });
      setCurrentIndex((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [chats]);

  useEffect(() => {
    if (chatList.length > 0) {
      const latestIndex = chatList.length - 1;
      setTimeout(() => {
        setVisibleIndexes((prev) => new Set(prev).add(latestIndex));
      }, 50);
    }
  }, [chatList]);

  const start = chatList.length > 7 ? chatList.length - 7 : 0;
  const visibleChats = chatList.slice(start);

  return (
    <div className="w-[400px] [@media(max-width:500px)]:w-full flex flex-col">
      {visibleChats.map((chat, i) => {
        const realIndex = start + i;
        return (
          <div key={realIndex}>
            <BlurBackgorund
            background="bg-white/5 border-white/5"
              className={`whitee break-words inline-block border-0 transition-opacity  ${
                realIndex === currentIndex - 1 ? "duration-1000" : "duration-6000"
              }  ${
                realIndex === currentIndex - 2
                  ? "scale-90 [@media(max-width:400px)]:scale-60"
                  : realIndex === currentIndex - 1
                  ? "scale-60"
                  : ""
              } ${
                realIndex < currentIndex - 1
                  ? "opacity-0 scale-70 [@media(max-width:400px)]:scale-30"
                  : visibleIndexes.has(realIndex)
                  ? "opacity-100"
                  : "opacity-0"
              } p-2 font-custom ${realIndex % 2 === 0 ? "m-2 [@media(max-width:800px)]:m:0" : "ml-20"}`}
              roundedClass="rounded-[10px]"
            >
              <h1 className="text-[12px] font-bold">{chat.user}</h1>
              <h1 className="text-[12px] ">{chat.message}</h1>
            </BlurBackgorund>
          </div>
        );
      })}
    </div>
  );
};

export default ChatOverlay;
