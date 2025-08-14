import { Mail, Github, Linkedin, Twitter, MapPin, Phone, LucideIcon } from "lucide-react"

// Define a reusable type for our contact details
export interface ContactDetail {
  id: number
  type: 'email' | 'linkedin' | 'github' | 'Snapchat' | 'location' | 'phone'
  content: string
  detail: string
  displayDetail?: string // Optional display text for links
  href: string
  icon: LucideIcon
  color: string
  rotation: number
  x: number // position in percentage
  y: number // position in percentage
}

export const contactDetails: ContactDetail[] = [
  {
    id: 1,
    type: "email",
    content: "📧 Email Me",
    detail: "kushwahasneha874@gmail.com",
    href: "mailto:kushwahasneha874@gmail.com",
    displayDetail: "kushwahasneha874",
    icon: Mail,
    color: "bg-yellow-200",
    rotation: -5,
    x: 15,
    y: 20,
  },
  {
    id: 2,
    type: "linkedin",
    content: "💼 LinkedIn",
    detail: "linkedin.com/in/snehakushwaha874",
    displayDetail: "/in/snehakushwaha874",
    href: "https://www.linkedin.com/in/snehakushwaha874",
    icon: Linkedin,
    color: "bg-blue-200",
    rotation: 3,
    x: 60,
    y: 15,
  },
  {
    id: 3,
    type: "github",
    content: "🐙 GitHub",
    detail: "github.com/snehakushwaha874",
    displayDetail: "/snehakushwaha874",
    href: "https://github.com/snehakushwaha874r",
    icon: Github,
    color: "bg-purple-200",
    rotation: -2,
    x: 25,
    y: 60,
  },
  {
    id: 4,
    type: "Snapchat",
    content: "👻 SnapChat",
    detail: "snapchat.com/add/cutie.patuti",
    displayDetail: "add/cutie.patuti",
    href: "https://www.snapchat.com/add/cutie.patuti",
    icon: Twitter,
    color: "bg-cyan-200",
    rotation: 4,
    x: 70,
    y: 55,
  },


]