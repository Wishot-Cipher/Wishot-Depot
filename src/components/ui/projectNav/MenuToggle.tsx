import { motion } from "framer-motion";

export const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => (
  <motion.div
    style={{ pointerEvents: "auto" }}
    className="sticky top-2 left-4 z-30 flex items-center gap-3 px-2 py-1 rounded-xl border backdrop-blur-lg mx-1.5"
    animate={
      isOpen
        ? {
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(255,255,255,0)",
          }
        : {
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.2)",
          }
    }
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      aria-label="Toggle menu"
      onMouseDown={(e) => e.preventDefault()} // prevent click focusing (removes click outline)
      className="flex items-center justify-center outline-none border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white appearance-none"
      style={{ border: "none" }}
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 34 34"
        stroke="white"
        strokeWidth={2.5}
        fill="none"
      >
        <motion.path
          variants={{
            closed: { d: "M 4 8 L 29 8" },
            open: { d: "M 6 6 L 28 28" },
          }}
          strokeLinecap="round"
        />
        <motion.path
          variants={{
            closed: { opacity: 1, d: "M 4 17 L 29 17" },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
          strokeLinecap="round"
        />
        <motion.path
          variants={{
            closed: { d: "M 4 26 L 29 26" },
            open: { d: "M 6 28 L 28 6" },
          }}
          strokeLinecap="round"
        />
      </svg>
    </motion.button>

    <motion.span
      animate={isOpen ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide"
    >
      Dev_Wishot
    </motion.span>
  </motion.div>
);
