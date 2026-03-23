'use client'

import { Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ListingCardProps {
  id: string
  title: string
  city: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
}

export default function ListingCard({
  id,
  title,
  city,
  price,
  rating,
  reviewCount,
  images
}: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <Link href={`/listings/${id}`} className="block group">
      <div className="flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
          <Image
            src={images[currentImageIndex] || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImageIndex((prev) => 
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
              >
                <div className="w-6 h-6 flex items-center justify-center">‹</div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImageIndex((prev) => 
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white"
              >
                <div className="w-6 h-6 flex items-center justify-center">›</div>
              </button>
            </>
          )}
          
          {/* Image Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-current text-gray-900" />
              <span className="text-sm font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} />
            <span>{city}</span>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">€{price}</span> nuit
          </div>

          {reviewCount > 0 && (
            <div className="text-sm text-gray-600">
              {reviewCount} {reviewCount === 1 ? 'avis' : 'avis'}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}