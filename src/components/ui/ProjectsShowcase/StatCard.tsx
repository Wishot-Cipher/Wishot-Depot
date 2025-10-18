// components/ProjectsShowcase/StatCard.tsx
import { motion } from "framer-motion";

interface StatCardProps {
  number: string;
  label: string;
  icon: string;
  color: string;
}

export const StatCard = ({ number, label, icon, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`relative bg-gradient-to-br ${color} p-[2px] rounded-2xl overflow-hidden`}
  >
    <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{number}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  </motion.div>
);
