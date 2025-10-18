import { motion } from "framer-motion";
import { Project } from "./types";

export const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 50 }}
      onClick={(e) => e.stopPropagation()}
      className={`relative bg-gradient-to-br ${project.color} p-[2px] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto`}
    >
      <div className="bg-gray-900 rounded-3xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="text-9xl mb-4">{project.image}</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-gray-400 text-lg">{project.description}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-lg text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Project Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {String(value)}
                  </div>
                  <div className="text-gray-400 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.a
            href={project.link}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`block w-full py-4 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold text-center text-lg`}
          >
            Visit Live Project →
          </motion.a>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
