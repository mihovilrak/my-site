"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Github, Linkedin, Mail, Moon, Send, Sun } from "lucide-react"

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
}

export default () => {
  const [theme, setTheme] = useState("light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      if (data.error) {
        throw new Error(data.error)
      }

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

  useEffect(() => {
    async function fetchGitHubRepos() {
      try {
        const response = await fetch('https://api.github.com/users/mihovilrak/repos')
        const repos = await response.json()
        setProjects(repos.filter((repo: GitHubRepo) => !repo.fork))
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error)
      }
    }

    fetchGitHubRepos()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className={theme === "dark" ? "min-h-screen bg-background-dark text-foreground-dark" : "min-h-screen bg-background text-foreground"}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <span className="text-xl font-bold"></span>

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

            {/* Professional Background Dropdown */}
            <div className="dropdown-container relative group w-full md:w-auto">
              <button
                className="hover:text-primary transition-colors flex items-center gap-1 w-full md:w-auto justify-center md:justify-start"
                onClick={() => setActiveDropdown(activeDropdown === 'professional' ? null : 'professional')}
              >
                Professional Background
                <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'professional' ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`${
                  activeDropdown === 'professional' ? 'flex' : 'hidden'
                } flex-col w-full md:absolute md:w-48 bg-background border rounded-md shadow-lg py-1 z-50 md:mt-2 mt-1`}
              >
                <a href="#experience" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Experience
                </a>
                <a href="#education" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Education
                </a>
                <a href="#skills" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Skills
                </a>
              </div>
            </div>

            {/* Qualifications Dropdown */}
            <div className="dropdown-container relative group w-full md:w-auto">
              <button
                className="hover:text-primary transition-colors flex items-center gap-1 w-full md:w-auto justify-center md:justify-start"
                onClick={() => setActiveDropdown(activeDropdown === 'qualifications' ? null : 'qualifications')}
              >
                Qualifications
                <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'qualifications' ? 'rotate-180' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`${
                  activeDropdown === 'qualifications' ? 'flex' : 'hidden'
                } flex-col w-full md:absolute md:w-48 bg-background border rounded-md shadow-lg py-1 z-50 md:mt-2 mt-1`}
              >
                <a href="#expertise" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Expertise
                </a>
                <a href="#certificates" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Certificates
                </a>
                <a href="#projects" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Projects
                </a>
                <a href="#other" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center md:text-left">
                  Other
                </a>
              </div>
            </div>

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
              <a href="mailto:mihovil.rak@hotmail.com">
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
              <h3 className="text-xl font-semibold mb-2">R&D Engineer</h3>
              <p className="text-muted-foreground mb-4">HIDROCIBALAE ltd. | 08.04.2024 - Present</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Achievements:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Creation and maintenance of internal Wiki (Bookstack, Docker)</li>
                    <li>Redesign and optimization of internal Python scripts to QGIS plugins to make them more user-friendly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duties:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Automatization of internal workflows</li>
                    <li>Processing, analysis and QC of bathymetric data</li>
                    <li>Working on international projects</li>
                    <li>Maintenance of internal trainings</li>
                    <li>IT support</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">GIS Specialist</h3>
              <p className="text-muted-foreground mb-4">PREHNIT ltd. | 21.02.2023 - 07.04.2024</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Achievements:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Redesign and optimization of internal PostgreSQL database</li>
                    <li>Automatization of working processes inside the GIS department (mostly with Python and FME)</li>
                    <li>Redesign of companies Web GIS service via GeoServer and PostgreSQL/PostGIS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Duties:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Creation, processing, analysis, QC, and visualization of spatial data using GIS tools</li>
                    <li>Field data collection using GNSS devices, drones, 360 cameras</li>
                    <li>Processing photogrammetric and LiDAR data for creating orthophotos, DEMs, DSMs, and 3D models</li>
                    <li>Design and management of relational databases</li>
                    <li>Project management and leading of teams of up to 10 people</li>
                    <li>GIS education maintenance</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">GIS Tehnician</h3>
              <p className="text-muted-foreground mb-4">PREHNIT ltd. | 01.09.2022 - 20.02.2023</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Creation, processing, analysis of spatial data using GIS tools</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">GIS & Office Assistant</h3>
              <p className="text-muted-foreground mb-4">GDi llc | 25.01.2022 - 31.08.2022</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Geocoding, vectorization, data entry, etc., primarily in ArcGIS Pro</li>
                <li>Surveying water infrastructure with GNSS devices and Field Maps</li>
              </ul>
            </Card>
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

      {/* Expertise Section */}
      <section id="expertise" className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Areas of Expertise</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Spatial Data Management</h3>
              <p>Proficiency in GIS tools (ArcMap, ArcGIS Pro, QGIS, Global Mapper, GDAL, GeoServer, Google Earth, PostGIS) for spatial data analysis, processing, quality control, and visualization.</p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Process Automation</h3>
              <p>Expertise in automating workflows and ETL tasks using Python, FME, PL/pgSQL, Batch and Shell scripting.</p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-satellite"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Remote Sensing</h3>
              <p>Experience with drone operations (DJI Phantom 4, Matrice M300), GNSS devices, and 360 cameras. Skilled in processing bathymetric, photogrammetric, and LiDAR data.</p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-database"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Database Management</h3>
              <p>Proficient in the administration, design, and management of relational databases (PostgreSQL, MySQL, MariaDB, Microsoft SQL, SQLite).</p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-users-cog"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Project Leadership</h3>
              <p>Experience in managing projects and leading teams.</p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Web Development</h3>
              <p>Knowledgeable in web development, with experience in HTML, CSS, JavaScript, TypeScript, Flask, Express, React, Docker, and Git.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Automatization and ETL</h3>
              <ul className="space-y-2">
                <li>Python</li>
                <li>FME</li>
                <li>PL/pgSQL</li>
                <li>Shell scripting</li>
                <li>Batch scripting</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Relational databases</h3>
              <ul className="space-y-2">
                <li>PostgreSQL</li>
                <li>Microsoft SQL</li>
                <li>MySQL</li>
                <li>SQLite</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Virtualization and containerisation</h3>
              <ul className="space-y-2">
                <li>Docker</li>
                <li>VMware</li>
                <li>Playstation</li>
                <li>Oracle VirtualBox</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">GIS tools</h3>
              <ul className="space-y-2">
                <li>ArcGIS products</li>
                <li>QGIS</li>
                <li>Global Mapper</li>
                <li>GDAL</li>
                <li>GeoServer</li>
                <li>Google Earth</li>
                <li>PostGIS</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Web development</h3>
              <ul className="space-y-2">
                <li>HTML/CSS/JavaScript</li>
                <li>Git</li>
                <li>TypeScript</li>
                <li>React.js</li>
                <li>Node.js</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data processing</h3>
              <ul className="space-y-2">
                <li>Agisoft Metashape</li>
                <li>BeamworX Autoclean</li>
                <li>Bentley iTwin</li>
                <li>DJI Terra</li>
                <li>LiDAR360</li>
                <li>Sonarwiz</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Certificates and Courses</h2>
          <div className="space-y-4">
            <div className="list-disc list-inside">
              <li>ArcGIS Pro: Essential Workflow - GDi llc</li>
              <li>Introduction to QGIS - Prehnit ltd</li>
              <li>Presentation Skills - Ramiro ltd</li>
              <li>CS50's Understanding Technology - edX</li>
            </div>
          </div>
        </div>
      </section>

      {/* Other Section */}
      <section id="other" className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Other</h2>
          <div className="space-y-4">
            <ul className="list-disc list-inside">
              <li>Croatian C2, English B2, German A2</li>
              <li>Driver's License B</li>
              <li>EASA certificate for remote pilot A1/A3, A2</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(repo => (
              <Card key={repo.id} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                <p className="text-muted-foreground mb-4">{repo.description || 'No description available'}</p>
                <div className="flex gap-4">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <i className="fab fa-github mr-2"></i> View on GitHub
                  </a>
                  {repo.homepage && (
                    <a 
                      href={repo.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out through any of these platforms:
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="https://github.com/mihovilrak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mihovil-rak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:mihovil.rak@hotmail.com"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>mihovil.rak@hotmail.com</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {formStatus.type && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      formStatus.type === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p>&copy; 2025 Mihovil Rak. All rights reserved.</p>
      </footer>
    </div>
  )
}
