import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/types';
import { useAnalysis } from '@/context/AnalysisContext';
import { useCopilot } from '@/hooks/useCopilot';

export default function ChatPage() {
  const { analysis } = useAnalysis();
  const { askCopilot } = useCopilot();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your Return Intelligence Copilot. Ask me anything about your return data, root causes, or what to fix next.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const answer = await askCopilot(userMessage.content);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          'I am having trouble connecting to the analysis engine right now. Please try again shortly.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">AI Copilot</h1>
        <p className="text-muted-foreground">
          Ask questions about your return data
        </p>
      </div>

      <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''
                }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-foreground'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="p-4 bg-secondary/50 rounded-2xl">
                <div className="flex gap-1">
                  <div className="ai-thinking-dot" />
                  <div className="ai-thinking-dot" />
                  <div className="ai-thinking-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about returns, root causes, recommendations..."
              className="flex-1 h-12 px-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-12 px-6 bg-gradient-to-r from-accent to-accent-purple"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex gap-2 mt-3">
            {[
              'Why is SKU-104 being returned?',
              'What should we fix first?',
            ].map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-3 py-1.5 bg-secondary/30 border border-border/50 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
