"use client"

import React, { useState, useEffect, useCallback } from "react"
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

interface Building {
  id: string
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  x: number
  y: number
  skills: string[]
  color: string
}

// Extract Character component for memoization and clarity
const CharacterAvatar = React.memo(
  ({
    character,
    onClick,
  }: {
    character: Character
    onClick: (character: Character) => void
  }) => {
    return (
      <motion.div
        layout
        role="button"
        tabIndex={0}
        aria-label={`${character.type} character`}
        key={character.id}
        className="absolute cursor-pointer"
        style={{ left: `${character.x}%`, top: `${character.y}%` }}
        animate={{
          x: [0, 5, 0, -5, 0],
          y: [0, -3, 0, 2, 0],
          transition: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={() => onClick(character)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick(character)
          }
        }}
        whileHover={{ scale: 1.2 }}
      >
        <div className={`w-16 h-16 rounded-full shadow-lg relative bg-[url('/char.png')] bg-contain bg-no-repeat bg-center`}>
          {character.type === "enemy" && (
            <div className="w-1 h-1 bg-red-600 rounded-full absolute top-1.5 left-1.5" />
          )}
          {/* Character type emoji */}
          <div className="absolute -top-1 -right-1 text-xs select-none pointer-events-none">
            {character.type === "enemy" ? "👹" : character.type === "coder" ? "💻" : character.type === "designer" ? "🎨" : "👤"}
          </div>
        </div>
      </motion.div>
    )
  },
)

// Extract BuildingCard component with tooltip preview on hover
const BuildingCard = ({
  building,
  onClick,
}: {
  building: Building
  onClick: (id: string) => void
}) => {
  const IconComponent = building.icon
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${building.name} details`}
      className="absolute cursor-pointer"
      style={{ left: `${building.x}%`, top: `${building.y}%` }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onClick(building.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(building.id)
        }
      }}
      title={building.name}
    >
      <div
        className={`w-20 h-24 bg-gradient-to-b ${building.color} rounded-t-lg relative shadow-lg ring-1 ring-black/20`}
      >
        <div className="absolute inset-2 bg-white/20 rounded flex items-center justify-center">
          <IconComponent className="w-7 h-7 text-white" />
        </div>

        {/* Torch/Light effect for night */}
        {/* This could be refined to a separate component */}
      </div>
      <div className="text-center mt-2 pointer-events-none">
        <p className="text-xs font-bold text-white drop-shadow-lg">{building.name}</p>
      </div>
    </motion.div>
  )
}

export default function SkillsVillage({ onBack, showPopup }: SkillsVillageProps) {
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day")
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  // Handle time changes smoothly
  useEffect(() => {
    const hour = new Date().getHours()
    setTimeOfDay(hour >= 18 || hour <= 6 ? "night" : "day")
  }, [])

  // Initialize characters
  useEffect(() => {
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

  // Animate characters with useCallback and throttling via useEffect logic
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

  const buildings: Building[] = [
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
      x: 35,
      y: 35,
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

  const handleCharacterClick = useCallback(
    (character: Character) => {
      showPopup(character.message)
    },
    [showPopup],
  )

  return (
    <div
      className={`min-h-screen transition-all duration-1000 bg-[url('/map.jpg')] bg-contain bg-no-repeat bg-center`}
      aria-live="polite"
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

     

      <div className="relative w-full h-screen overflow-hidden" role="main" aria-label="Skills village interactive animation">
       

        {/* Buildings */}
        {buildings.map((building) => (
          <BuildingCard key={building.id} building={building} onClick={setSelectedBuilding} />
        ))}

        {/* Characters */}
        {characters.map((character) => (
          <CharacterAvatar key={character.id} character={character} onClick={handleCharacterClick} />
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="building-modal-title"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSelectedBuilding(null)
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md mx-4 outline-none"
                onClick={(e) => e.stopPropagation()}
                tabIndex={0}
              >
                {(() => {
                  const building = buildings.find((b) => b.id === selectedBuilding)
                  if (!building) return null
                  const IconComponent = building.icon

                  return (
                    <>
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 mr-3 text-gray-700" />
                        <h3 id="building-modal-title" className="text-xl font-bold">
                          {building.name}
                        </h3>
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
