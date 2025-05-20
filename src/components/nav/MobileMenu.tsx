
'use client'

import { useState } from 'react'
import { X, Menu } from 'lucide-react'


const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav>
      {/* Hamburger Button */}
      <button onClick={toggleMenu} className="md:hidden p-2">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menü</h2>
            <button onClick={toggleMenu}>
              <X size={28} />
            </button>
          </div>

          {/* Menüeinträge */}
          <nav className="space-y-4 text-lg">
            <div>
              <h3 className="font-semibold">Kategorien</h3>
              <ul className="ml-4 space-y-2">
                <li>Damen</li>
                <li>Herren</li>
                <li>Kinder</li>
                <li>Universal</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Shop</h3>
              <ul className="ml-4 space-y-2">
                <li>Warenkorb</li>
                <li>Mein Konto</li>
          
              </ul>
            </div>

         
          </nav>
        </div>
      )}
    </nav>
  )
}

export default MobileMenu
