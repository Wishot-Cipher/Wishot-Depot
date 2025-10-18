"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import { FloatingParticles } from "../components/ui/ProjectsShowcase/FloatingParticles";
import { ProjectCard } from "../components/ui/ProjectsShowcase/ProjectCard";
import { StatCard } from "../components/ui/ProjectsShowcase/StatCard";
import { ProjectModal } from "../components/ui/ProjectsShowcase/ProjectModal";
import { projects, categories } from "../components/ui/ProjectsShowcase/data";
import { Project } from "../components/ui/ProjectsShowcase/types";

export const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] bg-gradient-to-br from-gray-900 to-blue-950">
      <HeroCelebration showText={false} />
      <div className="relative z-[10] max-w-full mx-auto px-6 py-8 overflow-hidden min-h-screen">
        {/* === Gradient Animated Background === */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 opacity-30"
        />

        <FloatingParticles />

        <div className="relative w-full max-w-7xl mx-auto pt-20">
          {/* === Section Header === */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-block"
            >
              <div className="relative">
                <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                  Featured Work
                </h2>
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                />
              </div>
            </motion.div>
            <p className="text-gray-400 text-lg mt-4">
              Crafting digital experiences that make an impact
            </p>
          </motion.div>

          {/* === Filter Buttons === */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full backdrop-blur-md border transition-all ${
                  filter === cat.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 border-white/40 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* === Projects Grid === */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* === Stats Section === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            <StatCard
              number="50+"
              label="Projects Completed"
              icon="✅"
              color="from-green-400 to-emerald-600"
            />
            <StatCard
              number="30+"
              label="Happy Clients"
              icon="😊"
              color="from-blue-400 to-cyan-600"
            />
            <StatCard
              number="100K+"
              label="Lines of Code"
              icon="💻"
              color="from-purple-400 to-pink-600"
            />
            <StatCard
              number="5+"
              label="Years Experience"
              icon="🚀"
              color="from-orange-400 to-red-600"
            />
          </motion.div>
        </div>
      </div>

      {/* === Project Modal === */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsShowcase;
