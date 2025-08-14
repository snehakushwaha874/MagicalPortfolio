"use client"

import { useState, RefObject } from "react"
import { motion, PanInfo } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { ContactDetail } from "./contact-data" // Import the type

interface StickyNoteProps {
  note: ContactDetail
  dragConstraintsRef: RefObject<HTMLDivElement>
  isDragged: boolean
  onDragStart: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}

// Animation variants for each note
const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: 0 },
  visible: (note: ContactDetail) => ({
    opacity: 1,
    scale: 1,
    rotate: note.rotation,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
}

export function StickyNote({ note, dragConstraintsRef, isDragged, onDragStart, onDragEnd }: StickyNoteProps) {
  const [isCopied, setIsCopied] = useState(false)
  const IconComponent = note.icon

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent drag from starting on click
    navigator.clipboard.writeText(note.detail)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const isCopyable = note.type === 'email' || note.type === 'phone'
  
  const DetailContent = () => (
    <p className="text-gray-700 text-sm break-all font-medium" style={{ fontFamily: "'Kalam', cursive" }}>
      {note.displayDetail || note.detail}
    </p>
  )

  return (
    <motion.div
      variants={itemVariants}
      custom={note}
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.05, rotate: isDragged ? note.rotation : 0 }}
      whileDrag={{ scale: 1.1, rotate: 0, cursor: 'grabbing' }}
      className={`absolute w-48 h-32 p-4 shadow-lg cursor-grab rounded-lg border-b-4 border-r-4 border-black/20 ${note.color}`}
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        zIndex: isDragged ? 100 : note.id, // Dynamically set zIndex
      }}
      aria-label={`Sticky note for ${note.content}`}
    >
      {/* Sticky note tape effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-5 bg-yellow-100/50 backdrop-blur-sm border-2 border-white/30 rounded-sm shadow-sm" />
      
      <div className="flex items-center mb-2">
        <IconComponent className="w-5 h-5 mr-2 text-gray-800 flex-shrink-0" />
        <h3 className="font-bold text-gray-800 truncate" style={{ fontFamily: "'Kalam', cursive" }}>
          {note.content}
        </h3>
      </div>

      {isCopyable ? (
        <button
          onClick={handleCopy}
          className="w-full text-left p-1 -ml-1 rounded-md hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30"
          aria-label={`Copy ${note.content}: ${note.detail}`}
        >
          <DetailContent />
          <div className="absolute bottom-2 right-2 text-gray-600">
            {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </div>
          {isCopied && <span className="absolute bottom-8 right-2 text-xs text-green-700 bg-white/50 rounded px-1">Copied!</span>}
        </button>
      ) : (
        <a
          href={note.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left p-1 -ml-1 rounded-md hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/30 block"
          aria-label={`Open link to ${note.content}`}
        >
          <DetailContent />
        </a>
      )}

      {/* Handwritten underline effect */}
      <div className="absolute bottom-4 left-4 right-4 h-[1.5px] bg-gray-600/50 transform -rotate-2" />
    </motion.div>
  )
}