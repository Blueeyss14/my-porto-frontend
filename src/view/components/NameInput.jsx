import { useChatStore } from "../../state/chatStore";
import { useState } from "react";

export const NameInput = () => {
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
      setIsLoading(false);
    }
  };

  return <div>
    
  </div>;

  // return (
  //   <form onSubmit={handleSubmit} className="p-4">
  //     <input
  //       type="text"
  //       value={name}
  //       onChange={(e) => setName(e.target.value)}
  //       placeholder="Your name"
  //       className="w-full px-3 py-2 border rounded"
  //       required
  //     />
  //     <button
  //       type="submit"
  //       disabled={isLoading}
  //       className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
  //     >
  //       {isLoading ? 'Sending...' : 'Send'}
  //     </button>
  //   </form>
  // );
};
