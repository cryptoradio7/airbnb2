'use client'

import { Search, Globe, Menu, User, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EBEBEB]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#FF385C] tracking-tight">airbnb</div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="w-full max-w-xl">
              <div className="flex items-center border border-[#EBEBEB] rounded-full shadow-sm hover:shadow-md transition-shadow py-2.5 px-4">
                <button className="px-4 py-1 text-sm font-semibold border-r border-[#EBEBEB]">
                  N'importe où
                </button>
                <button className="px-4 py-1 text-sm border-r border-[#EBEBEB] text-[#717171]">
                  Une semaine
                </button>
                <button className="px-4 py-1 text-sm text-[#717171] flex items-center gap-2">
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
            <button className="hidden md:block text-sm font-medium hover:bg-[#F7F7F7] px-4 py-2.5 rounded-full">
              Devenez hôte
            </button>
            
            <button className="p-2 hover:bg-[#F7F7F7] rounded-full">
              <Globe size={20} />
            </button>
            
            <div className="flex items-center gap-3 border border-[#EBEBEB] rounded-full px-4 py-2.5 hover:shadow-md transition-shadow cursor-pointer">
              <Menu size={20} />
              <User size={20} className="text-[#717171]" />
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
              className="flex flex-col items-center gap-2 hover:text-[#222222] text-[#717171] whitespace-nowrap pb-2 border-b-2 border-transparent hover:border-[#EBEBEB] transition-colors"
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