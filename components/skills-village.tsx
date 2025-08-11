"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Code, Palette, Database, Globe, Smartphone, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SkillsVillageProps {
  onBack: () => void
  showPopup: (message: string) => void
}

interface Character {
  id: number
  x: number
  y: number
  type: "coder" | "designer" | "enemy" | "villager"
  message: string
  color: string
  direction: number
}

export default function SkillsVillage({ onBack, showPopup }: SkillsVillageProps) {
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day")
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    setTimeOfDay(hour >= 18 || hour <= 6 ? "night" : "day")

    // Initialize characters with more variety
    setCharacters([
      {
        id: 1,
        x: 20,
        y: 60,
        type: "coder",
        message: "I debug code faster than lightning! ⚡",
        color: "bg-blue-500",
        direction: 1,
      },
      {
        id: 2,
        x: 70,
        y: 40,
        type: "designer",
        message: "Colors are my superpower! 🎨",
        color: "bg-pink-500",
        direction: -1,
      },
      {
        id: 3,
        x: 45,
        y: 70,
        type: "villager",
        message: "Welcome to our village! 👋",
        color: "bg-green-500",
        direction: 1,
      },
      {
        id: 4,
        x: 80,
        y: 30,
        type: "enemy",
        message: "I'm here to steal your code! 😈",
        color: "bg-red-500",
        direction: -1,
      },
      {
        id: 5,
        x: 30,
        y: 45,
        type: "villager",
        message: "The weather is perfect for coding! ☀️",
        color: "bg-yellow-500",
        direction: 1,
      },
      {
        id: 6,
        x: 60,
        y: 65,
        type: "enemy",
        message: "Bugs everywhere! Mwahahaha! 🐛",
        color: "bg-purple-700",
        direction: -1,
      },
      {
        id: 7,
        x: 15,
        y: 80,
        type: "coder",
        message: "Just shipped a new feature! 🚀",
        color: "bg-cyan-500",
        direction: 1,
      },
      {
        id: 8,
        x: 85,
        y: 55,
        type: "designer",
        message: "This UI needs more pizzazz! ✨",
        color: "bg-orange-500",
        direction: -1,
      },
    ])
  }, [])

  // Animate characters
  useEffect(() => {
    const interval = setInterval(() => {
      setCharacters((prev) =>
        prev.map((char) => ({
          ...char,
          x: Math.max(5, Math.min(95, char.x + (Math.random() - 0.5) * 2 * char.direction)),
          y: Math.max(20, Math.min(85, char.y + (Math.random() - 0.5) * 1)),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const buildings = [
    {
      id: "coding-dojo",
      name: "Coding Dojo",
      icon: Code,
      x: 15,
      y: 30,
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "design-hut",
      name: "Design Hut",
      icon: Palette,
      x: 60,
      y: 20,
      skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
      color: "from-pink-500 to-red-500",
    },
    {
      id: "database-tower",
      name: "Database Tower",
      icon: Database,
      x: 80,
      y: 50,
      skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
      color: "from-green-500 to-teal-600",
    },
    {
      id: "web-castle",
      name: "Web Castle",
      icon: Globe,
      x: 40,
      y: 60,
      skills: ["Next.js", "Tailwind CSS", "Vercel", "Web APIs"],
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: "mobile-shrine",
      name: "Mobile Shrine",
      icon: Smartphone,
      x: 25,
      y: 75,
      skills: ["React Native", "Flutter", "iOS", "Android"],
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "ai-lab",
      name: "AI Laboratory",
      icon: Brain,
      x: 70,
      y: 70,
      skills: ["Machine Learning", "AI SDK", "OpenAI", "TensorFlow"],
      color: "from-purple-500 to-pink-600",
    },
  ]

  const handleCharacterClick = (character: Character) => {
    showPopup(character.message)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        timeOfDay === "night"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
          : "bg-gradient-to-br from-green-300 via-blue-300 to-purple-300"
      }`}
    >
      {/* Back button */}
      <Button onClick={onBack} className="fixed top-4 left-4 z-10 bg-transparent" variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Journal
      </Button>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border-2 border-dashed border-gray-400 z-10"
      >
        <p className="text-gray-700 text-center font-bold" style={{ fontFamily: "'Kalam', cursive" }}>
          🏘️ Welcome to Skills Village! Click buildings to see my skills, chat with villagers, and watch out for bugs! 🐛
        </p>
      </motion.div>

      {/* Time indicator */}
      <div className="fixed top-4 right-4 z-10 text-white font-mono">
        {timeOfDay === "night" ? "🌙 Night" : "☀️ Day"}
      </div>

      <div className="relative w-full h-screen overflow-hidden">
        {/* Ground */}
        <div
          className={`absolute bottom-0 w-full h-32 ${
            timeOfDay === "night" ? "bg-gray-800" : "bg-green-400"
          } transition-colors duration-1000`}
        />

        {/* Buildings */}
        {buildings.map((building) => {
          const IconComponent = building.icon
          return (
            <motion.div
              key={building.id}
              className="absolute cursor-pointer"
              style={{ left: `${building.x}%`, top: `${building.y}%` }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedBuilding(building.id)}
            >
              <div className={`w-20 h-24 bg-gradient-to-b ${building.color} rounded-t-lg relative shadow-lg`}>
                {/* Building details */}
                <div className="absolute inset-2 bg-white/20 rounded">
                  <IconComponent className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Torch/Light effect for night */}
                {timeOfDay === "night" && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
                  />
                )}
              </div>

              <div className="text-center mt-2">
                <p className="text-xs font-bold text-white drop-shadow-lg">{building.name}</p>
              </div>
            </motion.div>
          )
        })}

        {/* Characters */}
        {characters.map((character) => (
          <motion.div
            key={character.id}
            className="absolute cursor-pointer"
            style={{ left: `${character.x}%`, top: `${character.y}%` }}
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            onClick={() => handleCharacterClick(character)}
            whileHover={{ scale: 1.2 }}
          >
            <div className={`w-6 h-6 rounded-full ${character.color} shadow-lg relative`}>
              {/* Eyes */}
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1" />
              {character.type === "enemy" && (
                <div className="w-1 h-1 bg-red-600 rounded-full absolute top-1.5 left-1.5" />
              )}

              {/* Character type indicator */}
              <div className="absolute -top-1 -right-1 text-xs">
                {character.type === "enemy"
                  ? "👹"
                  : character.type === "coder"
                    ? "💻"
                    : character.type === "designer"
                      ? "🎨"
                      : "👤"}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Building details modal */}
        <AnimatePresence>
          {selectedBuilding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-20"
              onClick={() => setSelectedBuilding(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const building = buildings.find((b) => b.id === selectedBuilding)
                  if (!building) return null
                  const IconComponent = building.icon

                  return (
                    <>
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 mr-3 text-gray-700" />
                        <h3 className="text-xl font-bold">{building.name}</h3>
                      </div>
                      <div className="space-y-2">
                        {building.skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                      <Button onClick={() => setSelectedBuilding(null)} className="w-full mt-4">
                        Close
                      </Button>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
