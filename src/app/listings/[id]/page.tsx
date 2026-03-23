import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Snowflake, Tv, Wind, Utensils } from 'lucide-react'

interface ListingPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { id } = await params
  
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      host: true,
      reviews: {
        orderBy: { date: 'desc' },
        take: 10,
      },
    },
  })

  if (!listing) {
    notFound()
  }

  const images = JSON.parse(listing.images)
  const amenities = JSON.parse(listing.amenities)
  
  const checkInDate = new Date()
  checkInDate.setDate(checkInDate.getDate() + 7)
  
  const checkOutDate = new Date(checkInDate)
  checkOutDate.setDate(checkOutDate.getDate() + 3)

  const totalPrice = listing.price * 3 // 3 nights

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={20} />,
    'Kitchen': <Utensils size={20} />,
    'Free parking': <Car size={20} />,
    'Air conditioning': <Snowflake size={20} />,
    'Heating': <Wind size={20} />,
    'TV': <Tv size={20} />,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-3xl overflow-hidden">
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <Image
                src={images[0] || '/placeholder.jpg'}
                alt={listing.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {images.slice(1, 5).map((img: string, index: number) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={img}
                alt={`${listing.title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                    Voir toutes les {images.length} photos
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Header */}
            <div className="border-b border-gray-200 pb-8">
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-current text-gray-900" />
                  <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                  <span className="text-gray-600">({listing.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={16} />
                  <span>{listing.location}</span>
                </div>
              </div>

              {/* Host Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Hôte : {listing.host.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Membre depuis {listing.host.joinedYear}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="fill-current text-gray-900" />
                    <span className="text-sm">{listing.host.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-600">({listing.host.reviewCount} avis)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 py-8">
              <h2 className="text-2xl font-bold mb-4">À propos de ce logement</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{listing.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 py-8">
              <h2 className="text-2xl font-bold mb-6">Ce que propose ce logement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-gray-700">
                      {amenityIcons[amenity] || <Wifi size={20} />}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {listing.reviews.length > 0 && (
              <div className="border-b border-gray-200 py-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={24} className="fill-current text-gray-900" />
                  <h2 className="text-2xl font-bold">
                    {listing.rating.toFixed(1)} · {listing.reviewCount} avis
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listing.reviews.map((review) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={review.authorAvatar}
                            alt={review.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{review.authorName}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < review.rating
                                    ? 'fill-current text-gray-900'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">
                              {new Date(review.date).toLocaleDateString('fr-FR', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-6">Où vous serez</h2>
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  {/* Map placeholder */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-600">{listing.location}</p>
                      <p className="text-sm text-gray-500">
                        {listing.lat.toFixed(4)}°, {listing.lng.toFixed(4)}°
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {listing.city}, {listing.country}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-2xl font-bold">€{listing.price}</div>
                  <div className="text-gray-600">par nuit</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-current text-gray-900" />
                  <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                  <span className="text-gray-600">({listing.reviewCount})</span>
                </div>
              </div>

              {/* Date Selector */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      ARRIVÉE
                    </label>
                    <div className="border border-gray-300 rounded-lg px-4 py-3">
                      {checkInDate.toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 mb-1">
                      DÉPART
                    </label>
                    <div className="border border-gray-300 rounded-lg px-4 py-3">
                      {checkOutDate.toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    VOYAGEURS
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3">
                    <option>1 voyageur</option>
                    <option>2 voyageurs</option>
                    <option>3 voyageurs</option>
                    <option>4 voyageurs</option>
                    <option>5 voyageurs</option>
                    <option>6+ voyageurs</option>
                  </select>
                </div>
              </div>

              {/* Reserve Button */}
              <button className="w-full bg-[#FF5A5F] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#E14B50] mb-6">
                Réserver
              </button>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 underline">
                    €{listing.price} × 3 nuits
                  </span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 underline">
                    Frais de service
                  </span>
                  <span>€{(totalPrice * 0.14).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>€{(totalPrice * 1.14).toFixed(2)}</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-500" />
                    <div>
                      <div className="font-semibold">{listing.maxGuests} voyageurs</div>
                      <div className="text-sm text-gray-600">max</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={20} className="text-gray-500" />
                    <div>
                      <div className="font-semibold">{listing.bedrooms} chambre{listing.bedrooms > 1 ? 's' : ''}</div>
                      <div className="text-sm text-gray-600">{listing.bedrooms * 2} lits</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={20} className="text-gray-500" />
                    <div>
                      <div className="font-semibold">{listing.bathrooms} salle{listing.bathrooms > 1 ? 's' : ''} de bain</div>
                      <div className="text-sm text-gray-600">Privée{listing.bathrooms > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                      {listing.type.includes('Entire') ? '🏠' : '🚪'}
                    </div>
                    <div>
                      <div className="font-semibold">{listing.type}</div>
                      <div className="text-sm text-gray-600">Logement entier</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}