"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { STAGES, TOTAL_DURATION } from "./loading/loading-config"
import { SeedStage } from "./loading/SeedStage"
import { GrowingStage } from "./loading/GrowingStage"

import { ConstellationStage } from "./loading/ConstellationStage"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stageIndex, setStageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const currentStage = STAGES[stageIndex]

  // Effect for transitioning between stages based on configured durations
  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) {
      // Last stage, set up completion
      const completionTimer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 1000) // Wait for fade-out animation
      }, STAGES[STAGES.length - 1].duration)
      return () => clearTimeout(completionTimer)
    }

    const stageTimer = setTimeout(() => {
      setStageIndex((prev) => prev + 1)
    }, currentStage.duration)

    return () => clearTimeout(stageTimer)
  }, [stageIndex, onComplete])

  // Effect for updating the synchronized progress bar
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => p + 100 / (TOTAL_DURATION / 100))
    }, 100)

    if (progress >= 100) {
      clearInterval(progressInterval)
    }
    return () => clearInterval(progressInterval)
  }, [progress])

  const renderStage = () => {
    switch (currentStage.name) {
      case "seed":
        return <SeedStage />
      case "growing":
        return <GrowingStage />
      
      case "constellation":
        return <ConstellationStage />
      default:
        return null
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-lg">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStage.message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-white/80 text-center mt-4 font-mono text-sm sm:text-base tracking-wider"
          >
            {currentStage.message}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}