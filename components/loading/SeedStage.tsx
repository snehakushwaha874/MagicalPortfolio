import { motion } from "framer-motion"

const variants = {
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      "0 0 20px rgba(255, 255, 0, 0.4)",
      "0 0 40px rgba(255, 255, 0, 0.7)",
      "0 0 20px rgba(255, 255, 0, 0.4)",
    ],
  },
}

export const SeedStage = () => (
  <motion.div
    variants={variants}
    animate="animate"
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
  />
)