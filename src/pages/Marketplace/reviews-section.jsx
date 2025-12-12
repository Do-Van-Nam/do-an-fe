"use client"

import { useState ,useContext, useEffect} from "react"
import { Star } from "lucide-react"
import api from "../../api"
import { AppContext } from "../../AppContext"


export default function ReviewsSection({ reviews, product }) {
  console.log("reviews nhan vao:",reviews)
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" })
  const [submittedReviews, setSubmittedReviews] = useState(reviews)
  const { acc } = useContext(AppContext)
  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      await api.post('/review', {
        vendorItemId: product._id,
        accId: acc._id,
        review: newReview.comment,
        rate: newReview.rating,
      })

      alert("Đánh giá thành công!")
      setNewReview({ name: "", rating: 5, comment: "" })
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Đánh Giá & Bình Luận</h2>

      {/* Average Rating */}
      <div className="mb-8 rounded-lg bg-muted p-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Đánh Giá Trung Bình</p>
            <p className="text-3xl font-bold text-foreground">{product.rating}</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(product.rate) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">({product.noReview} đánh giá)</p>
        </div>
      </div>

      {/* Submit Review Form */}
      <div className="mb-8 rounded-lg border border-border bg-background p-6">
        <h3 className="mb-4 font-semibold text-foreground">Để lại đánh giá</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Tên bạn</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground"
              placeholder="Nhập tên bạn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Đánh Giá</label>
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
            <label className="block text-sm font-medium text-foreground">Bình Luận</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground"
              placeholder="Chia sẻ suy nghĩ của bạn về sản phẩm này..."
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-300 px-4 py-2 font-semibold text-primary-foreground hover:opacity-90"
          >
            Gửi Đánh Giá
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Đánh Giá & Bình Luận Của Khách Hàng</h3>
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
                          i < review.rate ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-foreground">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
