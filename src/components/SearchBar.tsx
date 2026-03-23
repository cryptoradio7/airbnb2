'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('q', destination)
    if (checkIn) params.set('checkin', checkIn)
    if (checkOut) params.set('checkout', checkOut)
    if (guests) params.set('guests', guests)
    
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8">
      <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center tracking-tight">
        Trouvez des logements uniques
        <br />
        <span className="text-[#FF385C]">pour vos prochaines vacances</span>
      </h1>

      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-[32px] airbnb-shadow p-1 border border-[#EBEBEB]"
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Destination */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wider">
                Destination
              </label>
              <input
                type="text"
                placeholder="Rechercher une destination"
                className="w-full text-lg placeholder-[#717171] outline-none font-medium"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wider">
                Arrivée
              </label>
              <input
                type="date"
                className="w-full text-lg text-[#222222] outline-none font-medium"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wider">
                Départ
              </label>
              <input
                type="date"
                className="w-full text-lg text-[#222222] outline-none font-medium"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
              <label className="block text-xs font-semibold text-[#222222] mb-1 uppercase tracking-wider">
                Voyageurs
              </label>
              <div className="flex items-center justify-between">
                <select
                  className="w-full text-lg text-[#222222] outline-none font-medium bg-transparent"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'voyageur' : 'voyageurs'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#FF385C] text-white rounded-[24px] md:rounded-full p-4 md:p-3 flex items-center justify-center gap-3 hover:bg-[#E14B50] transition-colors font-semibold text-lg"
            >
              <Search size={22} />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {[
          'Flexible sur les dates',
          'Annulation gratuite',
          'WiFi',
          'Cuisine',
          'Lave-linge',
          'Climatisation',
          'Parking gratuit',
        ].map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 border border-[#EBEBEB] rounded-full hover:border-[#222222] text-sm font-medium text-[#222222]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}