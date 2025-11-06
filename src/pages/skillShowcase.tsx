import { motion } from "framer-motion";
import { useState } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import { FloatingParticles } from "../components/ui/skillShowcase/FloatingParticles";

export const SkillsShowcase = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-gray-900 to-blue-950/50">
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
          <FloatingParticles />
        </div>

        <HeroCelebration showText={false} />

        {/* Core content */}
        <div className="relative w-full">
          {/* Interactive 3D Skill Cards */}
          <div className="relative w-full">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 lg:mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-block"
              >
                <div className="relative">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                    Skills Arsenal
                  </h2>
                  <motion.div
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                  />
                </div>
              </motion.div>
              <p className="text-gray-400 text-base sm:text-lg mt-6 max-w-2xl mx-auto">
                Hover to explore my technical expertise
              </p>
            </motion.div>

            {/* Skill Cards Grid with 3D effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <SkillCard3D
                icon="⚛️"
                title="React & Next.js"
                description="Building fast, scalable web applications"
                skills={["React 18+", "Next.js 14", "Redux", "React Query"]}
                color="from-cyan-500 to-blue-600"
                delay={0.1}
                isActive={activeCard === 0}
                onHover={() => setActiveCard(0)}
              />
              <SkillCard3D
                icon="🎨"
                title="UI/UX Design"
                description="Creating beautiful, intuitive experiences"
                skills={["Figma", "Adobe XD", "Prototyping", "User Research"]}
                color="from-purple-500 to-pink-600"
                delay={0.2}
                isActive={activeCard === 1}
                onHover={() => setActiveCard(1)}
              />
              <SkillCard3D
                icon="📱"
                title="Mobile Dev"
                description="Native & cross-platform solutions"
                skills={["React Native", "Flutter", "iOS", "Android"]}
                color="from-green-400 to-emerald-600"
                delay={0.3}
                isActive={activeCard === 2}
                onHover={() => setActiveCard(2)}
              />
              <SkillCard3D
                icon="🤖"
                title="AI Integration"
                description="Implementing intelligent solutions"
                skills={["OpenAI", "Groq", "LangChain", "Machine Learning"]}
                color="from-orange-400 to-red-600"
                delay={0.4}
                isActive={activeCard === 3}
                onHover={() => setActiveCard(3)}
              />
              <SkillCard3D
                icon="⚡"
                title="Performance"
                description="Optimizing for speed & efficiency"
                skills={["Web Vitals", "Lighthouse", "Webpack", "Vite"]}
                color="from-yellow-400 to-orange-500"
                delay={0.5}
                isActive={activeCard === 4}
                onHover={() => setActiveCard(4)}
              />
              <SkillCard3D
                icon="🔧"
                title="Backend & DevOps"
                description="Full-stack development & deployment"
                skills={["Node.js", "Docker", "CI/CD", "AWS"]}
                color="from-teal-400 to-cyan-600"
                delay={0.6}
                isActive={activeCard === 5}
                onHover={() => setActiveCard(5)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3D Interactive Skill Card Component
function SkillCard3D({
  icon,
  title,
  description,
  skills,
  color,
  delay,
  isActive,
  onHover,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={onHover}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Animated border glow - MOVED OUTSIDE */}
      <motion.div
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        className={`absolute -inset-[2px] rounded-3xl blur-xl bg-gradient-to-br ${color} z-0`}
      />

      <motion.div
        animate={
          isActive ? { rotateY: 5, rotateX: 5 } : { rotateY: 0, rotateX: 0 }
        }
        transition={{ duration: 0.3 }}
        className={`relative bg-gradient-to-br ${color} p-[2px] rounded-3xl overflow-hidden shadow-2xl z-10`}
      >
        {/* Inner content */}
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 h-full min-h-[280px] flex flex-col">
          {/* Icon with animation */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl mb-4 inline-block"
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 flex-grow">
            {description}
          </p>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 * index }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/20 hover:border-white/40 transition-all"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Hover indicator at bottom - FIXED positioning */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isActive ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color}`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SkillsShowcase;
