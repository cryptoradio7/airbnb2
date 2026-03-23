'use client'

import { Search, Globe, Menu, User, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#FF385C] tracking-tight">airbnb</div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="w-full max-w-xl">
              <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow py-2 px-4">
                <button className="px-4 py-1 text-sm font-semibold border-r border-gray-300">
                  N'importe où
                </button>
                <button className="px-4 py-1 text-sm border-r border-gray-300 text-gray-600">
                  Une semaine
                </button>
                <button className="px-4 py-1 text-sm text-gray-600 flex items-center gap-2">
                  <span>Ajouter des voyageurs</span>
                  <div className="bg-[#FF385C] text-white rounded-full p-1.5">
                    <Search size={14} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full">
              Devenez hôte
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Globe size={20} />
            </button>
            
            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition-shadow cursor-pointer">
              <Menu size={20} />
              <User size={20} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div 
            className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSearchOpen(true)}
          >
            <div className="flex items-center gap-3">
              <Search size={20} className="text-[#FF385C]" />
              <div>
                <div className="text-sm font-semibold">Où allez-vous ?</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>N'importe quand</span>
                  <span>•</span>
                  <span>Ajouter des voyageurs</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-full p-2">
              <Search size={16} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="hidden lg:flex items-center justify-center gap-8 mt-6 pb-2 overflow-x-auto">
          {[
            { icon: '🏠', label: 'Maisons' },
            { icon: '🏙️', label: 'Appartements' },
            { icon: '🏕️', label: 'Cabanes' },
            { icon: '🏖️', label: 'Bord de mer' },
            { icon: '⛰️', label: 'Montagne' },
            { icon: '🏊', label: 'Piscines' },
            { icon: '🏰', label: 'Châteaux' },
            { icon: '🚐', label: 'Camping-cars' },
            { icon: '🏔️', label: 'Dômes' },
            { icon: '🚢', label: 'Bateaux' },
          ].map((cat) => (
            <button
              key={cat.label}
              className="flex flex-col items-center gap-2 hover:text-gray-900 text-gray-600 whitespace-nowrap pb-2 border-b-2 border-transparent hover:border-gray-300"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}