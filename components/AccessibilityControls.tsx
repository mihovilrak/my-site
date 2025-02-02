'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const DEFAULT_SETTINGS = {
  fontSize: 100,
  letterSpacing: 0,
  theme: 'system'
};

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_SETTINGS.fontSize);
  const [letterSpacing, setLetterSpacing] = useState(DEFAULT_SETTINGS.letterSpacing);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-fontSize');
    const savedLetterSpacing = localStorage.getItem('accessibility-letterSpacing');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedLetterSpacing) setLetterSpacing(parseInt(savedLetterSpacing));
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.style.fontSize = `${fontSize}%`;
      document.documentElement.style.letterSpacing = `${letterSpacing}px`;
      localStorage.setItem('accessibility-fontSize', fontSize.toString());
      localStorage.setItem('accessibility-letterSpacing', letterSpacing.toString());
    }
  }, [fontSize, letterSpacing, mounted]);

  const resetToDefaults = () => {
    setFontSize(DEFAULT_SETTINGS.fontSize);
    setLetterSpacing(DEFAULT_SETTINGS.letterSpacing);
    setTheme(DEFAULT_SETTINGS.theme);
    localStorage.removeItem('accessibility-fontSize');
    localStorage.removeItem('accessibility-letterSpacing');
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Accessibility Controls"
      >
        <i className="fas fa-universal-access text-xl"></i>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-background border rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Accessibility Options</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-foreground">Font Size ({fontSize}%)</label>
              <input
                type="range"
                min="80"
                max="150"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-foreground">Letter Spacing ({letterSpacing}px)</label>
              <input
                type="range"
                min="0"
                max="5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-foreground">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 rounded border bg-background text-foreground"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <button
              onClick={resetToDefaults}
              className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close accessibility controls"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls;
