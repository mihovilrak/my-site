'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
  }, []);

  const switchLanguage = (langCode: string) => {
    localStorage.setItem('language', langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Update the URL to include the language
    const newPathname = pathname.replace(/^\/(en|hr|de)/, '');
    router.push(`/${langCode}${newPathname}`);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-background border">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 flex items-center gap-2
                  ${currentLang === language.code ? 'bg-primary/10' : ''}`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
