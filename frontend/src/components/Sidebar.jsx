import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaFire, FaHome, FaStar } from 'react-icons/fa'
import { CgInfo   } from 'react-icons/cg'
import useDelayTextoMenu from '../hooks/useDelayTextoMenu';
import DarkModeToggle from './DarkModeToggle'

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  const links = [
    { to: '/pesquisa', icon: <FaSearch size={24} />, label: 'Pesquisa' },
    { to: '/principal', icon: <FaHome size={24} />, label: 'Principal' },
    { to: '/emalta', icon: <FaFire size={24} />, label: 'Em Alta' },
    { to: '/favoritos', icon: <FaStar size={24} />, label: 'Favoritos' },
    { to: '/informacoes', icon: <CgInfo size={24} />, label: 'Informações' },
  ]

  const showLabel = useDelayTextoMenu(expanded);

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`flex flex-col justify-between bg-secondary dark:bg-secondary-dark text-white h-screen p-2
                  transition-all duration-500 ease-in-out 
                  ${expanded ? 'w-48' : 'w-16'}`}
    >
      <nav>
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors duration-500 ${
                isActive ? 'bg-blue-500 dark:bg-gray-700' : ''
              }`
            }
            title={expanded ? '' : label}
          >
            {icon}
            {showLabel && <span className="ml-4 opacity-0 animate-fade-in">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4">
        <DarkModeToggle expanded={expanded} />
      </div>
    </div>
  )
}
