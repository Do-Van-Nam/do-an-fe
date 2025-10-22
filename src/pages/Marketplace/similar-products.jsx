import { Star } from "lucide-react"
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function SimilarProducts({ products }) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Similar Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <LazyLoadImage src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{product.name}</h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
              </div>

              {/* Pricing */}
              <div className="mt-3 space-y-1">
                {(product.status === "for-sale" || product.status === "both") && (
                  <p className="text-sm font-semibold text-foreground">${product.price.toLocaleString()}</p>
                )}
                {(product.status === "for-rent" || product.status === "both") && (
                  <p className="text-xs text-muted-foreground">Rent: ${product.rentPrice}/month</p>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span className="inline-block rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                  {product.status === "both" ? "Sale & Rent" : product.status === "for-sale" ? "For Sale" : "For Rent"}
                </span>
              </div>

              {/* View Button */}
              <button className="mt-4 w-full rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
