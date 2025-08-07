import BlurBackgorund from "../shared/components/BlurBackgorund";
import { useChatStore } from "../../state/chatStore";

const ChatInput = () => {
  const { isClicked, toggleIsClicked } = useChatStore();
  const { message, setMessage } = useChatStore();
  return (
    <div className="flex w-full items-center justify-end mb-5 font-custom text-[1rem]">
      <div className="w-80 [@media(max-width:800px)]:w-full border-2 border-homeBg2/70 rounded-full px-5 py-1.5 mr-5">
        <form className="whitee">
          <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
            className="w-full border-0 border-transparent focus:outline-none focus:ring-0 text-[0.9rem]"
            placeholder="Send me a message"
          ></input>
        </form>
      </div>
      <div>
        {/* SEND BUTTON */}
        <BlurBackgorund
        onClick={() => toggleIsClicked(!isClicked)}
          background="bg-white/0 border-white/30 hover:bg-white/20 transition duration-200 ease-in-out"
          className="w-11 h-11 flex items-center justify-center shadow-white/20 hover:shadow-[0_0_20px_white]"
          roundedClass="rounded-full"
        >
          <img
            src="assets/icons/paper-plane.png"
            className="w-[60%] h-[60%] ml-1 hover-medsos"
          />
        </BlurBackgorund>
      </div>
    </div>
  );
};

export default ChatInput;
