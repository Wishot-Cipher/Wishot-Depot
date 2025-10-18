import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { navVariants, itemVariants } from "./variants";
import { list, listItem } from "./styles";
import { MenuItem } from "./MenuItem";

export const Navigation = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "About", path: "/about", icon: "👤" },
    { name: "Skills", path: "/skills", icon: "🪄" },
    { name: "Projects", path: "/projects", icon: "💼" },
    { name: "Blog", path: "/blog", icon: "📝" },
    { name: "Contact", path: "/contact", icon: "📧" },
  ];

  return (
    <motion.ul
      style={list}
      variants={navVariants}
      animate={isOpen ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
    >
      {navItems.map((item, i) => (
        <MenuItem key={item.path} item={item} i={i} isActive={location.pathname === item.path} toggle={toggle} />
      ))}

      <motion.li variants={itemVariants} style={{ ...listItem, marginTop: 40 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg"
        >
          Get Started →
        </motion.button>
      </motion.li>
    </motion.ul>
  );
};
