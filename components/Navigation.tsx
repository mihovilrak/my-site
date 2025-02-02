"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LanguageSwitcher from "./LanguageSwitcher";

export default () => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
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
          } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-center gap-4 bg-background/95 md:bg-transparent p-4 md:p-0 border-b md:border-0`}
        >
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            {t('navigation.about')}
          </a>

          {/* Professional Background Dropdown */}
          <div className="dropdown-container relative group w-full md:w-auto">
            <button
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 w-full md:w-auto justify-center md:justify-start"
              onClick={() => setActiveDropdown(activeDropdown === 'professional' ? null : 'professional')}
            >
              {t('navigation.professional')}
              <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'professional' ? 'rotate-180' : ''}`} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`${
                activeDropdown === 'professional' ? 'flex' : 'hidden'
              } flex-col w-full md:absolute md:w-48 bg-background/95 border rounded-md py-1 z-50 md:mt-2 mt-1`}
            >
              <a href="#experience" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.experience')}
              </a>
              <a href="#education" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.education')}
              </a>
              <a href="#skills" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.skills')}
              </a>
            </div>
          </div>

          {/* Qualifications Dropdown */}
          <div className="dropdown-container relative group w-full md:w-auto">
            <button
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 w-full md:w-auto justify-center md:justify-start"
              onClick={() => setActiveDropdown(activeDropdown === 'qualifications' ? null : 'qualifications')}
            >
              {t('navigation.qualifications')}
              <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'qualifications' ? 'rotate-180' : ''}`} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`${
                activeDropdown === 'qualifications' ? 'flex' : 'hidden'
              } flex-col w-full md:absolute md:w-48 bg-background/95 border rounded-md py-1 z-50 md:mt-2 mt-1`}
            >
              <a href="#expertise" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.expertise')}
              </a>
              <a href="#certificates" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.certificates')}
              </a>
              <a href="#projects" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.projects')}
              </a>
              <a href="#other" className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 text-center md:text-left">
                {t('navigation.other')}
              </a>
            </div>
          </div>

          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            {t('navigation.contact')}
          </a>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
