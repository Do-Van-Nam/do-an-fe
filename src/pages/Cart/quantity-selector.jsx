import React from "react";
import { Plus, Minus } from "lucide-react";

/**
 * QuantitySelector component
 * @param {number} quantity - Số lượng hiện tại
 * @param {function} onQuantityChange - Callback khi thay đổi số lượng
 */
const QuantitySelector = ({ quantity = 1, onQuantityChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(value);
    } else if (e.target.value === "" || e.target.value === "0") {
      // Nếu người dùng xóa hết hoặc nhập 0 → tạm thời để 1
      onQuantityChange(1);
    }
  };

  const handleBlur = (e) => {
    // Khi rời khỏi input, nếu giá trị < 1 thì tự động set về 1
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      onQuantityChange(1);
    }
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-md bg-white p-1 select-none">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        aria-label="Giảm số lượng"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min="1"
        className="w-16 text-center bg-transparent border-0 text-gray-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Số lượng"
      />

      <button
        type="button"
        onClick={handleIncrease}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        aria-label="Tăng số lượng"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;