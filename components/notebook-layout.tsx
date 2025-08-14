"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PenTool, Moon, Sun, Gamepad2, Coffee, Zap, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotebookLayoutProps {
  onNavigate: (section: "skills" | "projects" | "secret" | "contact") => void
}

export default function NotebookLayout({ onNavigate }: NotebookLayoutProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [annotations, setAnnotations] = useState<
    Array<{ id: number; x: number; y: number; text: string; rotation: number; type: string }>
  >([])

  useEffect(() => {
    // Generate random annotations with physics calculations and doodles
    const newAnnotations = [
      { id: 1, x: 5, y: 15, text: "F = ma", rotation: -2, type: "physics" },
      { id: 2, x: 75, y: 25, text: "console.log('Hello World!')", rotation: 1, type: "code" },
      { id: 3, x: 15, y: 75, text: "{ creativity: 'infinite' }", rotation: -1, type: "code" },
      { id: 4, x: 85, y: 65, text: "E = mc²", rotation: 2, type: "physics" },
      { id: 5, x: 45, y: 85, text: "∫ f(x)dx", rotation: -1.5, type: "math" },
      { id: 6, x: 25, y: 45, text: "v = u + at", rotation: 1.5, type: "physics" },
      { id: 7, x: 65, y: 15, text: "npm install happiness", rotation: -0.5, type: "code" },
      { id: 8, x: 10, y: 55, text: "sin²θ + cos²θ = 1", rotation: 2, type: "math" },
    ]
    setAnnotations(newAnnotations)
  }, [])

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative ${
        darkMode ? "bg-gray-900 text-green-400" : "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50"
      }`}
    >
      {/* Realistic notebook texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Spiral binding holes */}
        <div className="absolute left-12 top-0 bottom-0 w-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gray-400 rounded-full absolute"
              style={{ top: `${i * 5 + 2}%`, left: "-6px" }}
            />
          ))}
        </div>

        {/* Ruled lines */}
        <div
          className="w-full h-full ml-16"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, transparent 29px, #e5e7eb 29px, #e5e7eb 31px, transparent 31px)
            `,
            backgroundSize: "100% 32px",
          }}
        />

        {/* Red margin line */}
        <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-red-300" />
      </div>

      {/* Background doodles and calculations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Tic-tac-toe game */}
        <div className="absolute top-32 right-32 opacity-30">
          <svg width="60" height="60" className={darkMode ? "text-green-500" : "text-gray-400"}>
            {/* Grid */}
            <line x1="20" y1="0" x2="20" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="0" x2="40" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
            {/* X's and O's */}
            <text x="10" y="15" fontSize="12" fill="currentColor">
              X
            </text>
            <text x="30" y="15" fontSize="12" fill="currentColor">
              O
            </text>
            <text x="10" y="35" fontSize="12" fill="currentColor">
              O
            </text>
            <text x="50" y="35" fontSize="12" fill="currentColor">
              X
            </text>
            <text x="30" y="55" fontSize="12" fill="currentColor">
              X
            </text>
          </svg>
        </div>

        {/* Physics diagram */}
        <div className="absolute bottom-40 left-32 opacity-25">
          <svg width="80" height="60" className={darkMode ? "text-green-500" : "text-gray-400"}>
            {/* Inclined plane */}
            <line x1="10" y1="50" x2="70" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" />
            {/* Block */}
            <rect x="35" y="30" width="10" height="8" fill="currentColor" opacity="0.7" />
            {/* Force arrow */}
            <line x1="40" y1="34" x2="55" y2="25" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="45" y="20" fontSize="8" fill="currentColor">
              F
            </text>
          </svg>
        </div>

        {/* Silly doodle */}
        <div className="absolute top-1/2 left-1/4 opacity-20">
          <svg width="40" height="40" className={darkMode ? "text-green-500" : "text-gray-400"}>
            {/* Smiley face */}
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="15" cy="15" r="2" fill="currentColor" />
            <circle cx="25" cy="15" r="2" fill="currentColor" />
            <path d="M 12 25 Q 20 30 28 25" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Coffee stains */}
        <div className="absolute top-32 right-40 w-20 h-16 bg-amber-800/15 rounded-full blur-sm transform rotate-12" />
        <div className="absolute bottom-60 left-32 w-12 h-10 bg-amber-900/20 rounded-full blur-sm" />

        {/* Ink blots */}
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-800/30 rounded-full blur-sm" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black/20 rounded-full" />

        {/* Torn corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-200/50 transform rotate-45 translate-x-8 -translate-y-8" />

        {/* Folded corner */}
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/80 transform rotate-45 shadow-sm" />
      </div>

      {/* Mode toggle with realistic pen design */}
      <Button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-10 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300"
        variant="outline"
        size="icon"
      >
        {darkMode ? <Sun className="w-4 h-4 text-yellow-600" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        <PenTool className="w-3 h-3 absolute -bottom-1 -right-1 text-amber-700" />
      </Button>

      <div className="container mx-auto px-8 py-16 relative ml-20">
        {/* Main content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header with handwritten style */}
          <div className="text-center mb-16 relative">
            <motion.h1
              className={`text-6xl font-bold mb-4 transform -rotate-1 ${darkMode ? "text-green-400" : "text-gray-800"}`}
              style={{ fontFamily: "'Kalam', cursive" }}
            >
              The Hacker's Journal
            </motion.h1>
            <motion.p
              className={`text-xl transform rotate-0.5 ${darkMode ? "text-green-300" : "text-gray-600"}`}
              style={{ fontFamily: "'Kalam', cursive" }}
            >
              -Sneha Kushwaha
            </motion.p>

            {/* Realistic doodles */}
            <div className="absolute -left-16 top-4">
              <svg width="40" height="40" className={darkMode ? "text-green-500" : "text-gray-400"}>
                <path d="M5,20 Q20,5 35,20 Q20,35 5,20" stroke="currentColor" fill="none" strokeWidth="2" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </svg>
            </div>

            <div className="absolute -right-20 top-8 transform rotate-12">
              <p
                className={`text-sm ${darkMode ? "text-green-500" : "text-gray-500"}`}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Est. 2025 ✨<br />
                <span className="text-xs">v2.0.1</span>
              </p>
            </div>
          </div>

          {/* Navigation cards with realistic paper effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className={`p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all shadow-lg relative ${
                darkMode
                  ? "bg-gray-800 border-green-400 hover:bg-gray-700"
                  : "bg-white/90 border-gray-400 hover:bg-white shadow-amber-100"
              }`}
              onClick={() => onNavigate("skills")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/20 rounded-lg" />

              <Gamepad2 className="w-8 h-8 mb-4 text-blue-500 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
                Skills Village
              </h3>
              <p className="text-sm opacity-75 relative z-10">Explore my skill buildings</p>

              <div className="absolute bottom-4 left-6 right-6 h-0.5 bg-blue-300 transform -rotate-0.5 opacity-60" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              className={`p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all shadow-lg relative ${
                darkMode
                  ? "bg-gray-800 border-green-400 hover:bg-gray-700"
                  : "bg-white/90 border-gray-400 hover:bg-white shadow-amber-100"
              }`}
              onClick={() => onNavigate("projects")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/20 rounded-lg" />

              <Coffee className="w-8 h-8 mb-4 text-amber-500 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
                Break Room
              </h3>
              <p className="text-sm opacity-75 relative z-10">Take a moment to relax before viewing projects</p>

              <div className="absolute bottom-4 left-6 right-6 h-0.5 bg-amber-300 transform rotate-0.5 opacity-60" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className={`p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all shadow-lg relative ${
                darkMode
                  ? "bg-gray-800 border-green-400 hover:bg-gray-700"
                  : "bg-white/90 border-gray-400 hover:bg-white shadow-amber-100"
              }`}
              onClick={() => onNavigate("secret")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/20 rounded-lg" />

              <Zap className="w-8 h-8 mb-4 text-purple-500 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
                Secret Vault
              </h3>
              <p className="text-sm opacity-75 relative z-10">The hacker's hidden laboratory</p>

              <div className="absolute bottom-4 left-6 right-6 h-0.5 bg-purple-300 transform -rotate-0.5 opacity-60" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              className={`p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all shadow-lg relative ${
                darkMode
                  ? "bg-gray-800 border-green-400 hover:bg-gray-700"
                  : "bg-white/90 border-gray-400 hover:bg-white shadow-amber-100"
              }`}
              onClick={() => onNavigate("contact")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/20 rounded-lg" />

              <Mail className="w-8 h-8 mb-4 text-green-500 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
                Contact Me
              </h3>
              <p className="text-sm opacity-75 relative z-10">Scattered sticky notes with my info</p>

              <div className="absolute bottom-4 left-6 right-6 h-0.5 bg-green-300 transform rotate-0.5 opacity-60" />
            </motion.div>
          </div>

          {/* About section with realistic journal entry */}
          <div
            className={`p-8 rounded-lg relative shadow-lg ${
              darkMode ? "bg-gray-800/50" : "bg-white/80 shadow-amber-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/10 rounded-lg" />

            <h2 className="text-3xl font-bold mb-4 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
              About My Journey
            </h2>
            <p className="text-lg leading-relaxed mb-4 relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
              Hi! I’m Sneha Kushwaha, a final-year B.Tech Computer Science student at Baderia Global Institue of Engineering and Management, with a strong interest in front end web development, data analytics, business intelligence, and AI development. I’ve built impactful projects like Volt AI, a voice-based assistant with a futuristic UI, and dynamic Power BI dashboards analyzing credit card and retail data.
            </p>
            <p className="text-lg leading-relaxed relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
              As the Vice Chair of the IEEE Student Chapter, I co-led multiple tech initiatives to foster learning and innovation on campus. I enjoy transforming complex datasets into actionable insights and building smart, user-friendly tech solutions. I’ve also actively participated in national-level hackathons, where I’ve tackled real-world problems using data, automation, and creativity—earning recognition for innovative and practical solutions.
            </p>

            {/* Signature */}
            <div className="mt-6 text-right relative z-10">
              <p
                className={`text-sm italic ${darkMode ? "text-green-400" : "text-gray-600"}`}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                
                <span className="text-xs">- The Dreamer</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic annotations with realistic handwriting */}
        {annotations.map((annotation) => (
          <motion.div
            key={annotation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: annotation.id * 0.8 }}
            className={`absolute text-xs transform ${
              darkMode
                ? "text-green-500"
                : annotation.type === "physics"
                  ? "text-blue-500"
                  : annotation.type === "math"
                    ? "text-purple-500"
                    : "text-gray-500"
            }`}
            style={{
              top: `${annotation.y}%`,
              left: `${annotation.x}%`,
              transform: `rotate(${annotation.rotation}deg)`,
              fontFamily: annotation.type === "code" ? "'Fira Code', monospace" : "'Kalam', cursive",
            }}
          >
            {annotation.text}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
