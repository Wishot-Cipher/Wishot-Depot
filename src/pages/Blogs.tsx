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
export function AnimatedBackground() {
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

export function FloatingParticles() {
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
