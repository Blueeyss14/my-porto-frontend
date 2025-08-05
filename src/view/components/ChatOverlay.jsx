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

  return (
    <div>
      {chatList.map((chat, i) => (
        <div key={i}>
          <BlurBackgorund
            className={`border-0 w-fit transition-opacity  ${
              i === currentIndex - 1 ? "duration-1000" : "duration-5000"
            }  ${
              i === currentIndex - 2
                ? "scale-100"
                : i === currentIndex - 1
                ? "scale-80"
                : ""
            } ${
              i < currentIndex - 1
                ? "opacity-0 transform scale-80"
                : visibleIndexes.has(i)
                ? "opacity-100"
                : "opacity-0"
            } m-2 p-2 font-custom ${i % 2 === 0 ? "p-2 m-3" : "ml-20"}`}
            roundedClass="rounded-[10px]"
          >
            <h1>{chat.message}</h1>
          </BlurBackgorund>
        </div>
      ))}
    </div>
  );
};

export default ChatOverlay;
