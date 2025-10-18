import { Variants } from "framer-motion";

export const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: { type: "spring", stiffness: 30, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: { delay: 0.1, type: "spring", stiffness: 250, damping: 40 },
  },
};

export const navVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

export const itemVariants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

export const logoVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
  closed: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};
