/* About Page with AI Chat Assistant - Using Groq API with LocalStorage */
import { askGroq } from "../utils/askGroq";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, forwardRef } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const STORAGE_KEY = "dev_wishot_chat_history";

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export const AboutPage = () => {
  const isMobile = useIsMobile();

  // Load messages from localStorage or use default
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        } catch (error) {
          console.error("Failed to parse saved messages:", error);
        }
      }
    }
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
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll with smooth animation
  const scrollToBottom = (force = false) => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 200;

      if (force || isNearBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  useEffect(() => {
    if (!isStreaming) {
      scrollToBottom(true); // Force scroll on new messages
    }
  }, [messages, isStreaming]);

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

    // Auto-resize textarea back to normal
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    abortControllerRef.current = new AbortController();

    try {
      // ===== MOBILE-AWARE PROMPT (no tables on mobile) =====
      const mobilePrompt = isMobile
        ? "\n\nIMPORTANT: User is on mobile. DO NOT use tables or complex formatting. Use simple bullet points or numbered lists instead."
        : "";

      const aiText = await askGroq(userMessage.text + mobilePrompt);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (isTyping) {
      setIsTyping(false);
    }

    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleQuickQuestion = (q: string) => {
    if (isStreaming) return;
    const cleanQuestion = q.replace(/[^\w\s?]/g, "").trim();
    setInputValue(cleanQuestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: "bot",
      text: "👋 Chat cleared! All history has been deleted. Ask me anything about Dev_Wishot!",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);

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
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 scroll-smooth"
        >
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 py-2 md:py-4">
            <AnimatePresence mode="popLayout">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} isMobile={isMobile} />
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
            <div className="flex items-end gap-2 md:gap-3">
              <div className="flex items-end w-full bg-white/5 border border-white/20 rounded-2xl px-3 md:px-5">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={isStreaming ? "AI is responding..." : "Type your message..."}
                  disabled={isStreaming}
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base py-2.5 md:py-3 placeholder-gray-500 focus:ring-0 disabled:opacity-50 resize-none max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20"
                />

                {inputValue.length > 0 && (
                  <span className="text-xs text-gray-500 ml-2 mb-3">
                    {inputValue.length}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isStreaming}
                className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all flex-shrink-0"
              >
                {isStreaming ? "⏳" : "🚀"}
              </motion.button>
            </div>

            {/* Helpful hint */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Press Enter to send • Shift+Enter for new line •{" "}
              {isStreaming ? "Generating response..." : "AI ready"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🧠 Message Bubble with Syntax Highlighting & Table Handling */
type ChatMessage = {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
};

const MessageBubble = forwardRef<
  HTMLDivElement,
  { message: ChatMessage; isMobile: boolean }
>(({ message, isMobile }, ref) => {
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
          isBot ? "flex-row" : "flex-row-reverse"
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
              // ===== BOT: Markdown with Syntax Highlighting & Table Scroll =====
              <div className="markdown-prose text-left leading-relaxed w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Table wrapper for scroll
                    table: ({ node, ...props }) => (
                      <div className="table-scroll my-3 sm:my-4">
                        <table {...props} />
                      </div>
                    ),
                    // Code blocks with syntax highlighting
                    code: ({ node, inline, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const language = match ? match[1] : "";
                      const codeString = String(children).replace(/\n$/, "");

                      return !inline && language ? (
                        <div className="relative my-3 sm:my-4">
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-cyan-500/20 rounded text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase z-10">
                            {language}
                          </div>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={language}
                            PreTag="div"
                            showLineNumbers={true}
                            wrapLines={true}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              background: "#1e1e1e",
                              padding: isMobile ? "0.75rem" : "1rem",
                              fontSize: isMobile ? "0.75em" : "0.9em",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              maxWidth: "100%",
                              overflowX: "auto",
                            }}
                            lineNumberStyle={{
                              minWidth: isMobile ? "2rem" : "2.5rem",
                              paddingRight: "0.5rem",
                              color: "#858585",
                              textAlign: "right",
                              userSelect: "none",
                              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                              fontSize: isMobile ? "0.7em" : "1em",
                            }}
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        // Inline code uses CSS
                        <code {...props}>{children}</code>
                      );
                    },
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            ) : (
              // ===== USER: Plain text with word wrap =====
              <div className="text-sm md:text-base text-left break-words whitespace-pre-wrap w-full">
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
});

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
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
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
