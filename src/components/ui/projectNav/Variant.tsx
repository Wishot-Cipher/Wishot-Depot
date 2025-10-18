"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { sidebarVariants, logoVariants } from "./variants";
import { useDimensions } from "./useDimensions";
import { background, nav } from "./styles";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

export const Variant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <div>
      <motion.nav
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={nav}
      >
        {/* Animated Background */}
        <motion.div
          style={background}
          variants={sidebarVariants}
          animate={isOpen ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
        >
          {/* Animated mesh gradient */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: Math.random() * 300, y: Math.random() * 800 }}
                animate={{ x: Math.random() * 300, y: Math.random() * 800 }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute w-1 h-1 bg-white/30 rounded-full blur-sm"
              />
            ))}
          </div>
        </motion.div>

        {/* Brand Logo */}
        <motion.div
          variants={logoVariants}
          className="absolute top-20 left-8 text-white mt-1.5"
          animate={isOpen ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide">
            Dev_Wishot👓
          </h2>
          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full mt-1"
          />
        </motion.div>

        <Navigation toggle={() => setIsOpen(false)} isOpen={isOpen} />
        <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </motion.nav>
    </div>
  );
};
