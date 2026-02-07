import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { getGamingAdvice } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'PlayStation.lk systems active. How may I assist your gaming requirements?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev: {role: 'user' | 'bot', text: string}[]) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const advice = await getGamingAdvice(userMsg);
    setMessages((prev: {role: 'user' | 'bot', text: string}[]) => [...prev, { role: 'bot', text: advice || 'System Link Failure.' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-10 right-4 sm:right-6 lg:right-10 z-[60]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 btn-primary flex items-center justify-center hover:scale-110 shadow-2xl active:scale-95 transition-transform"
          aria-label="Open gaming assistant"
        >
          <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      ) : (
        <div className="fixed inset-0 lg:relative lg:inset-auto lg:w-96 glass rounded-none overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] flex flex-col border border-white/10 lg:max-h-[600px]">
          <div className="p-4 sm:p-6 bg-white text-black flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 font-black text-[10px] tracking-[0.3em] uppercase">
              <Bot className="w-4 h-4" />
              <span>System Intelligence</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close assistant" className="p-1 active:bg-black/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 text-sm bg-black/60 min-h-0">
            {messages.map((m: {role: 'user' | 'bot', text: string}, i: number) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 sm:p-4 ${m.role === 'user' ? 'bg-white text-black font-bold' : 'bg-white/5 border border-white/5 text-white/70'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-[10px] font-black tracking-widest text-white/20 animate-pulse uppercase">Processing Request...</div>}
          </div>

          <div className="p-3 sm:p-4 border-t border-white/10 flex gap-3 sm:gap-4 bg-black shrink-0 mobile-safe-bottom">
            <input 
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
              placeholder="Input Command..."
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white placeholder:text-white/20 min-w-0"
            />
            <button 
              onClick={handleSend}
              className="px-4 btn-primary active:scale-95 transition-transform shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;