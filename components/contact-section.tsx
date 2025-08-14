"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StickyNote } from "./contact/StickyNote"
import { contactDetails } from "./contact/contact-data"

interface ContactSectionProps {
  onBack: () => void
}

// Animation variants for the container to orchestrate staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function ContactSection({ onBack }: ContactSectionProps) {
  const [draggedNoteId, setDraggedNoteId] = useState<number | null>(null)
  const constraintsRef = useRef<HTMLDivElement>(null) // Ref for drag boundaries

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden font-sans">
      {/* Back Button: Improved backdrop-filter for better glassmorphism */}
      <Button
        onClick={onBack}
        className="fixed top-4 left-4 z-[101] bg-white/80 hover:bg-white border-2 border-gray-300 shadow-xl backdrop-blur-md transition-all"
        variant="outline"
      >
        <ArrowLeft className="w-4 h-4 mr-2 text-gray-800" />
        <span className="text-gray-800 font-semibold">Back to Journal</span>
      </Button>

      {/* Notebook Background Layer */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        {/* Subtle noise texture for a more paper-like feel */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
        
        {/* Spiral Binding Holes */}
        <div className="absolute left-12 top-0 bottom-0 w-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gray-400 rounded-full absolute shadow-inner"
              style={{ top: `${i * 5 + 2}%`, left: "-6px" }}
            />
          ))}
        </div>

        {/* Ruled Lines */}
        <div
          className="w-full h-full ml-16"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 31px, #d1d5db 31px, #d1d5db 32px, transparent 32px)`,
            backgroundSize: "100% 33px",
          }}
        />

        {/* Red Margin Line */}
        <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-red-400/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Title */}
        <div className="text-center pt-20 sm:pt-16 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-4xl sm:text-5xl font-bold text-gray-800"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            Let's Connect! 📝
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 mt-4"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            My info is scattered around... feel free to tidy up.
          </motion.p>
        </div>

        {/* Sticky Notes Container */}
        <motion.div
          ref={constraintsRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full h-[calc(100vh-160px)]"
        >
          {contactDetails.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              dragConstraintsRef={constraintsRef}
              isDragged={draggedNoteId === note.id}
              onDragStart={() => setDraggedNoteId(note.id)}
              onDragEnd={() => setDraggedNoteId(null)}
            />
          ))}
        </motion.div>
      </div>

      {/* Instructions Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: contactDetails.length * 0.15 + 0.5 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 px-5 shadow-lg border-2 border-dashed border-gray-400"
      >
        <p className="text-gray-700 text-center text-sm sm:text-base" style={{ fontFamily: "'Kalam', cursive" }}>
          💡 Drag the notes! You can also click to copy or open links.
        </p>
      </motion.div>
    </div>
  )
}