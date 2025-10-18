import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Hero } from './pages/Hero'
import SkillsShowcase from './pages/skillShowcase'
import ProjectsShowcase from './pages/ProjectsShowcase'
import { ResponsiveNav } from './components/ui/projectNav/ResponsiveNav'

function App() {
  return (
    <Router>
      <ResponsiveNav />
      {/* <Variant /> This can be your Navbar with links */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/skills" element={<SkillsShowcase />} />
        <Route path="/projects" element={<ProjectsShowcase />} />
        <Route path="/profile" element={<ProfileCard />} />
      </Routes>
    </Router>
  )
}

export default App
