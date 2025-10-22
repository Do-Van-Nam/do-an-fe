"use client"

import { useState } from "react"
import { Star, ShoppingCart, Home } from "lucide-react"
import ProductImages from "./product-images"
import ShopInfo from "./shop-info"
import ReviewsSection from "./reviews-section"
import SimilarProducts from "./similar-products"

// Mock data
const mockProduct = {
  id: 1,
  name: "Premium Vintage Leather Sofa",
  category: "Furniture",
  status: "both", // 'for-sale', 'for-rent', 'both'
  price: 1200,
  rentPrice: 150,
  images: [
    "/premium-vintage-leather-sofa.jpg",
    "/leather-sofa-detail-1.jpg",
    "/leather-sofa-detail-2.jpg",
    "/leather-sofa-detail-3.jpg",
  ],
  thumbnails: [
    "/leather-sofa-thumb-1.jpg",
    "/leather-sofa-thumb-2.jpg",
    "/leather-sofa-thumb-3.jpg",
    "/leather-sofa-thumb-4.jpg",
  ],
  description:
    "Beautiful vintage leather sofa in excellent condition. Perfect for living rooms or offices. Features genuine Italian leather with a rich brown patina. Comfortable seating for 3-4 people.",
  specifications: [
    { label: "Material", value: "Genuine Italian Leather" },
    { label: "Dimensions", value: '84" W x 36" D x 32" H' },
    { label: "Color", value: "Rich Brown" },
    { label: "Condition", value: "Excellent" },
    { label: "Year", value: "1980s" },
  ],
  rating: 4.5,
  reviewCount: 24,
  tags: ["furniture", "vintage", "leather", "sofa"],
}

const mockShop = {
  id: 1,
  name: "Vintage & Co.",
  logo: "/vintage-shop-logo.jpg",
  rating: 4.8,
  reviewCount: 156,
  phone: "+1 (555) 123-4567",
  email: "contact@vintageandco.com",
  address: "123 Antique Street, Portland, OR 97201",
  description:
    "We specialize in curated vintage furniture and home decor. Every piece is carefully selected and restored to ensure quality and authenticity.",
}

const mockReviews = [
  {
    id: 1,
    username: "Sarah M.",
    rating: 5,
    date: "2024-10-15",
    comment: "Absolutely beautiful sofa! Arrived in perfect condition. Highly recommend!",
  },
  {
    id: 2,
    username: "John D.",
    rating: 4,
    date: "2024-10-10",
    comment: "Great quality, exactly as described. Shipping was fast.",
  },
  {
    id: 3,
    username: "Emma L.",
    rating: 5,
    date: "2024-10-05",
    comment: "The leather is so soft and the color is perfect for my living room!",
  },
]

const mockSimilarProducts = [
  {
    id: 2,
    name: "Mid-Century Modern Chair",
    price: 450,
    rentPrice: 60,
    image: "/mid-century-modern-chair.jpg",
    rating: 4.7,
    reviewCount: 18,
    status: "both",
  },
  {
    id: 3,
    name: "Vintage Wooden Coffee Table",
    price: 350,
    rentPrice: 45,
    image: "/vintage-wooden-coffee-table.png",
    rating: 4.6,
    reviewCount: 12,
    status: "for-sale",
  },
  {
    id: 4,
    name: "Antique Brass Floor Lamp",
    price: 280,
    rentPrice: 35,
    image: "/antique-brass-floor-lamp.jpg",
    rating: 4.8,
    reviewCount: 22,
    status: "both",
  },
]

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)

  const handleBuyNow = () => {
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handleRent = () => {
    alert(`Rental request submitted for ${quantity} item(s)!`)
  }

  const handleContactSeller = () => {
    alert("Opening contact form...")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Product Marketplace</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-2">
            <ProductImages
              images={mockProduct.images}
              thumbnails={mockProduct.thumbnails}
              productName={mockProduct.name}
            />
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-pink-200 px-3 py-1 text-sm font-medium text-primary-foreground">
                  {mockProduct.category}
                </span>
                <span className="inline-block rounded-full bg-pink-200 px-3 py-1 text-sm font-medium text-accent-foreground">
                  {mockProduct.status === "both"
                    ? "For Sale & Rent"
                    : mockProduct.status === "for-sale"
                      ? "For Sale"
                      : "For Rent"}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{mockProduct.name}</h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 rounded-lg border border-border bg-card p-4">
              {(mockProduct.status === "for-sale" || mockProduct.status === "both") && (
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Price</p>
                  <p className="text-2xl font-bold text-foreground">${mockProduct.price.toLocaleString()}</p>
                </div>
              )}
              {(mockProduct.status === "for-rent" || mockProduct.status === "both") && (
                <div>
                  <p className="text-sm text-muted-foreground">Rental Price</p>
                  <p className="text-xl font-semibold text-foreground">${mockProduct.rentPrice}/month</p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded border border-border px-3 py-2 hover:bg-muted"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 rounded border border-border px-3 py-2 text-center"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded border border-border px-3 py-2 hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {(mockProduct.status === "for-sale" || mockProduct.status === "both") && (
                <button
                  onClick={handleBuyNow}
                  style={{ backgroundColor: '#ff44cb'}}
                  className="w-full rounded-lg  px-4 py-3 font-semibold text-primary-foreground hover:opacity-90"
                >
                  <ShoppingCart className="mr-2 inline h-5 w-5" />
                  Buy Now
                </button>
              )}
              {(mockProduct.status === "for-rent" || mockProduct.status === "both") && (
                <button
                  onClick={handleRent}
                  className="w-full rounded-lg border-2 border-pink-300 px-4 py-3 font-semibold  hover:bg-primary hover:text-primary-foreground"
                >
                  Rent
                </button>
              )}
              <button
                onClick={handleContactSeller}
                className="w-full rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted"
              >
                Contact Seller
              </button>
            </div>

            {/* Specifications */}
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground">Specifications</h3>
              <div className="space-y-2">
                {mockProduct.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Description</h2>
          <p className="text-foreground">{mockProduct.description}</p>
        </div>

        {/* Shop Info */}
        <ShopInfo shop={mockShop} />

        {/* Reviews Section */}
        <ReviewsSection reviews={mockReviews} product={mockProduct} />

        {/* Similar Products */}
        <SimilarProducts products={mockSimilarProducts} />
      </div>
    </main>
  )
}
