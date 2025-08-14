"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GamePopupProps {
  message: string | null
  onClose: () => void
}

export default function GamePopup({ message, onClose }: GamePopupProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white border-4 border-gray-800 rounded-lg shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Game-style header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg border-b-4 border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">💬 System Message</h3>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Message content */}
            <div className="p-6">
              <p className="text-gray-800 text-lg leading-relaxed mb-6">{message}</p>
              <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                Continue Adventure
              </Button>
            </div>

            {/* Game-style border decoration */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-gray-800" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gray-800" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-800" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
