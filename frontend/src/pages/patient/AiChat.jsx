import { useState, useRef, useEffect } from 'react';
import { aiService } from '../../services/aiService';

export default function AiChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your MedVault AI Assistant. How can I help you understand your medical data today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiService.chat(userText);
      if (res.success) {
        setMessages(prev => [...prev, { role: 'ai', text: res.data }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered a network error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: 'Hello! I am your MedVault AI Assistant. How can I help you understand your medical data today?' }]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gemini AI Chat</h1>
        <button onClick={clearChat} className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
          Clear Chat
        </button>
      </div>

      <div className="flex-grow bg-white rounded-t-lg shadow-sm border border-gray-200 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-4 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
              <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
              {msg.role === 'ai' && (
                <button onClick={() => copyToClipboard(msg.text)} className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline">
                  Copy Response
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4 rounded-bl-none flex space-x-2 items-center h-10">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 rounded-b-lg border border-t-0 border-gray-200 shadow-sm">
        <form onSubmit={handleSend} className="flex space-x-4">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} disabled={loading}
            placeholder="Ask about your medical history or reports..." 
            className="flex-grow border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="submit" disabled={loading || !input.trim()} 
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 disabled:opacity-50 font-medium transition shadow-sm">
            Send
          </button>
        </form>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-4">
        AI responses are for informational purposes only. Do not use for medical diagnosis.
      </p>
    </div>
  );
}
