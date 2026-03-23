'use client'

import { Search, Globe, Menu, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-[#FF5A5F]">airbnb2</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <button className="px-4 py-2 text-sm font-semibold border-r border-gray-300">
              N'importe où
            </button>
            <button className="px-4 py-2 text-sm border-r border-gray-300 text-gray-600">
              N'importe quand
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
              <span>Voyageurs</span>
              <div className="bg-[#FF5A5F] text-white rounded-full p-1">
                <Search size={16} />
              </div>
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium">
              Devenez hôte
            </button>
            
            <button className="p-2">
              <Globe size={20} />
            </button>
            
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow">
              <Menu size={20} />
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-3">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <Search size={20} className="text-gray-500 mr-2" />
            <div className="flex-1">
              <div className="text-sm font-semibold">Où allez-vous ?</div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>N'importe quand</span>
                <span>•</span>
                <span>Voyageurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}