import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/fr'

const prisma = new PrismaClient()

const CITIES = [
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
  { name: 'Marseille', lat: 43.2965, lng: 5.3698 },
  { name: 'Nice', lat: 43.7102, lng: 7.2620 },
  { name: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
  { name: 'Toulouse', lat: 43.6047, lng: 1.4442 },
  { name: 'Lille', lat: 50.6292, lng: 3.0573 },
  { name: 'Strasbourg', lat: 48.5734, lng: 7.7521 },
]

const PROPERTY_TYPES = [
  'Entire apartment',
  'Entire house',
  'Private room',
  'Shared room',
  'Entire villa',
  'Entire cabin',
]

const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Washing machine',
  'Dryer',
  'Air conditioning',
  'Heating',
  'TV',
  'Hair dryer',
  'Iron',
  'Pool',
  'Hot tub',
  'Free parking',
  'Gym',
  'Breakfast',
  'Workspace',
  'Fireplace',
  'Beachfront',
  'Mountain view',
  'City view',
  'Garden',
]

const UNSLASH_PHOTOS = [
  'photo-1566073771259-6a8506099945', // cozy interior
  'photo-1518780664697-55e3ad937233', // modern apartment
  'photo-1493663284031-b7e3aefcae8e', // living room
  'photo-1502672260266-1c1ef2d93688', // kitchen
  'photo-1484101403633-562f891dc89a', // bedroom
  'photo-1512917774080-9991f1c4c750', // exterior house
  'photo-1545324418-cc1a3fa10c00', // bathroom
  'photo-1560448204-e02f11c3d0e2', // pool
  'photo-1513584684374-8bab748fbf90', // balcony
  'photo-1542314831-068cd1dbfeeb', // dining area
  'photo-1558036117-15e82a2c9a9a', // workspace
  'photo-1560185127-6ed189bf02f4', // garden
  'photo-1560185007-cde436f7a4c0', // fireplace
  'photo-1560448205-4d9b3e6bb6db', // city view
  'photo-1560448205-97abe5c5c5c0', // mountain view
]

function getRandomPhotos(count: number): string[] {
  const shuffled = [...UNSLASH_PHOTOS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map(id => 
    `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`
  )
}

function getRandomAmenities(): string[] {
  const count = faker.number.int({ min: 5, max: 12 })
  const shuffled = [...AMENITIES].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomReviews(listingId: string, count: number) {
  return Array.from({ length: count }, () => ({
    listingId,
    authorName: faker.person.fullName(),
    authorAvatar: `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`,
    rating: faker.number.int({ min: 4, max: 5 }),
    comment: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
    date: faker.date.past({ years: 1 }),
  }))
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.host.deleteMany()

  // Create hosts
  const hosts = await Promise.all(
    Array.from({ length: 15 }, async () => {
      return prisma.host.create({
        data: {
          name: faker.person.fullName(),
          avatar: `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`,
          joinedYear: faker.number.int({ min: 2015, max: 2023 }),
          bio: faker.lorem.paragraph(),
          rating: faker.number.float({ min: 4.2, max: 5 }),
          reviewCount: faker.number.int({ min: 10, max: 200 }),
        },
      })
    })
  )

  // Create listings
  const listings = []
  for (let i = 0; i < 25; i++) {
    const city = faker.helpers.arrayElement(CITIES)
    const host = faker.helpers.arrayElement(hosts)
    const price = faker.number.int({ min: 50, max: 400 })
    const rating = faker.number.float({ min: 3.8, max: 5 })
    const reviewCount = faker.number.int({ min: 5, max: 150 })
    
    const listing = await prisma.listing.create({
      data: {
        title: faker.helpers.arrayElement([
          `Magnifique ${faker.helpers.arrayElement(['appartement', 'maison', 'loft', 'studio'])} au cœur de ${city.name}`,
          `${faker.helpers.arrayElement(['Charmant', 'Moderne', 'Spacieux', 'Lumineux'])} ${faker.helpers.arrayElement(['appartement', 'studio', 'duplex'])} avec vue`,
          `${faker.helpers.arrayElement(['Maison', 'Villa', 'Cabanon'])} ${faker.helpers.arrayElement(['traditionnelle', 'contemporaine', 'de caractère'])} proche du centre`,
          `Nouveau ${faker.helpers.arrayElement(['appartement', 'loft'])} entièrement rénové à ${city.name}`,
        ]),
        description: faker.lorem.paragraphs(faker.number.int({ min: 2, max: 4 })),
        price,
        location: `${faker.location.streetAddress()}, ${city.name}`,
        city: city.name,
        lat: city.lat + faker.number.float({ min: -0.05, max: 0.05 }),
        lng: city.lng + faker.number.float({ min: -0.05, max: 0.05 }),
        rating,
        reviewCount,
        maxGuests: faker.number.int({ min: 2, max: 8 }),
        bedrooms: faker.number.int({ min: 1, max: 4 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        type: faker.helpers.arrayElement(PROPERTY_TYPES),
        images: JSON.stringify(getRandomPhotos(faker.number.int({ min: 4, max: 8 }))),
        amenities: JSON.stringify(getRandomAmenities()),
        hostId: host.id,
      },
    })
    
    listings.push(listing)
    
    // Create reviews for this listing
    if (reviewCount > 0) {
      const reviews = getRandomReviews(listing.id, Math.min(reviewCount, 8))
      for (const review of reviews) {
        await prisma.review.create({ data: review })
      }
    }
    
    // Update host review count
    await prisma.host.update({
      where: { id: host.id },
      data: {
        reviewCount: { increment: reviewCount },
      },
    })
  }

  console.log(`✅ Created ${hosts.length} hosts`)
  console.log(`✅ Created ${listings.length} listings`)
  console.log(`✅ Created reviews for each listing`)
  
  // Sample data for verification
  const sampleListing = listings[0]
  console.log('\n📊 Sample listing:')
  console.log(`Title: ${sampleListing.title}`)
  console.log(`Price: €${sampleListing.price}/night`)
  console.log(`Location: ${sampleListing.location}`)
  console.log(`Rating: ${sampleListing.rating} ⭐ (${sampleListing.reviewCount} reviews)`)
  console.log(`Images: ${sampleListing.images.length} photos`)
  console.log(`Amenities: ${JSON.parse(sampleListing.amenities).slice(0, 5).join(', ')}...`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })