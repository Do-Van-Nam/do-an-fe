"use client"

import { useState } from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ProductImages({ images, thumbnails, productName }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
        <LazyLoadImage
          src={images[selectedImage] || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {thumbnails.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
              selectedImage === idx ? "border-primary" : "border-border hover:border-muted-foreground"
            }`}
          >
            <LazyLoadImage
              src={thumb || "/placeholder.svg"}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
