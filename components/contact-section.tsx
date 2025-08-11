"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Github, Linkedin, Twitter, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  onBack: () => void
}

export default function ContactSection({ onBack }: ContactSectionProps) {
  const [draggedNote, setDraggedNote] = useState<number | null>(null)

  const stickyNotes = [
    {
      id: 1,
      content: "📧 Email",
      detail: "hello@developer.com",
      color: "bg-yellow-200",
      rotation: -5,
      x: 15,
      y: 20,
      icon: Mail,
    },
    {
      id: 2,
      content: "💼 LinkedIn",
      detail: "/in/awesome-dev",
      color: "bg-blue-200",
      rotation: 3,
      x: 60,
      y: 15,
      icon: Linkedin,
    },
    {
      id: 3,
      content: "🐙 GitHub",
      detail: "/awesome-developer",
      color: "bg-purple-200",
      rotation: -2,
      x: 25,
      y: 60,
      icon: Github,
    },
    {
      id: 4,
      content: "🐦 Twitter",
      detail: "@awesome_dev",
      color: "bg-cyan-200",
      rotation: 4,
      x: 70,
      y: 55,
      icon: Twitter,
    },
    {
      id: 5,
      content: "📍 Location",
      detail: "San Francisco, CA",
      color: "bg-green-200",
      rotation: -3,
      x: 45,
      y: 35,
      icon: MapPin,
    },
    {
      id: 6,
      content: "📱 Phone",
      detail: "+1 (555) 123-4567",
      color: "bg-pink-200",
      rotation: 2,
      x: 10,
      y: 75,
      icon: Phone,
    },
  ]

  const handleDragStart = (id: number) => {
    setDraggedNote(id)
  }

  const handleDragEnd = () => {
    setDraggedNote(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Back button - Fixed styling and z-index */}
      <Button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-white/90 hover:bg-white border-2 border-gray-300 shadow-lg backdrop-blur-sm"
        variant="outline"
      >
        <ArrowLeft className="w-4 h-4 mr-2 text-gray-700" />
        <span className="text-gray-700 font-medium">Back to Journal</span>
      </Button>

      {/* Notebook background */}
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

      {/* Title */}
      <div className="text-center pt-16 mb-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-800 transform -rotate-1"
          style={{ fontFamily: "'Kalam', cursive" }}
        >
          Let's Connect! 📝
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mt-4 transform rotate-0.5"
          style={{ fontFamily: "'Kalam', cursive" }}
        >
          My contact info scattered around like a messy desk
        </motion.p>
      </div>

      {/* Scattered sticky notes */}
      <div className="relative w-full h-screen">
        {stickyNotes.map((note, index) => {
          const IconComponent = note.icon
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0, rotate: note.rotation }}
              animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
              drag
              dragConstraints={{ left: 0, right: window.innerWidth - 200, top: 0, bottom: window.innerHeight - 200 }}
              onDragStart={() => handleDragStart(note.id)}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className={`absolute w-48 h-32 ${note.color} p-4 shadow-lg cursor-grab active:cursor-grabbing rounded-lg border-b-4 border-r-4 border-black/20`}
              style={{
                left: `${note.x}%`,
                top: `${note.y}%`,
                transform: `rotate(${note.rotation}deg)`,
              }}
            >
              {/* Sticky note tape effect */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-300/60 rounded-sm" />

              <div className="flex items-center mb-2">
                <IconComponent className="w-5 h-5 mr-2 text-gray-700" />
                <h3 className="font-bold text-gray-800" style={{ fontFamily: "'Kalam', cursive" }}>
                  {note.content}
                </h3>
              </div>

              <p className="text-gray-700 text-sm break-all" style={{ fontFamily: "'Kalam', cursive" }}>
                {note.detail}
              </p>

              {/* Handwritten underline */}
              <div className="absolute bottom-3 left-4 right-4 h-0.5 bg-gray-600 transform -rotate-1 opacity-40" />

              {/* Corner fold effect */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-black/10 transform rotate-45 translate-x-2 -translate-y-2" />
            </motion.div>
          )
        })}

        {/* Scattered paper clips and pins */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.6, rotate: 45 }}
          transition={{ delay: 1 }}
          className="absolute top-1/4 left-1/3 w-6 h-6 border-2 border-gray-400 rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-1/3 right-1/4 w-2 h-8 bg-red-500 rounded-full transform rotate-12"
        />

        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.4, rotate: -30 }}
          transition={{ delay: 1.4 }}
          className="absolute top-1/2 right-1/3 w-8 h-2 bg-silver-400 rounded-full"
          style={{ background: "linear-gradient(90deg, #c0c0c0, #e0e0e0)" }}
        />

        {/* Coffee ring stain */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-1/4 left-1/4 w-16 h-16 border-4 border-amber-600 rounded-full"
        />

        {/* Crumpled paper ball */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute top-3/4 right-1/2 w-8 h-8 bg-gray-300 rounded-full shadow-lg"
          style={{
            background: "radial-gradient(circle at 30% 30%, #f0f0f0, #d0d0d0)",
          }}
        />
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border-2 border-dashed border-gray-400"
      >
        <p className="text-gray-700 text-center" style={{ fontFamily: "'Kalam', cursive" }}>
          💡 Drag the sticky notes around! They're interactive just like a real messy desk.
        </p>
      </motion.div>
    </div>
  )
}
