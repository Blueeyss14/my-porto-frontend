import { useState } from 'react';
import { useChatStore } from '../../state/chatStore';

export const Chat = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { postChat } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setIsLoading(true);
    try {
      await postChat({ user: name, message });
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-3 p-4 bg-gray-50 rounded-lg shadow-sm mt-5"
    >
      <div className="flex flex-1 gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          isLoading 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};