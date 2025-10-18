import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { itemVariants } from "./variants";
import { listItem } from "./styles";

interface MenuItemProps {
  item: { name: string; path: string; icon: string };
  i: number;
  isActive: boolean;
  toggle: () => void;
}

export const MenuItem = ({ item, i, isActive, toggle }: MenuItemProps) => {
  const colors = [
    "from-cyan-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-green-400 to-emerald-500",
    "from-orange-400 to-red-500",
    "from-yellow-400 to-orange-500",
  ];

  return (
    <motion.li style={listItem} variants={itemVariants} whileHover={{ x: 10 }} whileTap={{ scale: 0.95 }}>
      <Link to={item.path} onClick={toggle} className="flex items-center w-full gap-4 group">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-2xl shadow-lg relative overflow-hidden`}
        >
          <span className="relative z-10">{item.icon}</span>
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 rounded-2xl"
            />
          )}
        </motion.div>

        <div className="flex-1 relative">
          <span className={`text-lg font-semibold ${isActive ? "text-white" : "text-white/80"}`}>{item.name}</span>

          {isActive ? (
            <motion.div
              layoutId="activeMobile"
              className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${colors[i]} rounded-full`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ) : (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        <motion.div
          animate={isActive ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className={`text-white/60 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          →
        </motion.div>
      </Link>
    </motion.li>
  );
};
