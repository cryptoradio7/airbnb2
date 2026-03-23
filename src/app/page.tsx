import SearchBar from '@/components/SearchBar'
import CategoryGrid from '@/components/CategoryGrid'
import PopularListings from '@/components/PopularListings'

export default async function HomePage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <SearchBar />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Explorer par type de logement</h2>
        <CategoryGrid />
      </section>

      {/* Popular Listings */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Logements populaires</h2>
          <button className="text-[#FF5A5F] font-semibold hover:underline">
            Tout afficher →
          </button>
        </div>
        <PopularListings />
      </section>

      {/* Inspiration Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Inspirations pour votre prochain voyage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
            { city: 'Lyon', country: 'France', image: 'https://images.unsplash.com/photo-1569949381669-ecf31b5c55f9?w=800&q=80' },
            { city: 'Marseille', country: 'France', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80' },
            { city: 'Nice', country: 'France', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80' },
          ].map((dest) => (
            <div key={dest.city} className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-[3/4] bg-gray-200">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{dest.city}</h3>
                <p className="text-sm opacity-90">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}