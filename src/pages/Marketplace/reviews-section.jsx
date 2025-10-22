"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export default function ReviewsSection({ reviews, product }) {
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" })
  const [submittedReviews, setSubmittedReviews] = useState(reviews)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (newReview.name && newReview.comment) {
      const review = {
        id: submittedReviews.length + 1,
        username: newReview.name,
        rating: newReview.rating,
        date: new Date().toISOString().split("T")[0],
        comment: newReview.comment,
      }
      setSubmittedReviews([review, ...submittedReviews])
      setNewReview({ name: "", rating: 5, comment: "" })
      alert("Review submitted successfully!")
    }
  }

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Reviews & Comments</h2>

      {/* Average Rating */}
      <div className="mb-8 rounded-lg bg-muted p-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p className="text-3xl font-bold text-foreground">{product.rating}</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">({product.reviewCount} reviews)</p>
        </div>
      </div>

      {/* Submit Review Form */}
      <div className="mb-8 rounded-lg border border-border bg-background p-6">
        <h3 className="mb-4 font-semibold text-foreground">Leave a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Your Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Rating</label>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground"
              placeholder="Share your thoughts about this product..."
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-300 px-4 py-2 font-semibold text-primary-foreground hover:opacity-90"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Customer Reviews</h3>
        {submittedReviews.map((review) => (
          <div key={review.id} className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{review.username}</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
