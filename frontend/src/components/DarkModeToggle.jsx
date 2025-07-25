import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import useDelayTextoMenu from '../hooks/useDelayTextoMenu';


export default function DarkModeToggle({ expanded }) {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  const showLabel = useDelayTextoMenu(expanded);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center w-full p-3 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors"
      title={expanded ? '' : isDark ? 'Modo Claro' : 'Modo Escuro'}
    >
      {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
      {showLabel && <span className="ml-4 opacity-0 animate-fade-in">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>}
    </button>
  )
}
