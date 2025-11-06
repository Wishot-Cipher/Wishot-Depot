/* Contact Page with Toast Notifications */
import { askGroq } from "../utils/askGroq";
import { motion } from "framer-motion";
import { useState } from "react";
import { HeroCelebration } from "../components/ui/HeroCelebration";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner";

type FormErrors = { name?: string; email?: string; subject?: string; message?: string };

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Validation Failed", {
        description: "Please fill in all required fields correctly.",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show loading toast
    const loadingToast = toast.loading("Sending your message...", {
      description: "Please wait while we process your request.",
    });

    try {
      // Simulate API call (replace with your actual backend call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success("Message Sent Successfully! 🎉", {
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        duration: 5000,
      });

      console.log("Form submitted:", formData);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setErrors({});

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error("Failed to Send Message", {
        description: "Something went wrong. Please try again or contact me directly at wishotstudio@gmail.com",
        duration: 6000,
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Hero Celebration */}
      <HeroCelebration showText={false} />
      
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <ContactInfoCard
              icon={<Mail size={24} />}
              title="Email"
              info="wishotstudio@gmail.com"
              subInfo="Preferred contact method"
              color="from-cyan-500 to-blue-600"
              delay={0.5}
            />
            <ContactInfoCard
              icon={<Phone size={24} />}
              title="Phone"
              info="+234 XXX XXX XXXX"
              subInfo="Available Mon-Fri, 9AM-6PM WAT"
              color="from-purple-500 to-pink-600"
              delay={0.6}
            />
            <ContactInfoCard
              icon={<MapPin size={24} />}
              title="Location"
              info="Nigeria"
              subInfo="Open to remote opportunities worldwide"
              color="from-pink-500 to-rose-600"
              delay={0.7}
            />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-cyan-500/20" />
              <div className="relative p-6">
                <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    {
                      icon: <Github size={20} />,
                      label: "GitHub",
                      color: "cyan",
                      url: "https://github.com/Wishot-Cipher"
                    },
                    {
                      icon: <Linkedin size={20} />,
                      label: "LinkedIn",
                      color: "blue",
                      url: "https://www.linkedin.com/in/wisdom-alom-3a2033242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    },
                    {
                      icon: <Twitter size={20} />,
                      label: "Twitter (X)",
                      color: "purple",
                      url: "https://x.com/wishotstudio?s=21"
                    },
                    {
                      icon: <Instagram size={20} />,
                      label: "Instagram",
                      color: "pink",
                      url: "https://www.instagram.com/alom_wisdom/"
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-white/5 to-white/10 hover:from-cyan-500/20 hover:to-purple-600/20 rounded-xl border border-white/20 hover:border-cyan-500/40 transition-all group cursor-pointer"
                      aria-label={`Visit my ${social.label} profile`}
                    >
                      <div className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                        {social.icon}
                      </div>
                      <span className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Decorative Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: "50+", label: "Projects", color: "cyan" },
                { value: "30+", label: "Clients", color: "purple" },
                { value: "3+", label: "Years", color: "pink" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    stat.color === 'cyan' ? 'from-cyan-500/10 to-cyan-600/10' :
                    stat.color === 'purple' ? 'from-purple-500/10 to-purple-600/10' :
                    'from-pink-500/10 to-pink-600/10'
                  } backdrop-blur-xl rounded-2xl border ${
                    stat.color === 'cyan' ? 'border-cyan-500/20 group-hover:border-cyan-500/40' :
                    stat.color === 'purple' ? 'border-purple-500/20 group-hover:border-purple-500/40' :
                    'border-pink-500/20 group-hover:border-pink-500/40'
                  } transition-all`} />
                  <div className="relative p-4 text-center">
                    <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                      stat.color === 'cyan' ? 'from-cyan-400 to-cyan-600' :
                      stat.color === 'purple' ? 'from-purple-400 to-purple-600' :
                      'from-pink-400 to-pink-600'
                    } mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            {/* Glass background with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px] rounded-3xl">
              <div className="h-full w-full bg-gray-900/90 backdrop-blur-xl rounded-3xl" />
            </div>

            {/* Form Content */}
            <div className="relative p-8 space-y-6">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Name Input */}
              <ProfessionalInputField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
                error={errors.name}
                disabled={isSubmitting}
                required
              />

              {/* Email Input */}
              <ProfessionalInputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
                error={errors.email}
                disabled={isSubmitting}
                required
              />

              {/* Subject Input */}
              <ProfessionalInputField
                label="Subject"
                name="subject"
                type="text"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange}
                focused={focused}
                setFocused={setFocused}
                error={errors.subject}
                disabled={isSubmitting}
                required
              />

              {/* Message Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Message <span className="text-red-400">*</span>
                </label>
                <motion.div
                  animate={{
                    borderColor: errors.message
                      ? "rgba(239, 68, 68, 0.5)"
                      : focused === "message" 
                      ? "rgba(34, 211, 238, 0.5)" 
                      : "rgba(34, 211, 238, 0.2)",
                  }}
                  className="relative rounded-xl border-2 transition-all duration-300"
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    placeholder="Describe your project or inquiry in detail..."
                    rows={6}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-md rounded-xl text-white placeholder-gray-500 focus:outline-none resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {formData.message.length} / 1000
                  </div>
                </motion.div>
                {errors.message ? (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <span>⚠️</span> {errors.message}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Please provide as much detail as possible (min. 10 characters)
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { 
                  scale: 1.02, 
                  boxShadow: "0 10px 40px rgba(34, 211, 238, 0.4)" 
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3 group relative overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ 
                      x: ["-100%", "100%"] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  />
                )}
                <span className="relative text-lg">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                {!isSubmitting && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative"
                  >
                    <Send size={20} />
                  </motion.div>
                )}
              </motion.button>

              {/* Response Info */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-center text-sm text-gray-400">
                  Average response time: 24 hours
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Contact Info Card Component
function ContactInfoCard({ icon, title, info, subInfo, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl`} />
      <div className="relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 text-white`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm mb-1">{info}</p>
        <p className="text-gray-500 text-xs">{subInfo}</p>
      </div>
    </motion.div>
  );
}

// Professional Input Field Component with Error Handling
function ProfessionalInputField({ 
  label, 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  focused, 
  setFocused,
  error,
  disabled = false,
  required = false 
}: any) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <motion.div
        animate={{
          borderColor: error
            ? "rgba(239, 68, 68, 0.5)"
            : focused === name 
            ? "rgba(34, 211, 238, 0.5)" 
            : "rgba(34, 211, 238, 0.2)",
        }}
        className="relative rounded-xl border-2 transition-all duration-300"
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-md rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {focused === name && !error && (
          <motion.div
            layoutId="inputFocus"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <span>⚠️</span> {error}
        </motion.p>
      )}
    </div>
  );
}

// Animated Background Component
function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 opacity-30 pointer-events-none"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.4) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.4) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />
  );
}

// Floating Particles Component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          transition={{
            duration: Math.random() * 25 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-1.5 h-1.5 bg-white/20 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}