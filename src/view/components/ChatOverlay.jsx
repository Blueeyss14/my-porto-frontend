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
          <div key={realIndex}>
            <BlurBackgorund
            background={`bg-white/5 border-white/5 ${realIndex == currentIndex -2 ? "bg-white/10 border-white/10" : ""}`}
              className={`whitee break-words inline-block border-0 transition-opacity  ${
                realIndex === currentIndex - 1 ? "duration-1000" : "duration-8000"
              }  ${
                realIndex === currentIndex - 2
                  ? "scale-90 [@media(max-width:500px)]:scale-70 shadow-white/20 shadow-[0_0_20px_white]"
                  : realIndex === currentIndex - 1
                  ? "scale-70 [@media(max-width:500px)]:scale-60 shadow-white/20 shadow-[0_0_20px_white]"
                  : ""
              } ${
                realIndex < currentIndex - 1
                  ? "opacity-0 scale-60 [@media(max-width:400px)]:scale-50 shadow-white/10 shadow-[0_0_20px_white]"
                  : visibleIndexes.has(realIndex)
                  ? "opacity-100"
                  : "opacity-0"
              } p-2 font-custom ${realIndex % 2 === 0 ? "m-2 [@media(max-width:800px)]:m:0" : "ml-20 [@media(max-width:700px)]:ml-15"}`}
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