import { prisma } from '@/lib/prisma'
import ListingCard from './ListingCard'

export default async function PopularListings() {
  const listings = await prisma.listing.findMany({
    take: 8,
    orderBy: { rating: 'desc' },
    include: {
      host: true,
    },
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
  )
}