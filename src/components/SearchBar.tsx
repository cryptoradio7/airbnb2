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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Trouvez des logements uniques
        <br />
        <span className="text-[#FF5A5F]">pour vos prochaines vacances</span>
      </h1>

      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-xl p-2 md:p-1 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Destination */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                OÙ
              </label>
              <input
                type="text"
                placeholder="Rechercher une destination"
                className="w-full text-lg placeholder-gray-400 outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                ARRIVÉE
              </label>
              <input
                type="date"
                className="w-full text-lg text-gray-700 outline-none"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                DÉPART
              </label>
              <input
                type="date"
                className="w-full text-lg text-gray-700 outline-none"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full md:w-auto">
            <div className="px-6 py-4 md:py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                VOYAGEURS
              </label>
              <select
                className="w-full text-lg text-gray-700 outline-none bg-transparent"
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

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#FF5A5F] text-white rounded-xl md:rounded-full p-4 md:p-3 flex items-center justify-center gap-2 hover:bg-[#E14B50] transition-colors"
            >
              <Search size={20} />
              <span className="font-semibold">Rechercher</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}