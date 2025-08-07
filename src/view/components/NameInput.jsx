import { useChatStore } from "../../state/chatStore";
import { useState } from "react";
import BlurBackgorund from "../shared/components/BlurBackgorund";

export const NameInput = () => {
  const { toggleIsClicked } = useChatStore();
  const { name, setName, message, postChat, setMessage } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsLoading(true);
    try {
      await postChat({ user: name, message });
      setName("");
      setMessage("");
      
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      toggleIsClicked(false)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-end font-custom text-[1rem]">
      <div className="w-full border-2 border-homeBg2/70 rounded-full px-5 py-1.5 mr-5">
        <form className="whitee">
          <input
            // readOnly={isClicked}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full border-0 border-transparent focus:outline-none focus:ring-0 text-[0.9rem]"
            placeholder="Your Name"
          ></input>
        </form>
      </div>
      <div>
        {/* SEND BUTTON */}
        <BlurBackgorund
          onClick={handleSubmit}
          background="bg-white/0 border-white/30 hover:bg-white/20 transition duration-200 ease-in-out"
          className="w-11 h-11 flex items-center justify-center shadow-white/20 hover:shadow-[0_0_20px_white]"
          roundedClass="rounded-full"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <img
              src="assets/icons/paper-plane.png"
              className="w-[60%] h-[60%] ml-1 hover-medsos"
            />
          )}
        </BlurBackgorund>
      </div>
    </div>
  );
};
