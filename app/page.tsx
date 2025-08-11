"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import NotebookLayout from "@/components/notebook-layout"
import SkillsVillage from "@/components/skills-village"
import SecretRobot from "@/components/secret-robot"
import ProjectsBreakRoom from "@/components/projects-break-room"
import ContactSection from "@/components/contact-section"
import GamePopup from "@/components/game-popup"

export default function MagicalPortfolio() {
  const [currentSection, setCurrentSection] = useState<
    "loading" | "main" | "skills" | "projects" | "secret" | "contact"
  >("loading")
  const [isLoading, setIsLoading] = useState(true)
  const [chipFound, setChipFound] = useState(false) // Always starts as false
  const [popupMessage, setPopupMessage] = useState<string | null>(null)

  useEffect(() => {
    // Clear any previous chip found state - always start fresh
    localStorage.removeItem("chipFound")
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setCurrentSection("main")
  }

  const findChip = () => {
    setChipFound(true)
    setPopupMessage(
      "🔧 Amazing! You found the missing chip! The sad robot in the secret vault is waiting for you to install it!",
    )
  }

  const showPopup = (message: string) => {
    setPopupMessage(message)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {currentSection === "main" && <NotebookLayout onNavigate={setCurrentSection} />}
      {currentSection === "skills" && <SkillsVillage onBack={() => setCurrentSection("main")} showPopup={showPopup} />}
      {currentSection === "projects" && (
        <ProjectsBreakRoom onBack={() => setCurrentSection("main")} showPopup={showPopup} />
      )}
      {currentSection === "secret" && (
        <SecretRobot onBack={() => setCurrentSection("main")} chipFound={chipFound} showPopup={showPopup} />
      )}
      {currentSection === "contact" && <ContactSection onBack={() => setCurrentSection("main")} />}

      {/* Hidden Chip - only show if not found yet */}
      {!chipFound && currentSection === "main" && (
        <div
          className="fixed bottom-8 right-12 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-40 animate-pulse cursor-pointer hover:opacity-70 transition-opacity transform rotate-45 shadow-lg"
          onClick={findChip}
          title="Something seems out of place here..."
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      )}

      {/* Game-style popup */}
      <GamePopup message={popupMessage} onClose={() => setPopupMessage(null)} />
    </div>
  )
}
