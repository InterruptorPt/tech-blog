import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'react-feather'

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState(true)

  useEffect(() => {
    setDarkMode(
      !!window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    )
  }, [])

  useEffect(() => {
    const html = document.querySelector('html')
    if (!html) return

    html.classList.toggle('dark', isDarkMode)
    html.classList.toggle('light', !isDarkMode)
  }, [isDarkMode])

  return (
    <button
      title="Toggle dark mode"
      className="flex justify-center items-center h-12 w-12 rounded"
      onClick={() => setDarkMode((x) => !x)}
      type="button"
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  )
}
