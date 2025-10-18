"use client";

import { motion } from "framer-motion";

export const FloatingBackground = () => {
  const shapes = [
    { color: "bg-pink-500", size: 100, top: "top-28 md:top-16 left-6 md:left-12", delay: 0 },
    { color: "bg-blue-500", size: 70, top: "top-40 md:top-32 right-6 md:right-20 lg:hidden", delay: 0.3 },
    { color: "bg-green-400", size: 60, top: "top-48 md:top-40 right-20 md:right-60 hidden lg:block", delay: 0.4 },
    { color: "bg-yellow-400", size: 90, top: "bottom-20 md:bottom-14 right-12 md:right-36 lg:hidden", delay: 0.6 },
    { color: "bg-orange-500", size: 45, top: "top-1/2 md:top-[45%] right-4 md:right-10 lg:hidden", delay: 0.8 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 0.9, scale: 1, y: [0, -10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: shape.delay,
          }}
          style={{ width: shape.size, height: shape.size }}
          className={`absolute ${shape.top} ${shape.color} rounded-full 
            bg-opacity-20 md:bg-opacity-30 blur-[2px] md:blur-[3px]
            shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm border border-white/10 pointer-events-none`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-xl" />
        </motion.div>
      ))}
    </>
  );
};
