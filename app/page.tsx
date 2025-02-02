"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function CV() {
  const [theme, setTheme] = useState("light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (prefersDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-xl font-bold">MR</span>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-center gap-4 bg-background md:bg-transparent p-4 md:p-0 border-b md:border-0`}
          >
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#experience" className="hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#education" className="hover:text-primary transition-colors">
              Education
            </a>
            <a href="#expertise" className="hover:text-primary transition-colors">
              Expertise
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full overflow-hidden mb-8 ring-4 ring-primary">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mihovil Rak</h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4">Master of Geography</h2>
          <p className="text-xl mb-8">GIS & Software Engineer</p>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/mihovilrak" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://www.linkedin.com/in/mihovil-rak/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:mihovil.rak@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-lg max-w-3xl">
            I am a Master of Geography with a focus on GIS and software development. With experience in both spatial analysis
            and programming, I bridge the gap between geographic information systems and modern web technologies.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">GIS Specialist & Software Developer</h3>
              <p className="text-muted-foreground mb-4">Promet i prostor d.o.o. | 2022 - Present</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Development of GIS web applications</li>
                <li>Spatial data analysis and processing</li>
                <li>Database management and optimization</li>
              </ul>
            </Card>
            {/* Add more experience cards */}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Master's in Geography</h3>
              <p className="text-muted-foreground mb-2">Faculty of Science - University of Zagreb</p>
              <p>2019 - 2022</p>
              <p>GIS specialization</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Bachelor's in Geography</h3>
              <p className="text-muted-foreground mb-2">Faculty of Science - University of Zagreb</p>
              <p>2016 - 2019</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Database Administration</h3>
              <p className="text-muted-foreground mb-2">Algebra University</p>
              <p>One semestral course</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">GIS</h3>
              <ul className="space-y-2">
                <li>ArcGIS</li>
                <li>QGIS</li>
                <li>Spatial Analysis</li>
                <li>Cartography</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Programming</h3>
              <ul className="space-y-2">
                <li>Python</li>
                <li>JavaScript/TypeScript</li>
                <li>HTML/CSS</li>
                <li>SQL</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <ul className="space-y-2">
                <li>Git</li>
                <li>PostgreSQL/PostGIS</li>
                <li>React/Next.js</li>
                <li>Node.js</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:mihovil.rak@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.linkedin.com/in/mihovil-rak/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
