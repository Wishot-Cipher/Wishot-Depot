"use client";

import { HeroCelebration } from "@/components/ui/HeroCelebration";
import { ResponsiveNav } from "@/components/ui/projectNav/ResponsiveNav";
import { FloatingBackground } from "@/components/ui/FloatingShape";
import { TypewriterSkill } from "@/components/ui/TypewriterSkills";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div
      className="
        relative 
        md:w-[98.8vw]
        w-[100vw]
        h-auto
        overflow-hidden 
        rounded-none 
        bg-[#0A0A0A] 
        bg-gradient-to-br 
        from-gray-900 
        to-blue-950 
        border-foreground
      "
    >

        <HeroCelebration />
      <ResponsiveNav />
      <FloatingBackground />

      <div className="relative z-[10] max-w-full mx-auto px-6 py-12 overflow-hidden min-h-screen flex items-center">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none overflow-x-hidden" />

        {/* Glowing background orbs */}
        <div className="absolute top-20 right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Core Content */}
        <div className="relative w-full flex flex-col lg:flex-row lg:gap-8 items-center">
          {/* Left Section */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2  justify-center md:mb-10 ml-0 md:ml-8 mt-18 md:mt-12 lg:mt-0"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Available for work</span>
            </motion.div>

            {/* Headline */}
            <div className="relative z-10 md:mt-8 mt-20 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-10 rounded-full border-4 border-white/70 backdrop-blur-sm" />
                <div className="w-20 h-1 bg-white/70 backdrop-blur-sm" />
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  className="text-white/80 backdrop-blur-sm"
                >
                  <path
                    d="M10 25 L35 25 M35 25 L28 18 M35 25 L28 32"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none text-white mb-14"
              >
                <span className="px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                  Creative
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4 mb-14"
              >
                <div className="px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-3">
                  <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none text-white">
                    Developer
                  </h1>
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-4xl md:text-7xl text-white/80"
                  >
                    ↗
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"
              >
                <span className="px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  & Designer
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex-shrink-0 w-full lg:w-[450px] mt-12 lg:mt-0 flex items-center justify-center">
            <TypewriterSkill />
          </div>
        </div>
      </div>
    </div>
  );
};
