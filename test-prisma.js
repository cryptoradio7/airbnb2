import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

console.log('DATABASE_URL:', process.env.DATABASE_URL)

try {
  const prisma = new PrismaClient()
  console.log('PrismaClient created successfully')
  
  const count = await prisma.listing.count()
  console.log('Listings count:', count)
  
  await prisma.$disconnect()
} catch (error) {
  console.error('Error:', error.message)
}
