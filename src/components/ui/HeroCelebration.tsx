"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const COLORS = [
  "from-white to-gray-400",
  "from-black to-gray-800",
  "from-pink-400 to-purple-500",
  "from-blue-400 to-cyan-500",
  "from-yellow-300 to-amber-500",
];

// Define prop types
interface HeroCelebrationProps {
  text?: string; // optional text prop
  showText?: boolean; // control whether to show text
}

export const HeroCelebration = ({
  text = "🎉 You Really Should Hire Me! 🎉",
  showText = true,
}: HeroCelebrationProps) => {
  const [particles, setParticles] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(
        Array.from({ length: isMobile ? 6 : 15 }, () => Math.random())
      );
      setTimeout(() => setParticles([]), 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-0">
      {/* === Darker Gradient Background === */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#0f1115] opacity-90 bg-[length:200%_200%]"
      />

      {/* === Floating Multicolor Particles === */}
      {particles.map((_, i) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = randomBetween(isMobile ? 1 : 2, isMobile ? 3 : 4);
        return (
          <motion.div
            key={i}
            initial={{
              x: randomBetween(0, window.innerWidth),
              y: randomBetween(window.innerHeight / 2, window.innerHeight),
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: randomBetween(0, window.innerHeight / 3),
              opacity: [0.2, 1, 0],
              scale: [1, 1.4, 0.8],
            }}
            transition={{
              duration: randomBetween(2, 4),
              ease: "easeOut",
            }}
            className={`absolute w-${size} h-${size} bg-gradient-to-r ${color} rounded-full blur-[1px]`}
          />
        );
      })}

      {/* === Celebration Text (optional) === */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          className="absolute top-22 right-9 text-right z-[30] md:top-32 md:left-1/2 md:-translate-x-1/2 md:text-center"
        >
          <motion.h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 font-extrabold drop-shadow-lg text-xl leading-tight md:text-4xl md:leading-tight"
            animate={{
              textShadow: [
                "0 0 10px rgba(168,85,247,0.7)",
                "0 0 25px rgba(56,189,248,0.8)",
                "0 0 10px rgba(168,85,247,0.7)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.h2>
        </motion.div>
      )}
    </div>
  );
};
