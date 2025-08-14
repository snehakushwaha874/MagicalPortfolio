"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sparkles, Lock, Unlock, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SecretRobotProps {
  onBack: () => void
  chipFound: boolean
  showPopup: (message: string) => void
}

export default function SecretRobot({ onBack, chipFound, showPopup }: SecretRobotProps) {
  const [userInput, setUserInput] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [unlockedItems, setUnlockedItems] = useState<string[]>([])
  const [hasShownSuccessMessage, setHasShownSuccessMessage] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [chipFixed, setChipFixed] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "🤖 ROBOT TERMINAL v2.0.1 - Chip Repair System",
    "=====================================",
    "🔧 Chip detected but corrupted!",
    "⚠️  System diagnostics: CRITICAL ERROR",
    "❌ Voltage: 0.0V (Expected: 5.0V)",
    "🌡️  Temperature: 85°C (OVERHEATING)",
    "",
    "🎯 MISSION: Repair the robot's chip by setting correct voltage",
    "💡 HINT: Try 'help' to see all available commands",
    "🔍 TIP: This terminal has many hidden features to discover!",
    "",
  ])

  const executeCommand = (command: string, args: string) => {
    const cmd = command.toLowerCase()

    // Add the command to history first
    addToTerminal(`robot@repair:~$ ${command}${args ? " " + args : ""}`)

    switch (cmd) {
      case "set_voltage":
        if (!args.trim()) {
          addToTerminal("❌ Error: Please specify voltage value")
          addToTerminal("💡 Usage: set_voltage <value>")
          addToTerminal("🔧 Example: set_voltage 5")
          return
        }

        setIsRunning(true)
        addToTerminal("🔄 Applying voltage to chip...")
        addToTerminal("⚡ Initializing power systems...")

        setTimeout(() => {
          const isCorrect = args.trim() === "5"

          if (isCorrect) {
            addToTerminal("✅ Voltage applied successfully!")
            addToTerminal("🔧 Chip repair in progress...")
            addToTerminal("⚡ Power levels: OPTIMAL (5.0V)")
            addToTerminal("🌡️  Temperature: Cooling down... 45°C")
            addToTerminal("🎉 CHIP FULLY REPAIRED!")
            addToTerminal("🔓 Unlocking secret vault...")
            addToTerminal("🤖 Robot status: FULLY OPERATIONAL!")
            addToTerminal("")

            setChipFixed(true)
            showPopup("🎉 Perfect! You fixed the chip! The robot is now fully operational!")

            setTimeout(() => {
              setUnlockedItems(["project1", "project2", "project3", "project4", "project5", "project6"])
              setShowMessage(true)
              if (!hasShownSuccessMessage) {
                showPopup("🎊 AMAZING! The chip is working perfectly! All secret projects unlocked!")
                setHasShownSuccessMessage(true)
              }
            }, 2000)
          } else {
            addToTerminal(`❌ Error: Incorrect voltage '${args}V'`)
            addToTerminal("⚠️  Warning: Wrong voltage can damage chip!")
            addToTerminal("🔧 Required voltage: 5V")
            addToTerminal("💡 Try: set_voltage 5")
            addToTerminal("")
          }
          setIsRunning(false)
        }, 1500)
        break

      case "help":
        addToTerminal("🤖 ROBOT TERMINAL - Available Commands:")
        addToTerminal("=====================================")
        addToTerminal("")
        addToTerminal("🔧 MAIN COMMANDS:")
        addToTerminal("  set_voltage <value>  - Set chip voltage (MAIN TASK: use 5)")
        addToTerminal("  status              - Show detailed robot status")
        addToTerminal("")
        addToTerminal("📁 FILE SYSTEM:")
        addToTerminal("  ls                  - List directory contents")
        addToTerminal("  cat <file>          - Display file contents")
        addToTerminal("")
        addToTerminal("🌐 NETWORK:")
        addToTerminal("  ping <target>       - Ping a network target")
        addToTerminal("  whoami              - Display current user info")
        addToTerminal("")
        addToTerminal("🎮 FUN COMMANDS:")
        addToTerminal("  joke                - Tell a random robot joke")
        addToTerminal("  coffee              - Make virtual coffee")
        addToTerminal("  hack                - Try to hack something")
        addToTerminal("  secret              - Hidden surprise command")
        addToTerminal("")
        addToTerminal("ℹ️  OTHER:")
        addToTerminal("  help                - Show this help message")
        addToTerminal("")
        addToTerminal("💡 TIP: Try 'ls' then 'cat <filename>' to explore files!")
        addToTerminal("🎯 GOAL: Use 'set_voltage 5' to repair the chip!")
        addToTerminal("")
        break

      case "whoami":
        addToTerminal("👤 Current User: chip-repair-specialist")
        addToTerminal("🔧 Access Level: ADMIN")
        addToTerminal("🎯 Mission: Fix the robot's corrupted chip")
        addToTerminal("🏠 Home Directory: /home/repair")
        addToTerminal("⚡ Permissions: Full system access")
        addToTerminal("")
        break

      case "ls":
        addToTerminal("📁 Directory listing for /home/repair:")
        addToTerminal("=====================================")
        addToTerminal("  📄 chip_diagnostics.log    - Chip error details")
        addToTerminal("  📖 repair_manual.pdf       - Step-by-step repair guide")
        addToTerminal("  📁 secret_projects/        - Locked until chip is fixed")
        addToTerminal("  💾 robot_memories.db       - Robot's memory database")
        addToTerminal("  ⚙️  voltage_settings.cfg    - Power configuration")
        addToTerminal("  🥚 easter_eggs.txt         - Hidden surprises")
        addToTerminal("  🔒 vault_access.key        - Encrypted vault key")
        addToTerminal("")
        addToTerminal("💡 Use 'cat <filename>' to read files")
        addToTerminal("")
        break

      case "cat":
        if (!args) {
          addToTerminal("❌ Error: Please specify a file to read")
          addToTerminal("💡 Usage: cat <filename>")
          addToTerminal("📁 Available files: chip_diagnostics.log, repair_manual.pdf, easter_eggs.txt")
          addToTerminal("")
          return
        }

        if (args.includes("chip_diagnostics")) {
          addToTerminal("📄 === chip_diagnostics.log ===")
          addToTerminal("================================")
          addToTerminal("  [CRITICAL] Chip ID: RBT-2024-MAGIC")
          addToTerminal("  [ERROR] Voltage: 0.0V (Expected: 5.0V)")
          addToTerminal("  [ERROR] Temperature: 85°C (OVERHEATING)")
          addToTerminal("  [ERROR] Status: CORRUPTED")
          addToTerminal("  [WARNING] System instability detected")
          addToTerminal("  [INFO] Last known good state: 5.0V")
          addToTerminal("  [SOLUTION] Apply exactly 5 volts to repair")
          addToTerminal("")
        } else if (args.includes("repair_manual")) {
          addToTerminal("📖 === repair_manual.pdf ===")
          addToTerminal("=============================")
          addToTerminal("  ROBOT CHIP REPAIR GUIDE v2.1")
          addToTerminal("  ")
          addToTerminal("  Step 1: Locate missing chip ✅")
          addToTerminal("  Step 2: Install chip in socket ✅")
          addToTerminal("  Step 3: Set voltage to 5V ⏳")
          addToTerminal("  Step 4: Verify operation")
          addToTerminal("  ")
          addToTerminal("  ⚠️  WARNING: Incorrect voltage may cause damage!")
          addToTerminal("  ✅ SAFE VOLTAGE: Exactly 5.0V")
          addToTerminal("  🔧 COMMAND: set_voltage 5")
          addToTerminal("")
        } else if (args.includes("easter_eggs")) {
          addToTerminal("🥚 === easter_eggs.txt ===")
          addToTerminal("==========================")
          addToTerminal("  🎉 Congratulations! You found the easter egg file!")
          addToTerminal("  ")
          addToTerminal("  🎮 Fun commands to try:")
          addToTerminal("    • joke    - Robot humor")
          addToTerminal("    • hack    - Hacking attempt")
          addToTerminal("    • coffee  - Virtual caffeine")
          addToTerminal("    • secret  - Hidden surprise")
          addToTerminal("  ")
          addToTerminal("  🤖 The robot loves curious explorers!")
          addToTerminal("  🔍 Keep exploring the terminal!")
          addToTerminal("")
        } else if (args.includes("robot_memories")) {
          addToTerminal("💾 === robot_memories.db ===")
          addToTerminal("=============================")
          addToTerminal("  🔒 Database encrypted - chip repair required")
          addToTerminal("  📊 Records: 1,337 memories")
          addToTerminal("  💭 Last memory: 'I hope someone finds my chip...'")
          addToTerminal("  🤖 Status: Waiting for repair...")
          addToTerminal("")
        } else {
          addToTerminal(`❌ cat: ${args}: No such file or directory`)
          addToTerminal("📁 Available files:")
          addToTerminal("  • chip_diagnostics.log")
          addToTerminal("  • repair_manual.pdf")
          addToTerminal("  • easter_eggs.txt")
          addToTerminal("  • robot_memories.db")
          addToTerminal("")
        }
        break

      case "ping":
        if (!args) {
          addToTerminal("❌ Error: Please specify a target to ping")
          addToTerminal("💡 Usage: ping <target>")
          addToTerminal("🌐 Try: ping google.com or ping robot")
          addToTerminal("")
          return
        }

        if (args.includes("google") || args.includes("8.8.8.8")) {
          addToTerminal(`🌐 PING ${args} (8.8.8.8): 56 data bytes`)
          addToTerminal("64 bytes from 8.8.8.8: icmp_seq=0 time=12.345 ms")
          addToTerminal("64 bytes from 8.8.8.8: icmp_seq=1 time=11.234 ms")
          addToTerminal("64 bytes from 8.8.8.8: icmp_seq=2 time=13.456 ms")
          addToTerminal("--- ping statistics ---")
          addToTerminal("3 packets transmitted, 3 received, 0% packet loss")
          addToTerminal("✅ Internet connection: ACTIVE")
          addToTerminal("")
        } else if (args.includes("robot") || args.includes("localhost")) {
          addToTerminal(`🤖 PING ${args} (127.0.0.1): 56 data bytes`)
          addToTerminal("64 bytes from 127.0.0.1: icmp_seq=0 time=0.042 ms")
          addToTerminal("64 bytes from 127.0.0.1: icmp_seq=1 time=0.038 ms")
          addToTerminal("🤖 Robot is responding! All systems online!")
          addToTerminal(`⚡ Status: ${chipFixed ? "FULLY OPERATIONAL" : "NEEDS REPAIR"}`)
          addToTerminal("")
        } else {
          addToTerminal(`🌐 PING ${args}: Host unreachable`)
          addToTerminal("❌ Network error: Unknown host")
          addToTerminal("💡 Try: ping google.com or ping robot")
          addToTerminal("")
        }
        break

      case "status":
        addToTerminal("🤖 === ROBOT STATUS REPORT ===")
        addToTerminal("===============================")
        addToTerminal(`  Chip Status: ${chipFixed ? "✅ OPERATIONAL" : "❌ CORRUPTED"}`)
        addToTerminal(`  Power Level: ${chipFixed ? "⚡ 100% (5.0V)" : "🔋 15% (0.0V)"}`)
        addToTerminal(`  Happiness: ${chipFixed ? "😊 MAXIMUM JOY" : "😢 VERY SAD"}`)
        addToTerminal(`  Temperature: ${chipFixed ? "🌡️ 45°C (Normal)" : "🔥 85°C (Overheating)"}`)
        addToTerminal(`  Vault Access: ${chipFixed ? "🔓 UNLOCKED" : "🔒 LOCKED"}`)
        addToTerminal(`  Memory Usage: ${chipFixed ? "💾 Normal" : "💾 Corrupted"}`)
        addToTerminal(`  System Uptime: ${chipFixed ? "⏰ Stable" : "⏰ Unstable"}`)
        addToTerminal("")
        if (!chipFixed) {
          addToTerminal("🔧 REPAIR NEEDED: Use 'set_voltage 5' to fix chip")
          addToTerminal("")
        }
        break

      case "joke":
        const jokes = [
          "Why do robots never panic? They have nerves of steel! 🤖",
          "What do you call a robot who takes the long way around? R2-Detour! 🛣️",
          "Why was the robot angry? Someone kept pushing its buttons! 😤",
          "What's a robot's favorite type of music? Heavy metal! 🎵",
          "Why don't robots ever get tired? They're always charged up! ⚡",
          "What do you call a robot that loves to garden? A ro-botanist! 🌱",
          "Why did the robot go to therapy? It had too many bugs! 🐛",
          "What's a robot's favorite snack? Computer chips! 💻",
        ]
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
        addToTerminal("🎭 === ROBOT JOKE GENERATOR ===")
        addToTerminal(`  ${randomJoke}`)
        addToTerminal("😄 Hope that made you smile!")
        addToTerminal("")
        break

      case "hack":
        addToTerminal("🔓 === INITIATING HACK SEQUENCE ===")
        addToTerminal("Scanning for vulnerabilities...")
        addToTerminal("  [▓▓▓░░░░░░░] 30% - Checking firewalls...")
        setTimeout(() => {
          addToTerminal("  [▓▓▓▓▓▓░░░░] 60% - Bypassing security...")
          setTimeout(() => {
            addToTerminal("  [▓▓▓▓▓▓▓▓▓▓] 100% - Almost there...")
            addToTerminal("❌ ACCESS DENIED")
            addToTerminal("🛡️  Security system activated!")
            addToTerminal("🤖 Nice try! I'm unhackable!")
            addToTerminal("💡 But you can still fix my chip... 😉")
            addToTerminal("🔧 Hint: set_voltage 5")
            addToTerminal("")
          }, 1000)
        }, 1000)
        break

      case "coffee":
        addToTerminal("☕ === VIRTUAL COFFEE MACHINE ===")
        addToTerminal("Starting coffee brewing process...")
        addToTerminal("  🫘 Selecting premium beans...")
        setTimeout(() => {
          addToTerminal("  ⚙️  Grinding beans... *whirrrr*")
          setTimeout(() => {
            addToTerminal("  💧 Adding hot water... *bubble bubble*")
            setTimeout(() => {
              addToTerminal("  ☕ Your virtual coffee is ready!")
              addToTerminal("  🤖 Robots don't drink coffee, but I appreciate the gesture!")
              addToTerminal("  ⚡ I run on electricity and good vibes!")
              addToTerminal("  💡 Now how about fixing my chip? 😊")
              addToTerminal("")
            }, 800)
          }, 800)
        }, 800)
        break

      case "secret":
        addToTerminal("🤫 === SECRET COMMAND ACTIVATED ===")
        addToTerminal("  🎉 Congratulations, curious explorer!")
        addToTerminal("  🔍 You have the spirit of a true hacker!")
        addToTerminal("  🤖 The robot is impressed by your curiosity!")
        addToTerminal("  ✨ Keep exploring and learning!")
        addToTerminal("  🏆 Achievement unlocked: Terminal Explorer!")
        addToTerminal("")
        if (!chipFixed) {
          addToTerminal("  💡 Psst... between you and me...")
          addToTerminal("  🔧 The chip needs exactly 5 volts... 😉")
          addToTerminal("  ⚡ Command: set_voltage 5")
          addToTerminal("")
        } else {
          addToTerminal("  🎊 You've already mastered chip repair!")
          addToTerminal("  🤖 The robot is forever grateful!")
          addToTerminal("")
        }
        break

      case "clear":
        setTerminalHistory(["🤖 Terminal cleared", "💡 Type 'help' to see available commands", ""])
        break

      default:
        addToTerminal(`❌ Command not found: ${command}`)
        addToTerminal("💡 Type 'help' to see all available commands")
        addToTerminal("🔍 Try exploring with 'ls' and 'cat' commands!")
        addToTerminal("🎯 Main goal: set_voltage 5")
        addToTerminal("")
        break
    }
  }

  const runCommand = () => {
    if (!userInput.trim()) {
      addToTerminal("robot@repair:~$ ")
      addToTerminal("❌ Error: Please enter a command")
      addToTerminal("💡 Type 'help' for available commands")
      addToTerminal("")
      return
    }

    const parts = userInput.trim().split(" ")
    const command = parts[0]
    const args = parts.slice(1).join(" ")

    executeCommand(command, args)
    setUserInput("")
  }

  const addToTerminal = (line: string) => {
    setTerminalHistory((prev) => [...prev, line])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand()
    }
  }

  const handleRobotClick = () => {
    if (!chipFound) {
      showPopup(
        "😢 I'm feeling so sad... I lost my precious chip somewhere on this website. Without it, I can't function properly. Can you help me find it? Look for something glowing and out of place...",
      )
    } else if (!chipFixed) {
      showPopup(
        "😊 Thank you for finding my chip! But it's corrupted and needs repair. Help me fix it by setting the correct voltage in the terminal! Try typing 'help' to see all commands.",
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-green-400">
      {/* Back button */}
      <Button onClick={onBack} className="fixed top-4 left-4 z-10 bg-transparent" variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Journal
      </Button>

      <div className="container mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold mb-8 text-green-400">The Hacker's Vault</h1>

          {!chipFound ? (
            <div className="space-y-8">
              {/* Sad sitting robot */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="mb-8 flex cursor-pointer justify-center transition-transform hover:scale-110"
                onClick={handleRobotClick}
              >
                <img
      src="/sadrobo.gif" // Use the correct path to your GIF file
      alt="robo"
      className="h-auto w-32"
      style={{ objectFit: 'contain' }}
    />
              </motion.div>

              {/* Vault environment */}
              <div className="bg-gray-800/50 border border-green-400 rounded-lg p-8 max-w-2xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-purple-900/50 rounded-lg" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 text-red-400">⚠️ SYSTEM ERROR ⚠️</h2>
                  <p className="text-lg mb-6 text-gray-300">
                    The vault's security system has detected a missing component...
                  </p>

                  {/* Locked vault doors */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-16 h-16 bg-gray-700 border-2 border-red-500 rounded-lg flex items-center justify-center"
                      >
                        <Lock className="w-6 h-6 text-red-400" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-sm text-yellow-400 mb-4">
                    💡 Click on the sad robot to get a hint about the missing component!
                  </p>

                  {/* Error messages scrolling */}
                  <div className="bg-black rounded p-3 font-mono text-xs text-red-400 h-20 overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -100] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <div>ERROR: Missing critical component</div>
                      <div>SYSTEM: Chip not found</div>
                      <div>STATUS: Vault locked</div>
                      <div>HINT: Search the main page...</div>
                      <div>WARNING: Robot is sad</div>
                      <div>ERROR: Missing critical component</div>
                      <div>SYSTEM: Chip not found</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ) : !chipFixed ? (
            <div className="space-y-8">
              {/* Happy robot */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="mb-8 flex cursor-pointer justify-center transition-transform hover:scale-110"
                onClick={handleRobotClick}
              >
                <img
      src="/happybot.gif" // Use the correct path to your GIF file
      alt="robo"
      className="h-auto w-32"
      style={{ objectFit: 'contain' }}
    />
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Terminal Interface */}
                <div className="bg-black border-2 border-green-400 rounded-lg overflow-hidden">
                  {/* Terminal Header */}
                  <div className="bg-gray-800 px-4 py-2 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-center ml-4">
                      <Terminal className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-green-400 font-mono text-sm">chip-repair-terminal</span>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
                    {/* Terminal History */}
                    <div className="space-y-1 mb-4">
                      {terminalHistory.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-green-400"
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>

                    {/* Command Input */}
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">robot@repair:~$</span>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-transparent text-green-400 outline-none flex-1 font-mono"
                        placeholder="Type a command..."
                        disabled={isRunning}
                        autoFocus
                      />
                    </div>

                   
                  </div>

                  {/* Terminal Footer */}
                  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono">
                    💡 Type 'help' to see all commands | Main goal: set_voltage 5 | Many hidden features!
                  </div>
                </div>

                {/* Chip Status Display */}
                <div className="bg-gray-800/50 border border-purple-400 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">🔧 Chip Status Monitor</h3>
                  <div className="bg-black rounded-lg p-6 h-80 relative overflow-hidden border border-gray-600">
                    {/* Chip Diagram */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Main Chip */}
                        <motion.div
                          animate={
                            chipFixed
                              ? {
                                  boxShadow: ["0 0 20px #00ff00", "0 0 40px #00ff00", "0 0 20px #00ff00"],
                                }
                              : {
                                  boxShadow: ["0 0 10px #ff0000", "0 0 20px #ff0000", "0 0 10px #ff0000"],
                                }
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className={`w-24 h-16 border-2 rounded ${chipFixed ? "border-green-400 bg-green-900/30" : "border-red-400 bg-red-900/30"} relative`}
                        >
                          {/* Chip Pins */}
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`absolute w-2 h-1 ${chipFixed ? "bg-green-400" : "bg-red-400"}`}
                              style={{
                                [i < 4 ? "left" : "right"]: "-4px",
                                top: `${20 + (i % 4) * 8}px`,
                              }}
                            />
                          ))}

                          {/* Chip Label */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-xs font-mono ${chipFixed ? "text-green-400" : "text-red-400"}`}>
                              CHIP
                            </span>
                          </div>
                        </motion.div>

                        {/* Circuit Lines */}
                        <svg className="absolute -inset-4 w-32 h-32 pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <motion.line
                              key={i}
                              x1="16"
                              y1={`${40 + i * 8}`}
                              x2="0"
                              y2={`${40 + i * 8}`}
                              stroke={chipFixed ? "#00ff00" : "#ff0000"}
                              strokeWidth="1"
                              animate={
                                chipFixed
                                  ? {
                                      opacity: [0.5, 1, 0.5],
                                    }
                                  : {}
                              }
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                            />
                          ))}
                          {[...Array(4)].map((_, i) => (
                            <motion.line
                              key={i + 4}
                              x1="112"
                              y1={`${40 + i * 8}`}
                              x2="128"
                              y2={`${40 + i * 8}`}
                              stroke={chipFixed ? "#00ff00" : "#ff0000"}
                              strokeWidth="1"
                              animate={
                                chipFixed
                                  ? {
                                      opacity: [0.5, 1, 0.5],
                                    }
                                  : {}
                              }
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                            />
                          ))}
                        </svg>
                      </div>
                    </div>

                    {chipFixed && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4">
                        <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Celebrating robot */}
             <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="mb-8 flex cursor-pointer justify-center transition-transform hover:scale-110"
                onClick={handleRobotClick}
              >
                <img
      src="/runbot.gif" // Use the correct path to your GIF file
      alt="robo"
      className="h-auto w-32"
      style={{ objectFit: 'contain' }}
    />
              </motion.div>

              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-900/30 border border-green-400 rounded-lg p-8 max-w-4xl mx-auto"
                  >
                    <h2 className="text-3xl font-bold mb-4 text-green-300">🎊 CHIP REPAIR SUCCESSFUL! 🎊</h2>
                    <p className="text-lg mb-8 text-green-200">
                      Excellent work! You successfully repaired the robot's chip and restored full functionality!
                    </p>

                    {/* Success Terminal */}
                    <div className="bg-black border border-green-400 rounded-lg p-4 mb-8 font-mono text-sm">
                      <div className="text-green-400">
                        🔧 CHIP REPAIR COMPLETED SUCCESSFULLY!
                        <br />✅ Voltage: 5.0V (OPTIMAL)
                        <br />✅ Temperature: 45°C (NORMAL)
                        <br />✅ Status: FULLY OPERATIONAL
                        <br />🔓 Secret vault now accessible
                        <br />🤖 Robot happiness: MAXIMUM
                      </div>
                    </div>

                    {/* Unlocked Projects */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {[
                        {
                          name: "Neural Network Visualizer",
                          status: "Prototype",
                          description: "Interactive visualization of neural networks in real-time",
                          tech: "Three.js, WebGL",
                        },
                        {
                          name: "Quantum CSS Framework",
                          status: "Experimental",
                          description: "CSS framework that adapts based on user behavior patterns",
                          tech: "CSS3, Machine Learning",
                        },
                        {
                          name: "AI Code Poet",
                          status: "Fun Project",
                          description: "Generates beautiful poetry from code comments",
                          tech: "OpenAI API, NLP",
                        },
                        {
                          name: "Holographic UI Library",
                          status: "Future Tech",
                          description: "3D holographic interface components for AR/VR",
                          tech: "WebXR, Three.js",
                        },
                        {
                          name: "Time-Travel Debugger",
                          status: "Research",
                          description: "Debug code by traveling through execution timeline",
                          tech: "Node.js, Time Magic",
                        },
                        {
                          name: "Emotion-Responsive UI",
                          status: "Prototype",
                          description: "Interface that adapts to user's emotional state",
                          tech: "Computer Vision, ML",
                        },
                      ].map((project, index) => (
                        <motion.div
                          key={project.name}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{
                            opacity: unlockedItems.includes(`project${index + 1}`) ? 1 : 0.3,
                            y: 0,
                            scale: unlockedItems.includes(`project${index + 1}`) ? 1 : 0.8,
                          }}
                          transition={{ delay: index * 0.3 }}
                          className="bg-purple-900/30 border border-purple-400 rounded-lg p-6 hover:bg-purple-900/50 transition-colors cursor-pointer relative"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{
                              scale: unlockedItems.includes(`project${index + 1}`) ? [0, 1.5, 1] : 1,
                              rotate: unlockedItems.includes(`project${index + 1}`) ? [0, 180, 360] : 0,
                            }}
                            transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
                            className="absolute top-2 right-2"
                          >
                            {unlockedItems.includes(`project${index + 1}`) ? (
                              <Unlock className="w-5 h-5 text-green-400" />
                            ) : (
                              <Lock className="w-5 h-5 text-red-400" />
                            )}
                          </motion.div>

                          <h3 className="font-bold text-purple-300 mb-2">{project.name}</h3>
                          <p className="text-sm text-purple-400 mb-3">{project.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-purple-500">{project.tech}</span>
                            <span className="text-xs bg-purple-700 text-purple-200 px-2 py-1 rounded">
                              {project.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hacker wisdom */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="mt-8 p-6 bg-yellow-900/20 border border-yellow-400 rounded-lg"
                    >
                      <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                      <blockquote className="text-yellow-300 text-lg italic text-center mb-4">
                        "You just learned the basics of hardware debugging! Every chip needs the right voltage to work
                        properly. Great job fixing me!"
                      </blockquote>
                      <p className="text-yellow-400 text-sm text-center">- The Fully Operational Robot 🤖</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
