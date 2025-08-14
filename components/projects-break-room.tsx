"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Coffee, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectsBreakRoomProps {
  onBack: () => void
  showPopup: (message: string) => void
}

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  type: "major" | "hackathon"
  color: string
  demoUrl?: string
  githubUrl?: string
  image: string
}

export default function ProjectsBreakRoom({ onBack, showPopup }: ProjectsBreakRoomProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [hasWaited, setHasWaited] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [steamAnimation, setSteamAnimation] = useState(true)

  useEffect(() => {
    if (timeLeft > 0 && !hasWaited) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !hasWaited) {
      setHasWaited(true)
      setTimeout(() => setShowProjects(true), 1000)
    }
  }, [timeLeft, hasWaited])

  const handleEarlyClick = () => {
    if (!hasWaited) {
      showPopup("Whoa, can't you chill for just a sec? Try again! 😄")
    }
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Volt AI – A JARVIS-Inspired Voice Assistant",
      description: "A JARVIS-style voice assistant using React and FastAPI",
      longDescription:
        "Volt AI is a fully functional, futuristic voice assistant built with ReactJS for the frontend and FastAPI for the backend. Inspired by Marvel's JARVIS, Volt AI listens to your voice, processes commands using AI logic, and responds with intelligent outputs through a sleek HUD-style UI.",
      technologies: ["Next.js", "TypeScript", "AI SDK", "FastAPI", "Python"],
      features: [
        "Real-time messaging",
        "AI model integration",
        "Context-aware responses",
        "Beautiful animations",
        "Responsive design",
      ],
      type: "major",
      color: "from-blue-600 to-purple-600",
      image: "/volt.png",
      demoUrl: "",
      githubUrl: "https://github.com/snehakushwaha874/voltai",
    },
    {
      id: 2,
      title: "DataAnalyzer",
      description: "Data analyzer that visually represents data.",
      longDescription:
        "A simple yet powerful Python tool for analyzing and visualizing sales data using Pandas, Matplotlib, and Seaborn.",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "Material-UI"],
      features: [
        "Real-time analytics",
        "Inventory management",
        "Customer insights",
        "Sales tracking",
        "Mobile responsive",
      ],
      type: "major",
      color: "from-green-600 to-teal-600",
      image: "/chart.png",
      githubUrl: "https://github.com/snehakushwaha874/DataAnalyzer",
    },
    {
      id: 3,
      title: "Power BI Online Sales Dashboard",
      description: "Fun project",
      longDescription:
        "The goal of this project was to analyze online sales data and deliver key business insights through a highly interactive dashboard.",
      technologies: ["JavaScript", "Power BI", "CSS3", "HTML5"],
      features: ["Location-based weather", "5-day forecast", "Smooth animations", "Responsive design"],
      type: "hackathon",
      color: "from-orange-500 to-red-500",
      image: "/placeholder.svg?height=200&width=300&text=Weather+Widget",
      githubUrl: "https://github.com/snehakushwaha874/PowerBI-Sales-Dashboard",
    },

  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-pink-100">
      {/* Back button */}
      <Button onClick={onBack} className="fixed top-4 left-4 z-10 bg-transparent" variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Journal
      </Button>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center">
          {!showProjects ? (
            <>
              {/* Instructions - moved outside and made more prominent */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-yellow-200 border-2 border-yellow-400 rounded-lg p-4 shadow-lg max-w-2xl mx-auto"
              >
                <p className="text-gray-800 text-center font-bold" style={{ fontFamily: "'Kalam', cursive" }}>
                  ☕ Welcome to the Break Room! Take a moment to relax while the robot watches over you. 🤖
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto relative"
              >
                {/* Room elements */}
                <div className="relative mb-8 h-64">
                  {/* Window */}
                  <div className="w-48 h-32 mx-auto bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg border-4 border-amber-800 mb-6 relative overflow-hidden">
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute top-4 right-4 w-8 h-6 bg-white rounded-full opacity-70"
                    />
                    <div className="absolute bottom-2 left-2 w-12 h-8 bg-green-400 rounded-t-full" />
                    <div className="absolute bottom-2 right-2 w-8 h-6 bg-green-300 rounded-t-full" />
                  </div>

                  {/* Sitting Robot */}
                  <motion.div
                    animate={{
                      rotate: [0, 2, -2, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute bottom-4 right-8 text-4xl cursor-pointer"
                    onClick={() =>
                      showPopup("🤖 I'm just chilling here, watching you wait. Patience is a virtue, human!")
                    }
                  >
                    🤖
                  </motion.div>

                  {/* Static Tea cup with steam */}
                  <div className="absolute bottom-8 left-8">
                    <div className="w-8 h-6 bg-white border-2 border-gray-300 rounded-b-lg">
                      <div className="w-6 h-4 bg-amber-600 rounded-b-lg mx-auto mt-1" />
                    </div>
                    <div className="w-2 h-3 bg-gray-300 rounded-r-full absolute right-0 top-1" />

                    {/* Steam */}
                    <AnimatePresence>
                      {steamAnimation && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 0, scale: 0.5 }}
                              animate={{
                                opacity: [0, 0.6, 0],
                                y: -20,
                                scale: [0.5, 1, 1.5],
                                x: [0, Math.random() * 10 - 5, Math.random() * 20 - 10],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.3,
                                ease: "easeOut",
                              }}
                              className="absolute w-2 h-2 bg-gray-300 rounded-full"
                              style={{ left: `${2 + i}px`, top: "-5px" }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Static Candle */}
                  <div className="absolute top-4 right-16">
                    <div className="w-4 h-12 bg-amber-200 rounded-t-full">
                      <motion.div
                        animate={{
                          scale: steamAnimation ? [1, 1.2, 1] : 1,
                          opacity: steamAnimation ? [0.8, 1, 0.8] : 0.8,
                        }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="w-2 h-3 bg-orange-400 rounded-full mx-auto -mt-1"
                      />
                    </div>
                  </div>

                  {/* Static Book */}
                  <div className="absolute bottom-12 left-32">
                    <div className="w-12 h-8 bg-red-600 rounded shadow-lg">
                      <div className="w-1 h-full bg-red-800 absolute left-1" />
                      <div className="text-white text-xs absolute inset-0 flex items-center justify-center">📚</div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the Break Room</h2>

                {!hasWaited ? (
                  <>
                    <p className="text-lg text-gray-600 mb-8">
                      Take a moment to sip some calm before diving into my work.
                    </p>

                    {/* Timer */}
                    <div className="mb-8">
                      <motion.div
                        className="w-32 h-32 mx-auto relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, ease: "linear" }}
                      >
                        <div className="w-full h-full border-4 border-gray-200 rounded-full" />
                        <motion.div
                          className="absolute inset-0 border-4 border-blue-500 rounded-full"
                          style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + (60 - timeLeft) * 0.833}% 0%, ${50 + (60 - timeLeft) * 0.833}% 100%, 50% 100%)`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-700">{timeLeft}</span>
                        </div>
                      </motion.div>
                    </div>

                    <Button onClick={handleEarlyClick} variant="outline" className="mb-4 bg-transparent">
                      See Projects Now
                    </Button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-xl text-green-600 mb-6">
                      ✨ Nice job unwinding! Welcome to my world of projects! ✨
                    </p>
                    <Button
                      onClick={() => setShowProjects(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Enter the Library
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-amber-900/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl"
            >
              <h2 className="text-4xl font-bold mb-8 text-amber-900">📚 Project Library</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div
                      className={`h-48 bg-gradient-to-br ${project.color} rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
                    >
                      {/* Book spine effect */}
                      <div className="absolute left-0 top-0 w-4 h-full bg-black/20" />
                      <div className="absolute left-1 top-0 w-1 h-full bg-white/30" />

                      <div className="p-6 text-white h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-sm opacity-90">{project.description}</p>
                        </div>
                        <div className="text-xs opacity-75">
                          {project.type === "major" ? "📖 Major Project" : "📄 Hackathon"}
                        </div>
                      </div>

                      {/* Page flip effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-white/10 origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>
                  <Button onClick={() => setSelectedProject(null)} variant="outline" size="sm">
                    ✕
                  </Button>
                </div>

                {/* Project Image */}
                <div className="mb-6">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">About This Project</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {selectedProject.demoUrl && (
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button asChild variant="outline">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
