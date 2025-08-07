import { useEffect } from "react";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import { useChatStore } from "../../state/chatStore";

const ChatOverlay = () => {
  const { chatList, currentIndex, visibleIndexes, addNextChat, revealLatestChat, initChats } = useChatStore();

   useEffect(() => {
    initChats();
  }, [initChats]);

  useEffect(() => {
    const interval = setInterval(() => {
      addNextChat();
    }, 1500);
    return () => clearInterval(interval);
  }, [addNextChat]);

  useEffect(() => {
    if (chatList.length > 0) {
      setTimeout(() => {
        revealLatestChat();
      }, 50);
    }
  }, [chatList, revealLatestChat]);

  

  const start = chatList.length > 7 ? chatList.length - 7 : 0;
  const visibleChats = chatList.slice(start);

  return  (
    <div className="w-[400px] [@media(max-width:500px)]:w-full flex flex-col">
      {visibleChats.map((chat, i) => {
        const realIndex = start + i;
        return (
          <div key={realIndex}
          className={` flex w-full h-full ${realIndex !== currentIndex -1 && realIndex % 2 === 1 ? "justify-end" : `$`} ${realIndex !== currentIndex -1 ? "scale-80 origin-right [@media(max-width:800px)]:scale-70" : ""}`}
          >
            <BlurBackgorund
            background={` bg-white/5 border-white/5 ${realIndex === currentIndex -1 ? "bg-white/5 border-white/5" : 'bg-white/20 border-white/20'}`}
              className={` p-1.5 whitee break-words inline-block border-0 transition-opacity w-fit min-w-[100px] max-w-[300px]
                ${
                realIndex === currentIndex - 1 ? "animate-float shadow-white/30 shadow-[0_0_20px_white]" : "duration-4000 shadow-white/25 shadow-[0_0_20px_white]"
              } 
              ${
                realIndex < currentIndex - 2
                  ? "opacity-0"
                  : visibleIndexes.has(realIndex)
                  ? "opacity-100"
                  : "opacity-0"
              }
              `}
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