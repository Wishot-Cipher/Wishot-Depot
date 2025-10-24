// ============================================
// 📁 COMPONENT 4: blogData.js (Data & Constants)
// ============================================
// Purpose: Contains all blog posts data, categories, and localStorage keys
// This keeps data separate from components for easy management

// ============================================
// BLOG POSTS DATA
// ============================================
export const blogPosts = [
  {
    id: 1,
    title: "Building a Modern AI-Powered Portfolio",
    excerpt: "How I integrated Groq AI to create an interactive chat experience that sets my portfolio apart from the rest.",
    content: `# Building a Modern AI-Powered Portfolio

## Introduction
In today's competitive job market, having a portfolio that stands out is crucial. I decided to integrate AI to create an interactive experience.

## Why AI Integration?
AI-powered features demonstrate:
- Technical skills with modern APIs
- Understanding of user experience
- Forward-thinking approach

## Implementation
I used Groq API for lightning-fast responses. The integration process involved:

\`\`\`javascript
const response = await askGroq(userQuestion);
\`\`\`

## Results
The AI assistant answers questions about my work, making the portfolio interactive and memorable.`,
    category: "AI/ML",
    readTime: "5 min read",
    date: "2024-03-15",
    views: 1234,
    likes: 89,
    image: "🤖",
    tags: ["AI", "React", "Groq", "Portfolio"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "The Future of Web Animations with Framer Motion",
    excerpt: "Exploring advanced animation techniques that bring websites to life and create memorable user experiences.",
    content: `# The Future of Web Animations

## Introduction
Animations are no longer optional in modern web design. They're essential for creating engaging user experiences.

## Why Framer Motion?
Framer Motion stands out because:
- Declarative syntax
- Spring animations
- Gesture support
- Layout animations

## Getting Started
\`\`\`javascript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello World
</motion.div>
\`\`\`

## Best Practices
- Keep animations subtle
- Use spring physics for natural feel
- Optimize for performance
- Test on mobile devices`,
    category: "Design",
    readTime: "8 min read",
    date: "2024-03-10",
    views: 2156,
    likes: 156,
    image: "✨",
    tags: ["Animation", "Framer Motion", "UI/UX"],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "React Performance Optimization Tips",
    excerpt: "Practical strategies to make your React applications blazingly fast and deliver exceptional user experience.",
    content: `# React Performance Optimization

## Introduction
Performance is crucial for user experience. Let's explore proven optimization techniques.

## Key Strategies
1. **Use React.memo()** - Prevent unnecessary re-renders
2. **useMemo & useCallback** - Memoize expensive computations
3. **Code Splitting** - Load code on demand
4. **Virtualization** - Render only visible items

## Example: React.memo
\`\`\`javascript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
\`\`\`

## Measuring Performance
Use React DevTools Profiler to identify bottlenecks and optimize accordingly.

## Conclusion
Small optimizations compound. Start with the biggest impact areas first.`,
    category: "Development",
    readTime: "6 min read",
    date: "2024-03-05",
    views: 3421,
    likes: 234,
    image: "⚡",
    tags: ["React", "Performance", "Optimization"],
    gradient: "from-orange-400 to-red-600",
  },
  {
    id: 4,
    title: "Mastering TypeScript for React Development",
    excerpt: "Learn how TypeScript enhances React apps with type safety, better tooling, and fewer runtime errors.",
    content: `# Mastering TypeScript for React Development

## Introduction
TypeScript has become essential for large-scale React applications. It provides type safety and better developer experience.

## Why TypeScript?
TypeScript offers:
- Compile-time error checking
- Enhanced IDE support
- Better refactoring capabilities
- Self-documenting code

## Getting Started
\`\`\`typescript
interface Props {
  name: string;
  age?: number;
}

const UserCard: React.FC<Props> = ({ name, age }) => {
  return <div>{name} {age && \`(\${age})\`}</div>;
};
\`\`\`

## Advanced Patterns
- Generic components
- Conditional types
- Utility types
- Declaration merging

## Best Practices
- Use strict mode
- Avoid any type
- Leverage interfaces over types
- Use type guards for runtime checks`,
    category: "Development",
    readTime: "7 min read",
    date: "2024-02-28",
    views: 2890,
    likes: 312,
    image: "🔷",
    tags: ["TypeScript", "React", "JavaScript", "Development"],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt: "Essential practices for creating inclusive web experiences that work for everyone, including users with disabilities.",
    content: `# Building Accessible Web Applications

## Introduction
Web accessibility ensures that websites are usable by people with disabilities. It's not just good practice—it's often required by law.

## Core Principles
The four principles of accessibility:
- **Perceivable** - Information must be presentable to users
- **Operable** - Interface elements must be operable
- **Understandable** - Content must be understandable
- **Robust** - Content must work with assistive technologies

## Practical Implementation
\`\`\`html
<!-- Semantic HTML -->
<header>
  <nav>
    <ul>
      <li><a href="#main">Skip to main content</a></li>
    </ul>
  </nav>
</header>

<main id="main">
  <h1>Accessible Heading</h1>
  <img src="image.jpg" alt="Descriptive alt text" />
</main>
\`\`\`

## Tools and Testing
- Screen readers (NVDA, JAWS, VoiceOver)
- Color contrast checkers
- Keyboard navigation testing
- Automated accessibility audits

## Common Mistakes to Avoid
- Missing alt text on images
- Poor color contrast ratios
- Non-semantic HTML structure
- Lack of keyboard support`,
    category: "Design",
    readTime: "9 min read",
    date: "2024-02-20",
    views: 3456,
    likes: 278,
    image: "♿",
    tags: ["Accessibility", "Web Standards", "UX", "Inclusive Design"],
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 6,
    title: "Career Transition to Tech: My Journey",
    excerpt: "From non-technical background to full-stack developer: lessons learned, challenges overcome, and advice for aspiring developers.",
    content: `# Career Transition to Tech: My Journey

## Introduction
Switching careers to tech is challenging but rewarding. My journey from marketing to software development taught me valuable lessons.

## The Decision
Why I made the switch:
- Passion for problem-solving
- Growing demand for tech skills
- Remote work opportunities
- Competitive compensation

## Learning Path
My structured approach:
1. **Foundations** - HTML, CSS, JavaScript
2. **Frameworks** - React, Node.js
3. **Tools** - Git, databases, APIs
4. **Projects** - Build, deploy, iterate

## Challenges Faced
- Imposter syndrome
- Information overload
- Finding mentorship
- Balancing learning with life

## Advice for Beginners
\`\`\`javascript
// Start small, think big
const learningPlan = {
  daily: "1 hour coding",
  weekly: "Build one small project",
  monthly: "Learn one new technology",
  yearly: "Land your dream job"
};
\`\`\`

## Resources That Helped
- FreeCodeCamp
- MDN Web Docs
- Stack Overflow
- Local meetups and conferences

## Final Thoughts
Persistence pays off. Every expert was once a beginner. Keep learning, keep building.`,
    category: "Career",
    readTime: "10 min read",
    date: "2024-02-15",
    views: 4123,
    likes: 445,
    image: "🚀",
    tags: ["Career Change", "Learning", "Motivation", "Tech"],
    gradient: "from-yellow-500 to-orange-600",
  },
];

// ============================================
// CATEGORIES
// ============================================
export const categories = ["All", "AI/ML", "Design", "Development", "Career"];

// ============================================
// LOCALSTORAGE KEYS
// ============================================
export const BOOKMARKS_KEY = "blog_bookmarks";
export const REACTIONS_KEY = "blog_reactions";
export const COMMENTS_KEY = "blog_comments";