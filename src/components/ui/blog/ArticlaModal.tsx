// ============================================
// 📁 COMPONENT 3: ArticleModal.jsx (Full Article View)
// ============================================
// Purpose: Displays full article with AI assistant, comments, reactions, share menu
// This is opened when user clicks on a blog card

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askGroq } from "../../../utils/askGroq";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { COMMENTS_KEY, REACTIONS_KEY } from "./blogData";

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

export default function ArticleModal({
  post,
  onClose,
  isBookmarked,
  onBookmark,
}) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHireCTA, setShowHireCTA] = useState(false);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reactions, setReactions] = useState({
    fire: 0,
    like: 0,
    celebrate: 0,
    mind_blown: 0,
  });
  const [userReaction, setUserReaction] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const isMobile = useIsMobile();

  const contentRef = useRef(null);
  const dismissTimeRef = useRef(null);
  const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes

  // ============================================
  // LOAD COMMENTS & REACTIONS FROM LOCALSTORAGE
  // ============================================
  useEffect(() => {
    const savedComments = localStorage.getItem(`${COMMENTS_KEY}_${post.id}`);
    const savedReactions = localStorage.getItem(`${REACTIONS_KEY}_${post.id}`);
    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedReactions) setReactions(JSON.parse(savedReactions));
  }, [post.id]);

  // ============================================
  // CHECK CTA COOLDOWN ON MOUNT
  // ============================================
  useEffect(() => {
    const dismissTime = parseInt(
      localStorage.getItem("hireCTADismissed") || "0"
    );
    if (dismissTime) {
      const timePassed = Date.now() - dismissTime;
      if (timePassed < COOLDOWN_DURATION) {
        setCtaDismissed(true);
        dismissTimeRef.current = dismissTime;
      } else {
        localStorage.removeItem("hireCTADismissed");
      }
    }
  }, []);

  // ============================================
  // CHECK IF COOLDOWN EXPIRED
  // ============================================
  const isCooldownExpired = () => {
    if (!ctaDismissed) return true;
    const dismissTime =
      dismissTimeRef.current ||
      parseInt(localStorage.getItem("hireCTADismissed") || "0");
    if (!dismissTime) return true;
    return Date.now() - dismissTime >= COOLDOWN_DURATION;
  };

  // ============================================
  // HANDLE CTA DISMISS (with 5-min cooldown)
  // ============================================
  const handleDismissCTA = () => {
    setShowHireCTA(false);
    setCtaDismissed(true);
    dismissTimeRef.current = Date.now();
    localStorage.setItem("hireCTADismissed", Date.now().toString());
    console.log("🚫 Hire CTA dismissed. Will reappear in 5 minutes.");
  };

  // ============================================
  // SCROLL PROGRESS TRACKING (shows CTA at 87%)
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Show hire CTA at 87% ONLY if cooldown expired
      if (progress > 87 && !showHireCTA && isCooldownExpired()) {
        setShowHireCTA(true);
        setCtaDismissed(false);
        dismissTimeRef.current = null;
        localStorage.removeItem("hireCTADismissed");
        console.log("✅ Hire CTA triggered at 87% scroll");
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [showHireCTA, ctaDismissed]);

  // ============================================
  // SMART TRUNCATE (truncate at sentence boundaries)
  // ============================================
  const smartTruncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf(".");
    const lastQuestion = truncated.lastIndexOf("?");
    const lastExclamation = truncated.lastIndexOf("!");
    const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

    if (lastSentenceEnd > maxLength * 0.7) {
      return text.substring(0, lastSentenceEnd + 1);
    }

    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0
      ? text.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  // ============================================
  // AI ASSISTANT HANDLER (input < 600 chars)
  // ============================================
  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiThinking(true);

    try {
      const INPUT_LIMIT = 580;
      const truncatedTitle = smartTruncate(post.title, 80);
      const truncatedContent = smartTruncate(post.content, 300);
      const truncatedQuestion = smartTruncate(aiQuestion, 150);
      const isTruncated = post.content.length > 300;

      // ===== UPDATED: Mobile-aware prompt (AI won't send tables on mobile) =====
      const prompt = isMobile
        ? `Blog AI. ${
            isTruncated ? "Article shortened." : ""
          } Give detailed answer in PLAIN TEXT format. IMPORTANT: DO NOT use tables or complex formatting - use simple bullet points or numbered lists instead. Keep response mobile-friendly and readable.`
        : isTruncated
        ? "Blog AI. Article shortened. Give detailed answer:"
        : "Blog AI. Give detailed answer:";

      const context = `"${truncatedTitle}"\n${truncatedContent}\n\nQ: ${truncatedQuestion}`;
      const finalMessage = `${prompt}\n${context}`;

      // Emergency truncation if still too long
      if (finalMessage.length > INPUT_LIMIT) {
        const emergencyContent = smartTruncate(post.content, 200);
        const emergencyQuestion = smartTruncate(aiQuestion, 100);
        const emergencyTitle = smartTruncate(post.title, 60);

        // ===== UPDATED: Mobile-aware emergency prompt =====
        const emergencyPrompt = isMobile
          ? "Blog AI. Mobile view - NO tables, use simple lists:"
          : "Blog AI:";

        const emergencyMessage = `${emergencyPrompt}\n"${emergencyTitle}"\n${emergencyContent}\n\nQ: ${emergencyQuestion}`;

        if (emergencyMessage.length > INPUT_LIMIT) {
          throw new Error("Content too long for AI processing");
        }

        console.log(
          "⚠️ Emergency truncation. Input:",
          emergencyMessage.length,
          "chars"
        );
        const response = await askGroq(emergencyMessage);
        setAiResponse(response);
        return;
      }

      console.log("📏 Input:", finalMessage.length, "/ 600 chars");
      console.log("📱 Mobile mode:", isMobile); // Debug log

      const response = await askGroq(finalMessage);
      setAiResponse(response);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse(
        "Sorry, I couldn't process that request. Please try again."
      );
    } finally {
      setIsAiThinking(false);
    }
  };

  // ============================================
  // ADD COMMENT HANDLER
  // ============================================
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
      author: "Anonymous",
      timestamp: new Date().toISOString(),
    };
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`${COMMENTS_KEY}_${post.id}`, JSON.stringify(updated));
    setNewComment("");
  };

  // ============================================
  // REACTION HANDLER
  // ============================================
  const handleReaction = (type) => {
    const updated = { ...reactions };
    if (userReaction === type) {
      updated[type]--;
      setUserReaction(null);
    } else {
      if (userReaction) updated[userReaction]--;
      updated[type]++;
      setUserReaction(type);
    }
    setReactions(updated);
    localStorage.setItem(
      `${REACTIONS_KEY}_${post.id}`,
      JSON.stringify(updated)
    );
  };

  // ============================================
  // SHARE HANDLER
  // ============================================
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out: ${post.title}`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    } else {
      window.open(urls[platform], "_blank");
    }
    setShowShareMenu(false);
  };

  // ============================================
  // RENDER MODAL
  // ============================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-gradient-to-br ${post.gradient} p-[2px] rounded-3xl max-w-5xl w-full h-[90vh] overflow-hidden`}
      >
        {/* Reading Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-400"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="bg-gray-900 rounded-3xl h-full overflow-y-auto p-4 relative"
        >
          {/* HEADER: Close & Action Buttons */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md z-10 pb-4 mb-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={onBookmark}
                className={`px-4 py-2 rounded-xl ${
                  isBookmarked
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {isBookmarked ? "🔖 Saved" : "📑 Save"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-4 py-2 bg-white/10 rounded-xl text-gray-400"
              >
                📤 Share
              </motion.button>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* SHARE MENU (dropdown) */}
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-20 right-8 bg-gray-800 border border-white/20 rounded-xl p-4 z-20 shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleShare("twitter")}
                  className="px-4 py-2 hover:bg-white/10 rounded-lg text-left"
                >
                  🐦 Twitter
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="px-4 py-2 hover:bg-white/10 rounded-lg text-left"
                >
                  💼 LinkedIn
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="px-4 py-2 hover:bg-white/10 rounded-lg text-left"
                >
                  📘 Facebook
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="px-4 py-2 hover:bg-white/10 rounded-lg text-left"
                >
                  🔗 Copy Link
                </button>
              </div>
            </motion.div>
          )}

          {/* ARTICLE HEADER */}
          <div className="text-center mb-8">
            <div className="text-9xl mb-4">{post.image}</div>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
              {post.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-2">
              {post.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>
                {Math.round(
                  ((post.content.split(" ").length / 200) * scrollProgress) /
                    100
                )}{" "}
                min read so far
              </span>
            </div>
          </div>

          {/* ARTICLE CONTENT */}
          <motion.div className="markdown-prose text-left leading-relaxed w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ node, ...props }) => (
                  <div className="w-full overflow-x-auto touch-pan-x scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
                    <table {...props} className="min-w-[600px] md:min-w-full" />
                  </div>
                ),
                code: ({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const codeString = String(children).replace(/\n$/, "");

                  return !inline && language ? (
                    // Multi-line code block with syntax highlighting
                    <div className="relative my-4">
                      {/* Language badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400 font-semibold uppercase">
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
                          padding: "1rem",
                          fontSize: "0.9em",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        lineNumberStyle={{
                          minWidth: "2.5rem",
                          paddingRight: "1rem",
                          color: "#858585",
                          textAlign: "right",
                          userSelect: "none",
                          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    // Inline code
                    <code
                      className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded text-sm border border-purple-500/30"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>

          {/* REACTIONS */}
          <div className="flex flex-wrap items-start gap-1 md:gap-3 md:p-4 px-1.5 py-3 bg-white/5 rounded-xl mb-8">
            <span className="text-gray-400 text-xs md:text-sm w-full md:w-auto mb-2 md:mb-0 block">
              React:
            </span>
            {[
              { type: "fire", emoji: "🔥", label: "Fire" },
              { type: "like", emoji: "👍", label: "Like" },
              { type: "celebrate", emoji: "🎉", label: "Celebrate" },
              { type: "mind_blown", emoji: "🤯", label: "Wow" },
            ].map(({ type, emoji, label }) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleReaction(type)}
                className={`flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all text-sm ${
                  userReaction === type
                    ? "bg-purple-500/30 ring-2 ring-purple-500"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="text-base md:text-xl">{emoji}</span>
                <span className="text-xs md:text-sm text-white">
                  {reactions[type]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* AI ASSISTANT */}
          <div className="mb-8 p-3 sm:p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              🤖 Ask AI About This Article
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAskAI()}
                placeholder="What would you like to know?"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAskAI}
                disabled={isAiThinking}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white text-sm sm:text-base font-semibold disabled:opacity-50 whitespace-nowrap"
              >
                {isAiThinking ? "⏳" : "Ask"}
              </motion.button>
            </div>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/5 rounded-xl overflow-hidden markdown-prose"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Only override table wrapper for scroll functionality
                    table: ({ node, ...props }) => (
                      <div className="table-scroll align-baseline justify-baseline">
                        <table {...props} />
                      </div>
                    ),
                    // Only override code for syntax highlighting
                    code: ({
                      node,
                      inline,
                      className,
                      children,
                      ...props
                    }: any) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const language = match ? match[1] : "";
                      const codeString = String(children).replace(/\n$/, "");

                      return !inline && language ? (
                        <div className="relative my-3 sm:my-4">
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-cyan-500/20 rounded text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase">
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
                              padding: window.innerWidth < 640 ? "0.75rem" : "1rem",
                              fontSize: window.innerWidth < 640 ? "0.75em" : "0.9em",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              maxWidth: "100%",
                              overflowX: "auto",
                            }}
                            lineNumberStyle={{
                              minWidth: window.innerWidth < 640 ? "2rem" : "2.5rem",
                              paddingRight: "0.5rem",
                              color: "#858585",
                              textAlign: "right",
                              userSelect: "none",
                              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                              fontSize: window.innerWidth < 640 ? "0.7em" : "1em",
                            }}
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        // Let CSS handle inline code styling
                        <code {...props}>{children}</code>
                      );
                    },
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>
              </motion.div>
            )}
          </div>

          {/* COMMENTS SECTION - MOBILE OPTIMIZED */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              💬 Comments ({comments.length})
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Share your thoughts..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleAddComment}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white text-sm sm:text-base font-semibold whitespace-nowrap"
              >
                Post
              </motion.button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-start justify-center text-xs sm:text-sm">
                      👤
                    </div>
                    <span className="text-sm sm:text-base text-white font-semibold">
                      {comment.author}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300">{comment.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* HIRE ME CTA (with 5-minute cooldown) */}
          <AnimatePresence>
            {showHireCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="sticky bottom-4 p-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl text-center shadow-2xl"
              >
                <button
                  onClick={handleDismissCTA}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Enjoyed This Article?
                </h3>
                <p className="text-white/90 mb-4 text-sm md:text-base">
                  Let's work together on your next project!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-2 md:py-3 bg-white text-purple-600 rounded-xl font-bold text-sm md:text-base"
                >
                  📧 Hire Me Now
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
