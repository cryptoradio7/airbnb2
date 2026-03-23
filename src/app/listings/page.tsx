import { prisma } from '@/lib/prisma'
import ListingCard from '@/components/ListingCard'
import { Search, Filter, Map } from 'lucide-react'

interface SearchParams {
  q?: string
  checkin?: string
  checkout?: string
  guests?: string
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { q, checkin, checkout, guests } = params
  
  // Build filter
  const where: any = {}
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { location: { contains: q, mode: 'insensitive' } },
    ]
  }

  const listings = await prisma.listing.findMany({
    where,
    include: { host: true },
    orderBy: { rating: 'desc' },
  })

  const totalListings = listings.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {q ? `Résultats pour "${q}"` : 'Tous les logements'}
              </h1>
              <p className="text-gray-600">
                {totalListings} logement{totalListings > 1 ? 's' : ''} disponible{totalListings > 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
                <span className="font-medium">Filtres</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Map size={18} />
                <span className="font-medium">Afficher la carte</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {['Annulation gratuite', 'WiFi', 'Cuisine', 'Piscine', 'Parking', 'Climatisation'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 border border-gray-300 rounded-full whitespace-nowrap hover:border-gray-900"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Prix par nuit</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>€0</span>
                      <span>€400+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="400"
                      defaultValue="200"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Type de logement</h3>
                  <div className="space-y-2">
                    {['Entire apartment', 'Entire house', 'Private room', 'Shared room', 'Entire villa'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Chambres et lits</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-900"
                      >
                        {num} {num === 1 ? 'chambre' : 'chambres'}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg font-semibold hover:bg-[#E14B50]">
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:w-3/4">
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <Search size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Aucun logement trouvé</h2>
                <p className="text-gray-600">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      id={listing.id}
                      title={listing.title}
                      city={listing.city}
                      price={listing.price}
                      rating={listing.rating}
                      reviewCount={listing.reviewCount}
                      images={JSON.parse(listing.images)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {listings.length > 12 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Précédent
                      </button>
                      {[1, 2, 3, '...', 10].map((page) => (
                        <button
                          key={page}
                          className={`px-4 py-2 border rounded-lg ${
                            page === 1
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Suivant
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}