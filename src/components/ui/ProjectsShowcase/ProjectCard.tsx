import { motion } from "framer-motion";
import { useState } from "react";
import { Project } from "./types";

export const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={isHovered ? { rotateY: 3, rotateX: 3 } : { rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-gradient-to-br ${project.color} p-[2px] rounded-3xl overflow-hidden h-full`}
      >
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 h-full flex flex-col">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-8xl mb-4 text-center"
          >
            {project.image}
          </motion.div>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20 uppercase">
              {project.category}
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">
            {project.description}
          </p>

          <div className="flex gap-4 mb-4 text-sm">
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-white font-bold">{String(value)}</div>
                <div className="text-gray-500 text-xs capitalize">{key}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold relative overflow-hidden group`}
          >
            <span className="relative z-10">View Project →</span>
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white/20"
            />
          </motion.button>

          <motion.div
            animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
            className={`absolute inset-0 rounded-3xl blur-2xl bg-gradient-to-br ${project.color} -z-10`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
