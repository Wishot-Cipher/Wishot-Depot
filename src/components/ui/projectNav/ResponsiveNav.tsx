"use client";

import { motion, useAnimation, useInView, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Variant as MobileNav } from "./Variant";
import type { Variants } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

/* ============================================================
   SMOKE VARIANTS
============================================================ */
const smokeVariants: Variants = {
  initial: { opacity: 0.4, x: 0 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    x: ["-30%", "30%", "-30%"],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

/* ============================================================
   MEDIA QUERY HOOK
============================================================ */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

/* ============================================================
   RESPONSIVE NAV WRAPPER
============================================================ */
export const ResponsiveNav = () => {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  return <>{isLarge ? <GlassNav /> : <MobileNav />}</>;
};

/* ============================================================
   GLASS NAV (Large screens)
============================================================ */
const GlassNav = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  const location = useLocation();

  useEffect(() => {
    if (inView) controls.start("animate");
  }, [controls, inView]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <motion.nav
        ref={ref}
        className="mt-4 w-[90%] lg:w-[80%] rounded-2xl border border-white/20 
        bg-white/10 backdrop-blur-md shadow-lg 
        flex justify-between items-center px-6 py-2 overflow-hidden"
        initial="initial"
        animate="animate"
      >
        {/* === Animated Smoke Background === */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden rounded-2xl"
          variants={smokeVariants}
          animate="animate"
        >
          <motion.div className="absolute w-[250%] h-[250%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-gradient" />
          <motion.div
            className="absolute w-[250%] h-[250%] bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 opacity-10 blur-2xl mix-blend-screen"
            animate={{ x: ["0%", "-40%", "0%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: easeInOut,
            }}
          />
        </motion.div>

        {/* === Brand / Logo === */}
        <motion.span
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="bg-gradient-to-r from-red-500 via-rose-600 to-orange-400 bg-[length:200%_200%] bg-clip-text text-transparent text-border-2 font-extrabold text-md md:text-l lg:text-xl"
        >
          Dev_Wishot👓
        </motion.span>

        {/* === Nav Links === */}
        <ul className="hidden lg:flex gap-8 text-white/90 font-medium relative">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative cursor-pointer transition-transform"
              >
                <Link
                  to={item.path}
                  className={`relative z-10 no-underline transition-colors ${
                    isActive ? "text-white" : "text-white/90 hover:text-white"
                  }`}
                  style={{
                    color: isActive ? "white" : "rgba(255,255,255,0.9)",
                    textDecoration: "none",
                  }}
                >
                  {item.name}

                  {/* Active indicator - Glowing dot above */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-6 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-sm"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Active indicator - Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}

                  {/* Hover effect for non-active items */}
                  {!isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/40 rounded-full opacity-0 "
                      whileHover={{ opacity: 1, scaleX: 1 }}
                      initial={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* === CTA Button === */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="bg-[length:200%_200%] bg-gradient-to-r
             from-[#08BA69] via-[#1E3A8A]  to-[#D97706]
             text-white px-4 py-2 rounded-lg shadow-md
             hover:shadow-blue-500/40"
        >
          Get Started
        </motion.button>
      </motion.nav>
    </div>
  );
};
