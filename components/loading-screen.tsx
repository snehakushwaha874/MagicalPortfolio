"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState<"seed" | "growing" | "blooming" | "constellation">("seed")
  const [progress, setProgress] = useState(0)
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === "seed") {
        setStage("growing")
      } else if (stage === "growing") {
        setStage("blooming")
      } else if (stage === "blooming") {
        setStage("constellation")
      } else {
        setTimeout(onComplete, 1000)
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [stage, onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100))
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const skillCategories = [
    { name: "Frontend", color: "bg-blue-400", skills: ["React", "Vue", "Angular"] },
    { name: "Backend", color: "bg-green-400", skills: ["Node.js", "Python", "Go"] },
    { name: "Database", color: "bg-purple-400", skills: ["PostgreSQL", "MongoDB"] },
    { name: "DevOps", color: "bg-orange-400", skills: ["Docker", "AWS", "CI/CD"] },
    { name: "Design", color: "bg-pink-400", skills: ["Figma", "UI/UX"] },
  ]

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
      <div className="relative w-96 h-96">
        {/* Seed Stage */}
        <AnimatePresence>
          {stage === "seed" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 0, 0.5)",
                    "0 0 40px rgba(255, 255, 0, 0.8)",
                    "0 0 20px rgba(255, 255, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Growing Stage */}
        <AnimatePresence>
          {stage === "growing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* Enhanced trunk with texture */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "220px" }}
                transition={{ duration: 2 }}
                className="absolute bottom-1/2 left-1/2 w-3 bg-gradient-to-t from-amber-800 to-amber-600 origin-bottom transform -translate-x-1/2 rounded-t-lg shadow-lg"
              />

              {/* Enhanced branches with hover effects */}
              {skillCategories.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${50 + i * 8}px`, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.3, duration: 1 }}
                  className="absolute bg-gradient-to-r from-green-700 to-green-500 h-2 origin-left rounded-full shadow-md cursor-pointer"
                  style={{
                    bottom: `${55 + i * 12}%`,
                    left: "50%",
                    transform: `rotate(${-40 + i * 20}deg)`,
                  }}
                  onMouseEnter={() => setHoveredBranch(i)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Branch label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredBranch === i ? 1 : 0 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  >
                    {category.name}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Blooming Stage */}
        <AnimatePresence>
          {stage === "blooming" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              {/* Skill leaves with categories */}
              {skillCategories.map((category, categoryIndex) =>
                category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={`${categoryIndex}-${skillIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: 1,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      delay: categoryIndex * 0.2 + skillIndex * 0.1,
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    className={`absolute w-4 h-4 rounded-full ${category.color} shadow-lg cursor-pointer`}
                    style={{
                      top: `${25 + categoryIndex * 15 + skillIndex * 5}%`,
                      left: `${35 + categoryIndex * 12 + skillIndex * 8}%`,
                    }}
                    title={skill}
                  >
                    {/* Skill tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {skill}
                    </div>
                  </motion.div>
                )),
              )}

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Constellation Stage */}
        <AnimatePresence>
          {stage === "constellation" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
              {/* Constellation connections */}
              <svg className="absolute inset-0 w-full h-full">
                {[...Array(15)].map((_, i) => (
                  <motion.line
                    key={i}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    x1={`${20 + (i % 5) * 20}%`}
                    y1={`${20 + Math.floor(i / 5) * 20}%`}
                    x2={`${25 + (i % 5) * 20}%`}
                    y2={`${25 + Math.floor(i / 5) * 20}%`}
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Enhanced stars */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full relative">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping" />
                  </div>
                </motion.div>
              ))}

              {/* Ripple effect */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced progress indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden shadow-lg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full shadow-inner"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-center mt-4 font-mono text-lg"
        >
          {stage === "seed" && "🌱 Planting the seed of knowledge..."}
          {stage === "growing" && "🌿 Growing branches of expertise..."}
          {stage === "blooming" && "🌸 Blooming with skills..."}
          {stage === "constellation" && "✨ Forming constellation of abilities..."}
        </motion.p>
      </div>
    </div>
  )
}
