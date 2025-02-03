"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import { useTranslations } from "next-intl"
import Navigation from "@/components/Navigation"
import AccessibilityControls from "@/components/AccessibilityControls"
import ScrollToTop from "@/components/ScrollToTop"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  fork: boolean
}

interface Experience {
  title: string
  company: string
  period: string
  achievements?: string[]
  duties?: string[]
}

interface Certificate {
  degree: string
  university: string
  period?: string
}

interface ExpertiseItem {
  icon: string
  title: string
  description: string
  items?: string[]
}

const Page = () => {
  const t = useTranslations()
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      if (data.error) {
        throw new Error(data.error)
      }

      setFormStatus({
        type: "success",
        message: t("contact.success"),
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        type: "error",
        message: t("contact.error"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    async function fetchGitHubRepos() {
      try {
        const response = await fetch("https://api.github.com/users/mihovilrak/repos")
        const repos = await response.json()
        setProjects(repos.filter((repo: GitHubRepo) => !repo.fork))
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error)
      }
    }

    fetchGitHubRepos()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 pt-24 bg-gradient-to-b from-primary/10 to-background dark:from-primary/5 dark:to-background-dark pb-16">
          <div className="relative mx-auto w-48 h-48 mb-8 overflow-hidden">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 shadow-lg"></div>
            <Image
              src="/profile.jpg"
              alt="Profile picture"
              width={192}
              height={192}
              className="rounded-full object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {t("hero.name")}
          </h1>
          <p className="text-2xl mb-2 text-foreground/80">{t("hero.title")}</p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          <div className="flex justify-center gap-4 mt-8">
            <a href="https://github.com/mihovilrak" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Profile</span>
              </Button>
            </a>
            <a href="https://linkedin.com/in/mihovil-rak" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn Profile</span>
              </Button>
            </a>
            <a href="mailto:mihovil.rak@hotmail.com">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email Contact</span>
              </Button>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-primary">{t("about.title")}</h2>
          <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-background-dark/60 bg-background/60">
            <p className="text-lg text-muted-foreground leading-relaxed">{t("about.description")}</p>
          </Card>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("experience.title")}</h2>

          {/* Current Experience */}
          <Card className="mb-8 p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
            <p className="text-xl mb-2">{t("experience.current.company")}</p>
            <p className="text-sm text-muted-foreground mb-4">{t("experience.current.period")}</p>

            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-lg">{t("experience.achievements")}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {t.raw("experience.current.achievements").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg">{t("experience.duties")}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {t.raw("experience.current.duties").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Previous Experience */}
          {t.raw("experience.previous").map((exp: Experience, index: number) => (
            <Card
              key={index}
              className="mb-8 p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60"
            >
              <h3 className="text-2xl font-semibold mb-3 text-primary">{exp.title}</h3>
              <p className="text-xl mb-2">{exp.company}</p>
              <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>

              {exp.achievements && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-lg">{t("experience.achievements")}</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {exp.achievements.map((item: string, achievementIndex: number) => (
                      <li key={achievementIndex} className="text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.duties && (
                <div>
                  <h4 className="font-semibold mb-3 text-lg">{t("experience.duties")}</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {exp.duties.map((item: string, dutyIndex: number) => (
                      <li key={dutyIndex} className="text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("education.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-3 text-primary">{t("education.masters.degree")}</h3>
              <p className="text-lg mb-2">{t("education.masters.university")}</p>
              <p className="text-sm text-muted-foreground mb-4">{t("education.masters.period")}</p>
              <p className="text-muted-foreground">{t("education.masters.specialization")}</p>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-3 text-primary">{t("education.bachelors.degree")}</h3>
              <p className="text-lg mb-2">{t("education.bachelors.university")}</p>
              <p className="text-sm text-muted-foreground mb-4">{t("education.bachelors.period")}</p>
            </Card>
            {t.raw("education.certificates").map((cert: Certificate, index: number) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60"
              >
                <h3 className="text-2xl font-semibold mb-3 text-primary">{cert.degree}</h3>
                <p className="text-lg mb-2">{cert.university}</p>
                <p className="text-sm text-muted-foreground mb-4">{cert.period}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("skills.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-code mr-3"></i>
                {t("skills.automation.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.automation.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-database mr-3"></i>
                {t("skills.databases.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.databases.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-server mr-3"></i>
                {t("skills.virtualization.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.virtualization.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-map-marked-alt mr-3"></i>
                {t("skills.gis.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.gis.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-laptop-code mr-3"></i>
                {t("skills.webdev.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.webdev.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-primary">
                <i className="fas fa-chart-bar mr-3"></i>
                {t("skills.dataprocessing.title")}
              </h3>
              <ul className="space-y-3">
                {t.raw("skills.dataprocessing.items").map((item: string, index: number) => (
                  <li key={index} className="text-muted-foreground flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("expertise.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.raw("expertise.items").map((item: ExpertiseItem, index: number) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <i className={`fas ${item.icon} text-primary text-3xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl mb-4 text-primary">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("certificates.title")}</h2>
          <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
            <ul className="space-y-4">
              {t.raw("certificates.items").map((item: string, index: number) => (
                <li key={index} className="text-muted-foreground flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("projects.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60"
              >
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">{project.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow line-clamp-3">{project.description}</p>
                  <div className="flex gap-4 mt-auto">
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t("projects.github")}
                      </Button>
                    </a>
                    {project.homepage && (
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          {t("projects.demo")}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Section */}
        <section id="other" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("other.title")}</h2>
          <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
            <ul className="space-y-4">
              {t.raw("other.items").map((item: string, index: number) => (
                <li key={index} className="text-muted-foreground flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary mr-3 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-primary">{t("contact.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-phone text-primary text-xl"></i>
                  </div>
                  <p className="text-muted-foreground">+385 99 610 0477</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-envelope text-primary text-xl"></i>
                  </div>
                  <a
                    href="mailto:mihovil.rak@hotmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    mihovil.rak@hotmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                  </div>
                  <p className="text-muted-foreground">{t("contact.location")}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="fab fa-linkedin text-primary text-xl"></i>
                  </div>
                  <a
                    href="https://linkedin.com/in/mihovil-rak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/mihovil-rak
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-primary/10 dark:bg-gray-800/60 bg-gray-100/60">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder={t("contact.form.name")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={t("contact.form.email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={t("contact.form.message")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {t("contact.form.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-4 w-4" />
                      {t("contact.form.send")}
                    </span>
                  )}
                </Button>
                {formStatus.type && (
                  <div
                    className={`mt-4 p-4 rounded-md ${
                      formStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}
              </form>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground"> 2025 Mihovil Rak. All rights reserved.</footer>
      </main>

      <AccessibilityControls />
      <ScrollToTop />
    </div>
  )
}

export default Page;