import React from "react";
import { Trash2 } from "lucide-react";
import QuantitySelector from "./quantity-selector";

// Nếu bạn muốn kiểm tra kiểu props (tương tự interface), dùng PropTypes
import PropTypes from "prop-types";

// Component CartItem
function CartItem({ item, onQuantityChange, onRemove, onSelect }) {
  const totalPrice = item.quantity * item.vendorDetail.price;

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 flex gap-4 hover:shadow-md transition-shadow">
      {/* Checkbox chọn sản phẩm */}
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onSelect(item.vendorId)}
        className="w-5 h-5 cursor-pointer mt-1 flex-shrink-0 rounded border-gray-300"
      />

      {/* Hình ảnh nhà cung cấp */}
      <div className="flex-shrink-0">
        <img
          src={item.vendorDetail.image || "/placeholder.svg"}
          alt={item.vendorDetail.name}
          className="w-20 h-20 object-cover rounded-md bg-muted"
        />
      </div>

      {/* Thông tin nhà cung cấp */}
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground mb-1">
          {item.vendorDetail.name}
        </h3>
        <p className="text-primary font-semibold">
          ${item.vendorDetail.price.toFixed(2)}
        </p>
      </div>

      {/* Chọn số lượng */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item.vendorId, newQuantity)
          }
        />
      </div>

      {/* Tổng tiền */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center">
        <p className="text-sm text-muted-foreground">Tổng</p>
        <p className="font-semibold text-foreground">
          ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Nút xóa */}
      <button
        onClick={() => onRemove(item.vendorId)}
        className="flex-shrink-0 p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        aria-label="Xóa sản phẩm khỏi giỏ hàng"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

// PropTypes (tùy chọn - giúp bắt lỗi khi truyền props sai)
CartItem.propTypes = {
  item: PropTypes.shape({
    vendorId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    vendorDetail: PropTypes.shape({
      vendorId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      price: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CartItem;