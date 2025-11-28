import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Mic, Sparkles } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { SystemMode } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: SystemMode;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, currentMode }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Greetings. I am Laptop-Five AI. How can I assist you with your ${currentMode} tasks today?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
     // Reset greeting on mode change
     setMessages([
        { role: 'ai', text: `Context switched to ${currentMode}. Ready for instructions.` }
     ]);
  }, [currentMode]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text: inputValue }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const aiText = await generateAIResponse(inputValue, currentMode);
    
    setMessages([...newMessages, { role: 'ai', text: aiText }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 bottom-24 w-80 md:w-96 h-[500px] glass-panel rounded-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300 border-l-2 border-l-cyan-500 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <span className="font-futuristic font-bold text-white tracking-wide">CO-PILOT</span>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-cyan-600/30 text-white rounded-tr-sm border border-cyan-500/30' 
                  : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a command..."
            className="flex-1 bg-black/30 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button className="absolute right-12 text-white/40 hover:text-white">
            <Mic className="w-4 h-4" />
          </button>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-xl text-cyan-400 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
