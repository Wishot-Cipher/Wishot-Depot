
// ============================================
// 📁 COMPONENT 2: BlogComponents.jsx (Header, Filters, Content)
// ============================================
// Purpose: Contains all blog UI components (header, filters, grid, cards, stats)
// This file groups related smaller components together

import { motion, AnimatePresence } from "framer-motion";

// ============================================
// BLOG HEADER (Title + Animated line)
// ============================================
export function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
        Tech Blog
      </h1>
      
      {/* Animated underline */}
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full mx-auto max-w-md mb-4"
      />
      
      <p className="text-gray-400 text-lg">
        Insights, tutorials, and thoughts on modern web development
      </p>
    </motion.div>
  );
}

// ============================================
// BLOG FILTERS (Search + View Mode + Categories)
// ============================================
export function BlogFilters({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      {/* Search Bar + View Mode Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </span>
        </div>

        {/* View Mode Toggle (Grid/List) */}
        <div className="flex gap-2 bg-white/5 border border-white/20 rounded-2xl p-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                : "text-gray-400"
            }`}
          >
            Grid
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === "list"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                : "text-gray-400"
            }`}
          >
            List
          </motion.button>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05, y: -2 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                : "bg-white/5 text-gray-300"
            } border border-white/20`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// BLOG CONTENT (Grid + Stats)
// ============================================
export function BlogContent({
  posts,
  viewMode,
  likedPosts,
  bookmarkedPosts,
  onLike,
  onBookmark,
  onSelectPost,
  totalPosts,
}) {
  return (
    <>
      {/* Blog Posts Grid/List */}
      <motion.div
        layout
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }
      >
        <AnimatePresence mode="popLayout">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              viewMode={viewMode}
              isLiked={likedPosts.includes(post.id)}
              isBookmarked={bookmarkedPosts.includes(post.id)}
              onLike={() => onLike(post.id)}
              onBookmark={() => onBookmark(post.id)}
              onClick={() => onSelectPost(post)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
      >
        <StatCard
          icon="📝"
          value={totalPosts}
          label="Articles"
          color="from-cyan-400 to-blue-500"
        />
        <StatCard
          icon="👁️"
          value="15K+"
          label="Total Views"
          color="from-purple-400 to-pink-500"
        />
        <StatCard
          icon="🔖"
          value={bookmarkedPosts.length}
          label="Bookmarked"
          color="from-green-400 to-emerald-500"
        />
        <StatCard
          icon="🏷️"
          value="20+"
          label="Topics"
          color="from-orange-400 to-red-500"
        />
      </motion.div>
    </>
  );
}

// ============================================
// BLOG CARD (Individual Post Card)
// ============================================
function BlogCard({
  post,
  index,
  viewMode,
  isLiked,
  isBookmarked,
  onLike,
  onBookmark,
  onClick,
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`relative bg-gradient-to-br ${
        post.gradient
      } p-[2px] rounded-3xl cursor-pointer group ${
        viewMode === "list" ? "flex" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 h-full ${
          viewMode === "list" ? "flex gap-6 w-full" : ""
        }`}
      >
        {/* Post Icon/Emoji */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className={`text-7xl mb-4 ${
            viewMode === "list" ? "mb-0" : "text-center"
          }`}
        >
          {post.image}
        </motion.div>

        <div className="flex-1">
          {/* Category + Read Time */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readTime}</span>
          </div>

          {/* Post Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400">
            {post.title}
          </h3>

          {/* Post Excerpt */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Post Actions (Views, Like, Bookmark, Date) */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm">
              {/* Views */}
              <span className="text-gray-400">
                👁️ {post.views.toLocaleString()}
              </span>
              
              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
                className={isLiked ? "text-red-400" : "text-gray-400"}
              >
                {isLiked ? "❤️" : "🤍"} {post.likes}
              </motion.button>
              
              {/* Bookmark Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark();
                }}
                className={isBookmarked ? "text-yellow-400" : "text-gray-400"}
              >
                {isBookmarked ? "🔖" : "📑"}
              </motion.button>
            </div>
            
            {/* Post Date */}
            <span className="text-xs text-gray-500">{post.date}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================
// STAT CARD (Individual Stat Display)
// ============================================
function StatCard({ icon, value, label, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-gradient-to-br ${color} p-[2px] rounded-2xl cursor-pointer`}
    >
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 text-center h-full">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}
