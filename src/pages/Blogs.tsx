// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { HeroCelebration } from "../components/ui/HeroCelebration";
// import { askGroq } from "../utils/askGroq";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// // Sample blog posts data
// const blogPosts = [
//   {
//     id: 1,
//     title: "Building a Modern AI-Powered Portfolio",
//     excerpt:
//       "How I integrated Groq AI to create an interactive chat experience that sets my portfolio apart from the rest.",
//     content: `# Building a Modern AI-Powered Portfolio

// ## Introduction
// In today's competitive job market, having a portfolio that stands out is crucial. I decided to integrate AI to create an interactive experience.

// ## Why AI Integration?
// AI-powered features demonstrate:
// - Technical skills with modern APIs
// - Understanding of user experience
// - Forward-thinking approach

// ## Implementation
// I used Groq API for lightning-fast responses. The integration process involved:

// \`\`\`javascript
// const response = await askGroq(userQuestion);
// \`\`\`

// ## Results
// The AI assistant answers questions about my work, making the portfolio interactive and memorable.`,
//     category: "AI/ML",
//     readTime: "5 min read",
//     date: "2024-03-15",
//     views: 1234,
//     likes: 89,
//     image: "🤖",
//     tags: ["AI", "React", "Groq", "Portfolio"],
//     gradient: "from-cyan-500 to-blue-600",
//   },
//   {
//     id: 2,
//     title: "The Future of Web Animations with Framer Motion",
//     excerpt:
//       "Exploring advanced animation techniques that bring websites to life and create memorable user experiences.",
//     content:
//       "Full article with code examples about Framer Motion animations...",
//     category: "Design",
//     readTime: "8 min read",
//     date: "2024-03-10",
//     views: 2156,
//     likes: 156,
//     image: "✨",
//     tags: ["Animation", "Framer Motion", "UI/UX"],
//     gradient: "from-purple-500 to-pink-600",
//   },
//   {
//     id: 3,
//     title: "React Performance Optimization Tips",
//     excerpt:
//       "Practical strategies to make your React applications blazingly fast and deliver exceptional user experience.",
//     content: "Full article about React performance optimization...",
//     category: "Development",
//     readTime: "6 min read",
//     date: "2024-03-05",
//     views: 3421,
//     likes: 234,
//     image: "⚡",
//     tags: ["React", "Performance", "Optimization"],
//     gradient: "from-orange-400 to-red-600",
//   },
// ];

// const categories = ["All", "AI/ML", "Design", "Development", "Career"];

// const BOOKMARKS_KEY = "blog_bookmarks";
// const REACTIONS_KEY = "blog_reactions";
// const COMMENTS_KEY = "blog_comments";

// export const BlogPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [likedPosts, setLikedPosts] = useState<number[]>([]);
//   const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);

//   // Load bookmarks from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem(BOOKMARKS_KEY);
//     if (saved) {
//       setBookmarkedPosts(JSON.parse(saved));
//     }
//   }, []);

//   // Save bookmarks to localStorage
//   const toggleBookmark = (postId: number) => {
//     const updated = bookmarkedPosts.includes(postId)
//       ? bookmarkedPosts.filter((id) => id !== postId)
//       : [...bookmarkedPosts, postId];
//     setBookmarkedPosts(updated);
//     localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
//   };

//   const filteredPosts = blogPosts.filter((post) => {
//     const matchesCategory =
//       selectedCategory === "All" || post.category === selectedCategory;
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.tags.some((tag) =>
//         tag.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     return matchesCategory && matchesSearch;
//   });

//   const handleLike = (postId: number) => {
//     setLikedPosts((prev) =>
//       prev.includes(postId)
//         ? prev.filter((id) => id !== postId)
//         : [...prev, postId]
//     );
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden">
//       <HeroCelebration showText={false} />
//       <AnimatedBackground />
//       <FloatingParticles />

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
//             Tech Blog
//           </h1>
//           <motion.div
//             animate={{ scaleX: [0, 1, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full mx-auto max-w-md mb-4"
//           />
//           <p className="text-gray-400 text-lg">
//             Insights, tutorials, and thoughts on modern web development
//           </p>
//         </motion.div>

//         {/* Search & Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mb-12"
//         >
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search articles, tags..."
//                 className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
//               />
//               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
//                 🔍
//               </span>
//             </div>

//             <div className="flex gap-2 bg-white/5 border border-white/20 rounded-2xl p-2">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setViewMode("grid")}
//                 className={`px-4 py-2 rounded-xl transition-all ${
//                   viewMode === "grid"
//                     ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
//                     : "text-gray-400"
//                 }`}
//               >
//                 Grid
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setViewMode("list")}
//                 className={`px-4 py-2 rounded-xl transition-all ${
//                   viewMode === "list"
//                     ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
//                     : "text-gray-400"
//                 }`}
//               >
//                 List
//               </motion.button>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 justify-center">
//             {categories.map((cat, index) => (
//               <motion.button
//                 key={cat}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-6 py-3 rounded-full transition-all ${
//                   selectedCategory === cat
//                     ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
//                     : "bg-white/5 text-gray-300"
//                 } border border-white/20`}
//               >
//                 {cat}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Blog Posts */}
//         <motion.div
//           layout
//           className={
//             viewMode === "grid"
//               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               : "flex flex-col gap-6"
//           }
//         >
//           <AnimatePresence mode="popLayout">
//             {filteredPosts.map((post, index) => (
//               <BlogCard
//                 key={post.id}
//                 post={post}
//                 index={index}
//                 viewMode={viewMode}
//                 isLiked={likedPosts.includes(post.id)}
//                 isBookmarked={bookmarkedPosts.includes(post.id)}
//                 onLike={() => handleLike(post.id)}
//                 onBookmark={() => toggleBookmark(post.id)}
//                 onClick={() => setSelectedPost(post)}
//               />
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
//         >
//           <StatCard
//             icon="📝"
//             value={blogPosts.length}
//             label="Articles"
//             color="from-cyan-400 to-blue-500"
//           />
//           <StatCard
//             icon="👁️"
//             value="15K+"
//             label="Total Views"
//             color="from-purple-400 to-pink-500"
//           />
//           <StatCard
//             icon="🔖"
//             value={bookmarkedPosts.length}
//             label="Bookmarked"
//             color="from-green-400 to-emerald-500"
//           />
//           <StatCard
//             icon="🏷️"
//             value="20+"
//             label="Topics"
//             color="from-orange-400 to-red-500"
//           />
//         </motion.div>
//       </div>

//       {/* Article Modal */}
//       <AnimatePresence>
//         {selectedPost && (
//           <ArticleModal
//             post={selectedPost}
//             onClose={() => setSelectedPost(null)}
//             isBookmarked={bookmarkedPosts.includes(selectedPost.id)}
//             onBookmark={() => toggleBookmark(selectedPost.id)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Blog Card
// function BlogCard({
//   post,
//   index,
//   viewMode,
//   isLiked,
//   isBookmarked,
//   onLike,
//   onBookmark,
//   onClick,
// }) {
//   return (
//     <motion.article
//       layout
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       whileHover={{ y: -5 }}
//       className={`relative bg-gradient-to-br ${
//         post.gradient
//       } p-[2px] rounded-3xl cursor-pointer group ${
//         viewMode === "list" ? "flex" : ""
//       }`}
//       onClick={onClick}
//     >
//       <div
//         className={`bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 h-full ${
//           viewMode === "list" ? "flex gap-6 w-full" : ""
//         }`}
//       >
//         <motion.div
//           whileHover={{ rotate: 360, scale: 1.2 }}
//           transition={{ duration: 0.6 }}
//           className={`text-7xl mb-4 ${
//             viewMode === "list" ? "mb-0" : "text-center"
//           }`}
//         >
//           {post.image}
//         </motion.div>

//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-3">
//             <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
//               {post.category}
//             </span>
//             <span className="text-xs text-gray-400">{post.readTime}</span>
//           </div>

//           <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400">
//             {post.title}
//           </h3>

//           <p className="text-gray-400 text-sm mb-4 line-clamp-2">
//             {post.excerpt}
//           </p>

//           <div className="flex flex-wrap gap-2 mb-4">
//             {post.tags.slice(0, 3).map((tag, i) => (
//               <span
//                 key={i}
//                 className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-white/10">
//             <div className="flex items-center gap-4 text-sm">
//               <span className="text-gray-400">
//                 👁️ {post.views.toLocaleString()}
//               </span>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onLike();
//                 }}
//                 className={isLiked ? "text-red-400" : "text-gray-400"}
//               >
//                 {isLiked ? "❤️" : "🤍"} {post.likes}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onBookmark();
//                 }}
//                 className={isBookmarked ? "text-yellow-400" : "text-gray-400"}
//               >
//                 {isBookmarked ? "🔖" : "📑"}
//               </motion.button>
//             </div>
//             <span className="text-xs text-gray-500">{post.date}</span>
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// // Article Modal with ALL features + Hire CTA Cooldown
// function ArticleModal({ post, onClose, isBookmarked, onBookmark }) {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [showHireCTA, setShowHireCTA] = useState(false);
//   const [ctaDismissed, setCtaDismissed] = useState(false);
//   const [aiQuestion, setAiQuestion] = useState("");
//   const [aiResponse, setAiResponse] = useState("");
//   const [isAiThinking, setIsAiThinking] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [reactions, setReactions] = useState({
//     fire: 0,
//     like: 0,
//     celebrate: 0,
//     mind_blown: 0,
//   });
//   const [userReaction, setUserReaction] = useState(null);
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const contentRef = useRef(null);
//   const dismissTimeRef = useRef(null);

//   // Cooldown duration: 5 minutes
//   const COOLDOWN_DURATION = 5 * 60 * 1000;

//   // Load comments and reactions
//   useEffect(() => {
//     const savedComments = localStorage.getItem(`${COMMENTS_KEY}_${post.id}`);
//     const savedReactions = localStorage.getItem(`${REACTIONS_KEY}_${post.id}`);
//     if (savedComments) setComments(JSON.parse(savedComments));
//     if (savedReactions) setReactions(JSON.parse(savedReactions));
//   }, [post.id]);

//   // Check cooldown on mount
//   useEffect(() => {
//     const dismissTime = parseInt(localStorage.getItem('hireCTADismissed') || '0');
//     if (dismissTime) {
//       const timePassed = Date.now() - dismissTime;
//       if (timePassed < COOLDOWN_DURATION) {
//         setCtaDismissed(true);
//         dismissTimeRef.current = dismissTime;
//         const remainingMinutes = Math.ceil((COOLDOWN_DURATION - timePassed) / 60000);
//         console.log(`⏳ Hire CTA cooldown active. ${remainingMinutes} minutes remaining.`);
//       } else {
//         localStorage.removeItem('hireCTADismissed');
//       }
//     }
//   }, []);

//   // Check if cooldown has expired
//   const isCooldownExpired = () => {
//     if (!ctaDismissed) return true;
    
//     const dismissTime = dismissTimeRef.current || 
//       parseInt(localStorage.getItem('hireCTADismissed') || '0');
    
//     if (!dismissTime) return true;
    
//     const timePassed = Date.now() - dismissTime;
//     return timePassed >= COOLDOWN_DURATION;
//   };

//   // Handle CTA dismiss with cooldown
//   const handleDismissCTA = () => {
//     setShowHireCTA(false);
//     setCtaDismissed(true);
//     dismissTimeRef.current = Date.now();
//     localStorage.setItem('hireCTADismissed', Date.now().toString());
//     console.log('🚫 Hire CTA dismissed. Will reappear in 5 minutes.');
//   };

//   // Scroll progress tracking with cooldown check
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!contentRef.current) return;
//       const element = contentRef.current;
//       const scrollTop = element.scrollTop;
//       const scrollHeight = element.scrollHeight - element.clientHeight;
//       const progress = (scrollTop / scrollHeight) * 100;
//       setScrollProgress(progress);

//       // Show hire CTA at 87% ONLY if cooldown expired
//       if (progress > 87 && !showHireCTA && isCooldownExpired()) {
//         setShowHireCTA(true);
//         setCtaDismissed(false);
//         dismissTimeRef.current = null;
//         localStorage.removeItem('hireCTADismissed');
//         console.log('✅ Hire CTA triggered at 87% scroll');
//       }
//     };

//     const element = contentRef.current;
//     if (element) {
//       element.addEventListener("scroll", handleScroll);
//       return () => element.removeEventListener("scroll", handleScroll);
//     }
//   }, [showHireCTA, ctaDismissed]);

//   // Helper function to intelligently truncate at sentence boundaries
//   const smartTruncate = (text, maxLength) => {
//     if (text.length <= maxLength) return text;
    
//     const truncated = text.substring(0, maxLength);
//     const lastPeriod = truncated.lastIndexOf('.');
//     const lastQuestion = truncated.lastIndexOf('?');
//     const lastExclamation = truncated.lastIndexOf('!');
    
//     const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
    
//     if (lastSentenceEnd > maxLength * 0.7) {
//       return text.substring(0, lastSentenceEnd + 1);
//     }
    
//     const lastSpace = truncated.lastIndexOf(' ');
//     return lastSpace > 0 
//       ? text.substring(0, lastSpace) + '...'
//       : truncated + '...';
//   };

//   // Enhanced AI handler - INPUT under 600 chars, OUTPUT fully detailed
//   const handleAskAI = async () => {
//     if (!aiQuestion.trim()) return;
    
//     setIsAiThinking(true);
    
//     try {
//       const INPUT_LIMIT = 580;
      
//       const maxTitleLength = 80;
//       const maxContentLength = 300;
//       const maxQuestionLength = 150;
      
//       const truncatedTitle = smartTruncate(post.title, maxTitleLength);
//       const truncatedContent = smartTruncate(post.content, maxContentLength);
//       const truncatedQuestion = smartTruncate(aiQuestion, maxQuestionLength);
      
//       const isTruncated = post.content.length > maxContentLength;
      
//       const prompt = isTruncated 
//         ? "Blog AI. Article shortened. Give detailed answer:"
//         : "Blog AI. Give detailed answer:";
      
//       const context = `"${truncatedTitle}"\n${truncatedContent}\n\nQ: ${truncatedQuestion}`;
//       const finalMessage = `${prompt}\n${context}`;
      
//       if (finalMessage.length > INPUT_LIMIT) {
//         const emergencyContent = smartTruncate(post.content, 200);
//         const emergencyQuestion = smartTruncate(aiQuestion, 100);
//         const emergencyTitle = smartTruncate(post.title, 60);
//         const emergencyPrompt = isTruncated ? "Blog AI (shortened):" : "Blog AI:";
//         const emergencyMessage = `${emergencyPrompt}\n"${emergencyTitle}"\n${emergencyContent}\n\nQ: ${emergencyQuestion}`;
        
//         if (emergencyMessage.length > INPUT_LIMIT) {
//           throw new Error('Content too long for AI processing');
//         }
        
//         console.log('⚠️ Emergency truncation used. Input:', emergencyMessage.length, 'chars');
//         const response = await askGroq(emergencyMessage);
//         setAiResponse(response);
//         return;
//       }
      
//       console.log('📏 Input:', finalMessage.length, '/ 600 chars');
      
//       const response = await askGroq(finalMessage);
//       setAiResponse(response);
      
//     } catch (error) {
//       console.error('AI Error:', error);
      
//       if (error.message === 'Content too long for AI processing') {
//         setAiResponse("This article is too long. Please ask about a specific part of it.");
//       } else if (error.response?.data?.error?.includes('too long')) {
//         setAiResponse("Question too long. Please shorten it and try again.");
//       } else {
//         setAiResponse("Sorry, I couldn't process that request. Please try again.");
//       }
//     } finally {
//       setIsAiThinking(false);
//     }
//   };

//   // Comments
//   const handleAddComment = () => {
//     if (!newComment.trim()) return;
//     const comment = {
//       id: Date.now(),
//       text: newComment,
//       author: "Anonymous",
//       timestamp: new Date().toISOString(),
//       reactions: { like: 0, love: 0 },
//     };
//     const updated = [...comments, comment];
//     setComments(updated);
//     localStorage.setItem(`${COMMENTS_KEY}_${post.id}`, JSON.stringify(updated));
//     setNewComment("");
//   };

//   // Reactions
//   const handleReaction = (type) => {
//     const updated = { ...reactions };
//     if (userReaction === type) {
//       updated[type]--;
//       setUserReaction(null);
//     } else {
//       if (userReaction) updated[userReaction]--;
//       updated[type]++;
//       setUserReaction(type);
//     }
//     setReactions(updated);
//     localStorage.setItem(`${REACTIONS_KEY}_${post.id}`, JSON.stringify(updated));
//   };

//   // Share functionality
//   const handleShare = (platform) => {
//     const url = window.location.href;
//     const text = `Check out: ${post.title}`;
//     const urls = {
//       twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
//       linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//       copy: url,
//     };

//     if (platform === "copy") {
//       navigator.clipboard.writeText(url);
//       alert("Link copied to clipboard!");
//     } else {
//       window.open(urls[platform], "_blank");
//     }
//     setShowShareMenu(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 50 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 50 }}
//         onClick={(e) => e.stopPropagation()}
//         className={`relative bg-gradient-to-br ${post.gradient} p-[2px] rounded-3xl max-w-5xl w-full h-[90vh] overflow-hidden`}
//       >
//         {/* Reading Progress Bar */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
//           <motion.div
//             className="h-full bg-gradient-to-r from-cyan-400 to-pink-400"
//             style={{ width: `${scrollProgress}%` }}
//           />
//         </div>

//         <div
//           ref={contentRef}
//           className="bg-gray-900 rounded-3xl h-full overflow-y-auto p-8 relative"
//         >
//           {/* Close & Actions */}
//           <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md z-10 pb-4 mb-4 border-b border-white/10 flex justify-between items-center">
//             <div className="flex gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 onClick={onBookmark}
//                 className={`px-4 py-2 rounded-xl ${
//                   isBookmarked
//                     ? "bg-yellow-500/20 text-yellow-400"
//                     : "bg-white/10 text-gray-400"
//                 }`}
//               >
//                 {isBookmarked ? "🔖 Saved" : "📑 Save"}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 onClick={() => setShowShareMenu(!showShareMenu)}
//                 className="px-4 py-2 bg-white/10 rounded-xl text-gray-400"
//               >
//                 📤 Share
//               </motion.button>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white text-xl"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Share Menu */}
//           {showShareMenu && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="absolute top-20 right-8 bg-gray-800 border border-white/20 rounded-xl p-4 z-20 shadow-xl"
//             >
//               <div className="flex flex-col gap-2">
//                 <button onClick={() => handleShare("twitter")} className="px-4 py-2 hover:bg-white/10 rounded-lg text-left">
//                   🐦 Twitter
//                 </button>
//                 <button onClick={() => handleShare("linkedin")} className="px-4 py-2 hover:bg-white/10 rounded-lg text-left">
//                   💼 LinkedIn
//                 </button>
//                 <button onClick={() => handleShare("facebook")} className="px-4 py-2 hover:bg-white/10 rounded-lg text-left">
//                   📘 Facebook
//                 </button>
//                 <button onClick={() => handleShare("copy")} className="px-4 py-2 hover:bg-white/10 rounded-lg text-left">
//                   🔗 Copy Link
//                 </button>
//               </div>
//             </motion.div>
//           )}

//           {/* Article Header */}
//           <div className="text-center mb-8">
//             <div className="text-9xl mb-4">{post.image}</div>
//             <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
//               {post.category}
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-2">
//               {post.title}
//             </h2>
//             <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
//               <span>{post.date}</span>
//               <span>•</span>
//               <span>{post.readTime}</span>
//               <span>•</span>
//               <span>
//                 {Math.round(((post.content.split(" ").length / 200) * scrollProgress) / 100)} min read so far
//               </span>
//             </div>
//           </div>

//           {/* Article Content */}
//           <div className="prose prose-invert max-w-none mb-8">
//             <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
//               {post.content}
//             </div>
//           </div>

//           {/* Reactions */}
//           <div className="flex flex-wrap items-start gap-1 md:gap-3 md:p-4 px-1.5 py-3 bg-white/5 rounded-xl mb-8">
//             <span className="text-gray-400 text-xs md:text-sm w-full md:w-auto mb-2 md:mb-0 block">React:</span>
//             {[
//               { type: "fire", emoji: "🔥", label: "Fire" },
//               { type: "like", emoji: "👍", label: "Like" },
//               { type: "celebrate", emoji: "🎉", label: "Celebrate" },
//               { type: "mind_blown", emoji: "🤯", label: "Wow" },
//             ].map(({ type, emoji, label }) => (
//               <motion.button
//                 key={type}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => handleReaction(type)}
//                 className={`flex items-center gap-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all text-sm ${
//                   userReaction === type
//                     ? "bg-purple-500/30 ring-2 ring-purple-500"
//                     : "bg-white/5 hover:bg-white/10"
//                 }`}
//               >
//                 <span className="text-base md:text-xl">{emoji}</span>
//                 <span className="text-xs md:text-sm text-white">{reactions[type]}</span>
//               </motion.button>
//             ))}
//           </div>

//           {/* AI Assistant */}
//           <div className="mb-8 p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl">
//             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//               🤖 Ask AI About This Article
//             </h3>
//             <div className="flex gap-3 mb-4">
//               <input
//                 value={aiQuestion}
//                 onChange={(e) => setAiQuestion(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleAskAI()}
//                 placeholder="What would you like to know?"
//                 className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
//               />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleAskAI}
//                 disabled={isAiThinking}
//                 className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white font-semibold disabled:opacity-50"
//               >
//                 {isAiThinking ? "⏳" : "Ask"}
//               </motion.button>
//             </div>
//             {aiResponse && (
//               <motion.div className="markdown-prose text-left leading-relaxed w-full">
//                 <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   components={{
//                     table: ({ node, ...props }) => (
//                       <div className="w-full overflow-x-auto touch-pan-x scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
//                         <table {...props} className="min-w-[600px] md:min-w-full" />
//                       </div>
//                     ),
//                   }}
//                 >
//                   {aiResponse}
//                 </ReactMarkdown>
//               </motion.div>
//             )}
//           </div>

//           {/* Comments Section */}
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-white mb-4">💬 Comments ({comments.length})</h3>
//             <div className="flex gap-3 mb-6">
//               <input
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
//                 placeholder="Share your thoughts..."
//                 className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
//               />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={handleAddComment}
//                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-semibold"
//               >
//                 Post
//               </motion.button>
//             </div>
//             <div className="space-y-4">
//               {comments.map((comment) => (
//                 <motion.div
//                   key={comment.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-4 bg-white/5 rounded-xl"
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm">
//                       👤
//                     </div>
//                     <span className="text-white font-semibold">{comment.author}</span>
//                     <span className="text-xs text-gray-500">
//                       {new Date(comment.timestamp).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className="text-gray-300 text-sm">{comment.text}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Hire Me CTA with Cooldown */}
//           <AnimatePresence>
//             {showHireCTA && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className="sticky bottom-4 p-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl text-center shadow-2xl"
//               >
//                 <button
//                   onClick={handleDismissCTA}
//                   className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-sm transition-colors"
//                   aria-label="Dismiss"
//                 >
//                   ✕
//                 </button>

//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                   Enjoyed This Article?
//                 </h3>
//                 <p className="text-white/90 mb-4 text-sm md:text-base">
//                   Let's work together on your next project!
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 md:px-8 py-2 md:py-3 bg-white text-purple-600 rounded-xl font-bold text-sm md:text-base"
//                 >
//                   📧 Hire Me Now
//                 </motion.button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// // Stat Card
// function StatCard({ icon, value, label, color }) {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       className={`relative bg-gradient-to-br ${color} p-[2px] rounded-2xl`}
//     >
//       <div className="bg-gray-900/90 rounded-2xl p-6 text-center">
//         <div className="text-4xl mb-2">{icon}</div>
//         <div className="text-3xl font-bold text-white mb-1">{value}</div>
//         <div className="text-sm text-gray-400">{label}</div>
//       </div>
//     </motion.div>
//   );
// }

// // Background Components
// function AnimatedBackground() {
//   return (
//     <motion.div
//       className="absolute inset-0 opacity-30 pointer-events-none"
//       animate={{
//         background: [
//           "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
//           "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.4) 0%, transparent 50%)",
//           "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.4) 0%, transparent 50%)",
//           "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
//         ],
//       }}
//       transition={{ duration: 10, repeat: Infinity }}
//     />
//   );
// }

// function FloatingParticles() {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(15)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{
//             x:
//               Math.random() *
//               (typeof window !== "undefined" ? window.innerWidth : 1000),
//             y:
//               Math.random() *
//               (typeof window !== "undefined" ? window.innerHeight : 1000),
//             scale: Math.random() * 0.5 + 0.3,
//           }}
//           animate={{
//             x:
//               Math.random() *
//               (typeof window !== "undefined" ? window.innerWidth : 1000),
//             y:
//               Math.random() *
//               (typeof window !== "undefined" ? window.innerHeight : 1000),
//           }}
//           transition={{
//             duration: Math.random() * 25 + 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//           className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-sm"
//         />
//       ))}
//     </div>
//   );
// }

// export default BlogPage;



// ============================================
// 📁 COMPONENT 1: BlogPage.jsx (Main Page)
// ============================================
// Purpose: Orchestrates the entire blog page, manages state, handles filtering
// Dependencies: All other blog components

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import { BlogHeader, BlogFilters, BlogContent } from "../components/ui/blog/BlogComponents";
import ArticleModal from "../components//ui/blog/ArticlaModal";
import { blogPosts, categories, BOOKMARKS_KEY } from "../components/ui/blog/blogData";

export const BlogPage = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // ============================================
  // LOAD BOOKMARKS FROM LOCALSTORAGE
  // ============================================
  useEffect(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      setBookmarkedPosts(JSON.parse(saved));
    }
  }, []);

  // ============================================
  // BOOKMARK HANDLER
  // ============================================
  const toggleBookmark = (postId) => {
    const updated = bookmarkedPosts.includes(postId)
      ? bookmarkedPosts.filter((id) => id !== postId)
      : [...bookmarkedPosts, postId];
    setBookmarkedPosts(updated);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  };

  // ============================================
  // LIKE HANDLER
  // ============================================
  const handleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // ============================================
  // FILTER POSTS (by category and search)
  // ============================================
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Hero celebration effect */}
      <HeroCelebration showText={false} />
      
      {/* Animated background effects */}
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <BlogHeader />

        {/* Filters Section (Search + Categories + View Mode) */}
        <BlogFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Blog Content (Grid/List + Stats) */}
        <BlogContent
          posts={filteredPosts}
          viewMode={viewMode}
          likedPosts={likedPosts}
          bookmarkedPosts={bookmarkedPosts}
          onLike={handleLike}
          onBookmark={toggleBookmark}
          onSelectPost={setSelectedPost}
          totalPosts={blogPosts.length}
        />
      </div>

      {/* Article Modal (opens when post is clicked) */}
      <AnimatePresence>
        {selectedPost && (
          <ArticleModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            isBookmarked={bookmarkedPosts.includes(selectedPost.id)}
            onBookmark={() => toggleBookmark(selectedPost.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// BACKGROUND EFFECTS (Animated gradients + particles)
// ============================================
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

export default BlogPage;
