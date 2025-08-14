import { motion } from "framer-motion"
import { useMemo } from "react"

const starVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15, delay: i * 0.03 },
  }),
}

const lineVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (i: number) => ({
    pathLength: 1,
    opacity: 0.4,
    transition: { duration: 1, ease: "easeInOut", delay: 0.5 + i * 0.05 },
  }),
}

export const ConstellationStage = () => {
  const { stars, lines } = useMemo(() => {
    const starArray = Array.from({ length: 25 }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 2 + Math.random() * 3,
    }))

    const lineArray = Array.from({ length: 20 }, () => {
      const start = starArray[Math.floor(Math.random() * starArray.length)]
      const end = starArray[Math.floor(Math.random() * starArray.length)]
      return { start, end }
    })

    return { stars: starArray, lines: lineArray }
  }, [])

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            variants={lineVariants}
            custom={i}
            initial="initial"
            animate="animate"
            x1={`${line.start.x}%`}
            y1={`${line.start.y}%`}
            x2={`${line.end.x}%`}
            y2={`${line.end.y}%`}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1"
          />
        ))}
      </svg>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          variants={starVariants}
          custom={i}
          initial="initial"
          animate="animate"
          className="absolute bg-white rounded-full"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px white`,
          }}
        />
      ))}
    </div>
  )
}