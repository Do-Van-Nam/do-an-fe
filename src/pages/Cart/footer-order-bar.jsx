// src/components/FooterOrderBar.jsx

import React from 'react';

const FooterOrderBar = ({ selectedCount, totalPrice, isDisabled }) => {
  const handlePlaceOrder = () => {
    if (!isDisabled) {
      console.log(`Đặt hàng thành công: ${selectedCount} sản phẩm, tổng tiền: $${totalPrice.toFixed(2)}`);
      // Thêm logic đặt hàng thực tế ở đây (gọi API, v.v.)
      // Ví dụ: placeOrderAPI(selectedCount, totalPrice);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Thông tin số lượng và tổng tiền */}
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Đã chọn <strong>{selectedCount}</strong> sản phẩm
          </p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Nút đặt hàng */}
        <button
          onClick={handlePlaceOrder}
          disabled={isDisabled}
          className={`px-8 py-3 rounded-md font-semibold text-lg transition-all duration-200 transform ${
            isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg'
          }`}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

// PropTypes (tùy chọn, nếu bạn không dùng TypeScript)
FooterOrderBar.defaultProps = {
  selectedCount: 0,
  totalPrice: 0,
  isDisabled: true,
};

export default FooterOrderBar;