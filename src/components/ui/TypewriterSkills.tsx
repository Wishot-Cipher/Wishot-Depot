"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterSkill = () => {
  const skills = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "Brand Identity",
    "Motion Graphics",
    "3D Modeling",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentSkill.length) {
          setDisplayText(currentSkill.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentSkill.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % skills.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl w-full"
    >
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-purple-500/50 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cyan-500/50 rounded-br-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Specializing In
          </span>
        </div>

        <div className="flex items-center gap-2 min-h-[40px]">
          <motion.span
            key={displayText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          >
            {displayText}
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-3xl md:text-4xl text-purple-400 font-thin"
          >
            |
          </motion.span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
    </motion.div>
  );
};
