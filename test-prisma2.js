import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

console.log('Testing Prisma...')

// Try with explicit config
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function test() {
  try {
    console.log('Connected to DB')
    
    // Try to create a test listing
    const listing = await prisma.listing.create({
      data: {
        title: 'Test Listing',
        description: 'Test',
        price: 100,
        location: 'Test',
        city: 'Paris',
        country: 'France',
        lat: 48.8566,
        lng: 2.3522,
        images: JSON.stringify(['https://test.com/image.jpg']),
        amenities: JSON.stringify(['WiFi']),
        hostId: 'test-host-id',
      },
    })
    console.log('Created listing:', listing.id)
    
    const count = await prisma.listing.count()
    console.log('Total listings:', count)
    
  } catch (error) {
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

test()
