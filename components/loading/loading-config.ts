// src/components/loading/loading-config.ts

export interface StageConfig {
  name: string
  duration: number // in milliseconds
  message: string
}

// The central configuration for the entire loading animation sequence.
// Change durations and messages here without touching component logic.
export const STAGES: StageConfig[] = [
  { name: "seed", duration: 2000, message: "🌱 Planting the seed of knowledge..." },
  { name: "growing", duration: 3000, message: "🌿 Growing branches of expertise..." },
 
  { name: "constellation", duration: 2500, message: "✨ Forming a constellation of abilities..." },
]

// Calculate the total duration for synchronizing the progress bar
export const TOTAL_DURATION = STAGES.reduce((sum, stage) => sum + stage.duration, 0)

// Skill data, kept separate for clarity
export const SKILL_CATEGORIES = [
  { name: "Frontend", color: "bg-sky-400", skills: ["React", "Next.js", "Vue"] },
  { name: "Backend", color: "bg-emerald-400", skills: ["Node.js", "Python", "Go"] },
  { name: "Database", color: "bg-violet-400", skills: ["PostgreSQL", "MongoDB"] },
  { name: "DevOps", color: "bg-orange-400", skills: ["Docker", "AWS", "CI/CD"] },
  { name: "Design", color: "bg-rose-400", skills: ["Figma", "UI/UX"] },
]