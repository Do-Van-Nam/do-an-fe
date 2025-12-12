import { Star } from "lucide-react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VendorItem from "../../components/VendorItem"

export default function SimilarProducts({ items }) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Sản Phẩm Tương Tự</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <VendorItem key={item.id} props={item}/>
        ))}
      </div>
    </div>
  )
}
