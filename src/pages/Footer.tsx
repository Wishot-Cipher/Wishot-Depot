import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ExternalLink
} from "lucide-react";
import { HeroCelebration } from "@/components/ui/HeroCelebration";
import { AnimatedBackground, FloatingParticles } from "./Blogs";

export default function ProfessionalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      {/* Hero Celebration */}
      <HeroCelebration showText={false} />
      
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-12 lg:py-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6 md:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl shadow-cyan-500/20"
              >
                <div className="w-full h-full bg-[#0A0A0A] rounded-2xl flex items-center justify-center">
                  <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    W
                  </span>
                </div>
              </motion.div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">Dev_Wishot</h3>
                <p className="text-xs text-gray-500">Alom Wisdom</p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting exceptional digital experiences with modern web technologies and AI integration.
            </p>

            {/* Quick Stats */}
            <div className="flex gap-4 lg:gap-6 pt-2">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                  50+
                </div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  3+
                </div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                  30+
                </div>
                <div className="text-xs text-gray-500">Clients</div>
              </div>
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6"
          >
            <h4 className="text-base lg:text-lg font-semibold text-white flex items-center gap-2">
              Services
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
            </h4>
            <ul className="space-y-2 lg:space-y-3 text-sm text-gray-300">
              {[
                "Web Development",
                "AI Integration",
                "UI/UX Design",
                "React Applications",
                "Next.js Solutions",
                "API Development",
              ].map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-1.5 flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 lg:space-y-6"
          >
            <h4 className="text-base lg:text-lg font-semibold text-white flex items-center gap-2">
              Connect
              <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
            </h4>
            
            {/* Social Links */}
            <div>
              <p className="text-xs text-gray-500 mb-4">Follow me on social media</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    icon: <Github size={20} />, 
                    label: "GitHub",
                    href: "https://github.com/Wishot-Cipher",
                    gradient: "from-cyan-400 to-cyan-600",
                    hoverBorder: "hover:border-cyan-400/50",
                    hoverBg: "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-cyan-600/10"
                  },
                  { 
                    icon: <Linkedin size={20} />, 
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/wisdom-alom-3a2033242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                    gradient: "from-cyan-400 via-blue-400 to-purple-400",
                    hoverBorder: "hover:border-blue-400/50",
                    hoverBg: "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-blue-500/10 hover:to-purple-500/10"
                  },
                  { 
                    icon: <Twitter size={20} />, 
                    label: "Twitter (X)",
                    href: "https://x.com/wishotstudio?s=21",
                    gradient: "from-purple-400 to-purple-600",
                    hoverBorder: "hover:border-purple-400/50",
                    hoverBg: "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-purple-600/10"
                  },
                  { 
                    icon: <Instagram size={20} />, 
                    label: "Instagram",
                    href: "https://www.instagram.com/alom_wisdom/",
                    gradient: "from-pink-400 via-purple-400 to-pink-600",
                    hoverBorder: "hover:border-pink-400/50",
                    hoverBg: "hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-pink-600/10"
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all ${social.hoverBorder} ${social.hoverBg} group overflow-hidden`}
                    style={{
                      '--gradient': `linear-gradient(to right, ${social.gradient.replace('from-', '').replace('to-', '').replace('via-', '')})`,
                    } as React.CSSProperties}
                    aria-label={social.label}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-10`} />
                    </div>
                    
                    <div className={`flex-shrink-0 relative z-10`}>
                      {social.icon}
                    </div>
                    <span className={`text-sm font-medium relative z-10 text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${social.gradient} transition-all`}>
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Email CTA */}
            <motion.a
              href="mailto:wishotstudio@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white transition-all group overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all" />
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
              
              <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all">
                wishotstudio@gmail.com
              </span>
              <ExternalLink size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        />

        {/* Bottom Bar */}
        <div className="py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xs lg:text-sm text-gray-500"
            >
              <span>© {currentYear} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                Dev_Wishot
              </span>
              <span>. All rights reserved.</span>
            </motion.div>

            {/* Tech Stack Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs text-gray-400">
                  Built with React • TypeScript • Tailwind
                </span>
              </div>
            </motion.div>

            {/* Design Credit */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs text-gray-500"
            >
              <span>Designed & Developed by</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                Dev_Wishot
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
      />
    </footer>
  );
}