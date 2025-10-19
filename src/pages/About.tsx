/* About Page with AI Chat Assistant - Using Groq API with LocalStorage */
import { askGroq } from "../utils/askGroq";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, forwardRef } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const STORAGE_KEY = "dev_wishot_chat_history";

export const AboutPage = () => {
  // Load messages from localStorage or use default
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert timestamp strings back to Date objects
          return parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        } catch (error) {
          console.error("Failed to parse saved messages:", error);
        }
      }
    }
    // Default welcome message
    return [
      {
        id: 1,
        type: "bot",
        text: "👋 Hi there! I'm Dev_Wishot's AI assistant. Ask me anything about my creator — skills, experience, projects, or passions!",
        timestamp: new Date(),
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    // Only auto-scroll if user is near bottom (within 100px)
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          100;
        if (isNearBottom) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    // Only auto-scroll on new messages, not while streaming
    if (!isStreaming) {
      scrollToBottom();
    }
  }, [messages, isStreaming]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const quickQuestions = [
    "💼 What are your main skills?",
    "🚀 Tell me about your experience",
    "🎨 What projects have you built?",
    "⚡ What's your tech stack?",
    "📧 How can I contact you?",
    "🎯 What are your interests?",
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    abortControllerRef.current = new AbortController();

    try {
      const aiText = await askGroq(userMessage.text);

      setIsTyping(false);
      setIsStreaming(true);

      const botId = Date.now() + 1;
      const botResponse = {
        id: botId,
        type: "bot",
        text: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);

      const CHUNK_SIZE = 6;
      const CHUNK_DELAY = 1.5;

      for (let i = 0; i < aiText.length; i += CHUNK_SIZE) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        const chunk = aiText.slice(0, i + CHUNK_SIZE);

        setMessages((prev) =>
          prev.map((msg) => (msg.id === botId ? { ...msg, text: chunk } : msg))
        );

        await new Promise((res) => setTimeout(res, CHUNK_DELAY));
      }

      setMessages((prev) =>
        prev.map((msg) => (msg.id === botId ? { ...msg, text: aiText } : msg))
      );
    } catch (err) {
      console.error("Chat error:", err);
      const errorResponse = {
        id: Date.now() + 2,
        type: "bot",
        text: "⚠️ Oops! Something went wrong while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (isTyping) {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    if (isStreaming) return;
    const cleanQuestion = q.replace(/[^\w\s?]/g, "").trim();
    setInputValue(cleanQuestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear conversation and localStorage
  const handleClearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: "bot",
      text: "👋 Chat cleared! All history has been deleted. Ask me anything about Dev_Wishot!",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col">
      <HeroCelebration showText={false} />
      <AnimatedBackground />
      <FloatingParticles />

      <div className="z-10 flex flex-col h-full">
        {/* Header - Compact on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-20 pb-4 md:pb-3 px-4 text-center bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent flex-shrink-0"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Ask Me Anything
            </h2>

            {/* Clear Chat Button - Responsive */}
            {messages.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearChat}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-full border border-white/20 hover:border-red-500/50 transition-all flex items-center gap-1.5"
              >
                <span>🗑️</span>
                <span className="hidden sm:inline">Clear Chat</span>
                <span className="sm:hidden">Clear</span>
              </motion.button>
            )}
          </div>

          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full mx-auto max-w-xs mb-1"
          />
          <p className="text-gray-400 text-xs md:text-sm">
            Powered by Groq AI • Lightning fast responses ⚡
          </p>

          {/* Storage indicator */}
          {messages.length > 1 && (
            <p className="text-gray-500 text-[10px] md:text-xs mt-1">
              💾 {messages.length} message{messages.length !== 1 ? "s" : ""}{" "}
              saved locally
            </p>
          )}
        </motion.div>

        {/* Chat Messages - Maximum Space on Desktop */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 py-2 md:py-4">
            <AnimatePresence mode="popLayout">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </AnimatePresence>
            {isTyping && <TypingBubble />}

            {/* Stop Button while streaming */}
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStopStreaming}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full border border-red-500/50 text-sm font-semibold transition-all"
                >
                  ⏸️ Stop Generating
                </motion.button>
              </motion.div>
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pointer-events-none" />

        {/* Input Bar */}
        <div className="relative bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 p-2 md:p-4 flex-shrink-0">
          <div className="max-w-5xl mx-auto w-full">
            {/* Quick Questions */}
            <div className="flex gap-2 overflow-x-auto md:flex-wrap md:justify-center md:overflow-visible pb-2 md:pb-3 scrollbar-hide">
              {quickQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickQuestion(q)}
                  disabled={isStreaming}
                  className="px-3 md:px-4 py-1.5 md:py-2 flex-shrink-0 text-xs md:text-sm whitespace-nowrap bg-white/5 hover:bg-white/10 text-gray-200 rounded-full border border-white/20 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input + Send */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center w-full bg-white/5 border border-white/20 rounded-full md:rounded-2xl px-3 md:px-5">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isStreaming ? "AI is responding..." : "Type your message..."
                  }
                  disabled={isStreaming}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base py-2.5 md:py-3 placeholder-gray-500 focus:ring-0 disabled:opacity-50"
                />

                {inputValue.length > 0 && (
                  <span className="text-xs text-gray-500 mr-2">
                    {inputValue.length}
                  </span>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isStreaming}
                  className="ml-2 md:ml-3 flex items-center justify-center w-9 h-9 md:w-auto md:px-6 md:py-3 rounded-full md:rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all"
                >
                  <span className="md:inline">{isStreaming ? "⏳" : "🚀"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 md:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 12l16-8-7 8 7 8-16-8z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Helpful hint */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Press Enter to send •{" "}
              {isStreaming ? "Generating response..." : "AI ready"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🧠 Message Bubble */
type ChatMessage = {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
};

const MessageBubble = forwardRef<HTMLDivElement, { message: ChatMessage }>(
  ({ message }, ref) => {
    const isBot = message.type === "bot";

    return (
      <motion.div
        ref={ref as any}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isBot ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[80%] ${
            isBot ? "flex-row" : "flex-row-reverse overflow-hidden"
          }`}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
            className={`w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-start justify-center text-lg md:text-xl rounded-full shadow-lg ${
              isBot
                ? "bg-gradient-to-br from-cyan-500 to-purple-600"
                : "bg-gradient-to-br from-pink-500 to-orange-600"
            }`}
          >
            {isBot ? "🤖" : "🧑‍💻"}
          </motion.div>

          {/* Message bubble */}
          <div className="flex flex-col gap-1">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className={`p-3 md:p-4 rounded-xl md:rounded-2xl leading-relaxed shadow-xl break-words overflow-hidden ${
                isBot
                  ? "bg-white/10 backdrop-blur-lg border border-white/20 text-gray-100 rounded-tl-none"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tr-none"
              }`}
            >
              {isBot ? (
                // ✅ Markdown output (ONLY table scrolls)
                <div className="markdown-prose text-left leading-relaxed w-full">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ node, ...props }) => (
                        <div className="w-full overflow-x-auto touch-pan-x scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
                          <table
                            {...props}
                            className="min-w-[600px] md:min-w-full"
                          />
                        </div>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                // ✅ User messages never scroll
                <div className="text-sm md:text-base text-left break-words w-full">
                  {message.text}
                </div>
              )}
            </motion.div>

            {/* Timestamp */}
            <span
              className={`text-[10px] md:text-xs text-gray-500 px-2 ${
                isBot ? "text-left" : "text-right"
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

/* ✨ Typing Bubble */
function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="flex gap-2 md:gap-3 max-w-[90%] md:max-w-[80%]">
        <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg">
          🤖
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl rounded-tl-none flex gap-1.5 shadow-xl">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/70 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* 🌌 Background Effects */
function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 opacity-30 pointer-events-none"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />
  );
}

/* 🪶 Floating Particles */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 25 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}

export default AboutPage;
