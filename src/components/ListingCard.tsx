'use client'

import { Star, Heart } from 'lucide-react'
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
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/listings/${id}`} className="block group">
      <div className="flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 card-shadow-hover">
          <Image
            src={images[currentImageIndex] || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white z-10"
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-900'}
            />
          </button>
          
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
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white z-10"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold">‹</div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImageIndex((prev) => 
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white z-10"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold">›</div>
              </button>
            </>
          )}
          
          {/* Image Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg">
              {title}
            </h3>
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-current text-gray-900" />
              <span className="font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            <span>{city}</span>
          </div>

          <div className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900 text-lg">€{price}</span> nuit
          </div>

          {reviewCount > 0 && (
            <div className="text-gray-600 text-sm">
              {reviewCount} {reviewCount === 1 ? 'avis' : 'avis'}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}