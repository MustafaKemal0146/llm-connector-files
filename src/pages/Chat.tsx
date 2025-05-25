import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  id: string;
  messages: Message[];
  provider: string;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChat, setCurrentChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatHistory(data || []);
    } catch (err: any) {
      setError('Sohbet geçmişi yüklenirken bir hata oluştu');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedProvider) return;

    setLoading(true);
    setError('');

    const newMessage: Message = {
      role: 'user',
      content: message
    };

    try {
      // Add message to current chat
      const updatedChat = [...currentChat, newMessage];
      setCurrentChat(updatedChat);
      setMessage('');

      // Save to database
      const { error } = await supabase
        .from('chat_history')
        .insert([
          {
            messages: updatedChat,
            provider: selectedProvider
          }
        ]);

      if (error) throw error;

      // Refresh chat history
      fetchChatHistory();
    } catch (err: any) {
      setError('Mesaj gönderilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Sohbet</h1>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">AI Modeli Seçin...</option>
            <option value="openai">OpenAI</option>
            <option value="google">Google AI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="h-96 overflow-y-auto mb-6 space-y-4 bg-gray-900 p-4 rounded-lg">
          {currentChat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 ml-auto max-w-[80%]'
                  : 'bg-gray-700 mr-auto max-w-[80%]'
              }`}
            >
              <p className="text-white">{msg.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading || !selectedProvider}
          />
          <button
            type="submit"
            disabled={loading || !selectedProvider || !message.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Sohbet Geçmişi</h2>
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{chat.provider}</span>
                <button
                  onClick={() => setCurrentChat(chat.messages)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Yükle
                </button>
              </div>
              <p className="text-gray-400 truncate">
                {chat.messages[chat.messages.length - 1]?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}