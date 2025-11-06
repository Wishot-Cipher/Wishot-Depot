import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Hero } from './pages/Hero'
import SkillsShowcase from './pages/skillShowcase'
import ProjectsShowcase from './pages/ProjectsShowcase'
import { ResponsiveNav } from './components/ui/projectNav/ResponsiveNav'
import AboutPage from './pages/About'
import BlogPage from './pages/Blogs'
import ContactSection from './pages/Contact'
import { Toaster } from './components/ui/sonner'
import MinimalFooter from './pages/Footer'

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            color: '#ffffff',
            padding: '16px 20px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(34, 211, 238, 0.1)',
            fontSize: '14px',
            fontWeight: '500',
          },
          duration: 4000,
        }}
      />
      <ResponsiveNav />
      {/* <Variant /> This can be your Navbar with links */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/skills" element={<SkillsShowcase />} />
        <Route path="/projects" element={<ProjectsShowcase />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
      <MinimalFooter />
    </Router>
  )
}

export default App
