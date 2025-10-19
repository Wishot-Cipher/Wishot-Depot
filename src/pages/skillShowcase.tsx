import { motion } from "framer-motion";
import { useState } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import { FloatingParticles } from "../components/ui/skillShowcase/FloatingParticles";

export const SkillsShowcase = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] bg-gradient-to-br from-gray-900 to-blue-950 ">
      {/* Changed: Removed 'flex items-center' from this div */}
      <div className="relative z-[10] max-w-full mx-auto px-6 py-20 overflow-hidden min-h-screen ">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
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
          {/* Floating particles */}
          <FloatingParticles />
        </div>
        <HeroCelebration showText={false} />

        {/* Core content */}
        <div className="relative w-full flex flex-col lg:flex-row gap-8 justify-center">
          {/* Interactive 3D Skill Cards */}
          <div className="relative w-full max-w-7xl mx-auto ">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 mt-6 md:mt-0"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-block"
              >
                <div className="relative ">
                  <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                    Skills Arsenal
                  </h2>
                  <motion.div
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                  />
                </div>
              </motion.div>
              <p className="text-gray-400 text-lg mt-4">
                Hover to explore my expertise
              </p>
            </motion.div>

            {/* Skill Cards Grid with 3D effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                icon="🎭"
                title="Animation"
                description="Bringing interfaces to life"
                skills={["Framer Motion", "GSAP", "Three.js", "Lottie"]}
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
                title="DevOps"
                description="Automating deployment & infrastructure"
                skills={["Docker", "CI/CD", "AWS", "Vercel"]}
                color="from-teal-400 to-cyan-600"
                delay={0.6}
                isActive={activeCard === 5}
                onHover={() => setActiveCard(5)}
              />
            </div>

            {/* Skill Level Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">
                Proficiency Levels
              </h3>
              <div className="space-y-4">
                <SkillBar
                  skill="Frontend Development"
                  level={95}
                  color="cyan"
                />
                <SkillBar skill="UI/UX Design" level={90} color="purple" />
                <SkillBar
                  skill="Backend Development"
                  level={80}
                  color="green"
                />
                <SkillBar skill="Mobile Development" level={85} color="pink" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3D Interactive Skill Card
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
      <motion.div
        animate={
          isActive ? { rotateY: 5, rotateX: 5 } : { rotateY: 0, rotateX: 0 }
        }
        transition={{ duration: 0.3 }}
        className={`relative bg-gradient-to-br ${color} p-[2px] rounded-3xl overflow-hidden`}
      >
        {/* Inner content */}
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 h-full">
          {/* Icon with glow */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="text-6xl mb-4 inline-block"
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 * index }}
                className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/20"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Hover indicator */}
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color}`}
          />
        </div>

        {/* Animated border glow */}
        <motion.div
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          className="absolute inset-0 rounded-3xl blur-xl opacity-0 transition-opacity"
          style={{
            background: `linear-gradient(45deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated Skill Bar
function SkillBar({ skill, level, color }) {
  const colors = {
    cyan: "from-cyan-400 to-blue-500",
    purple: "from-purple-400 to-pink-500",
    green: "from-green-400 to-emerald-500",
    pink: "from-pink-400 to-rose-500",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">{skill}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full relative`}
        >
          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 blur-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default SkillsShowcase;