import React, { useState, useEffect } from "react";
import api from "../../api";

// Object type của bạn
const types = {
  // Group 1
  "venue": "Địa Điểm Tổ Chức",
  "bridal-gown": "Áo Cưới",
  "catering": "Tiệc Cưới",
  "flowers": "Hoa Cưới",
  "makeup-services": "Dịch Vụ Trang Điểm",
  "a-line-dress": "Váy chữ A",
  "photographer": "Nhiếp Ảnh Gia",
  "wedding-planner": "Nhà Tổ Chức Đám Cưới",
  "wedding-cake": "Bánh Cưới",
  "dj": "DJ",
  "videographer": "Quay Phim",

  // Group 2
  "rental-bridal": "Cho Thuê Đồ Cưới",
  "band": "Ban Nhạc",
  "bar-service": "Dịch Vụ Quay Bar",
  "transportation": "Rước Dâu",
  "invitations": "Thiệp cưới",

  // Bridal-gown nested
  "ball-gown": "Váy dạ hội",
  "mermaid-dress": "Váy nàng tiên cá",
  "bodycon-dress": "Váy body",
  "short-dress": "Váy ngắn",

  // Suit & bridesmaid
  "suit-and-tuxedo": "Bộ vest và áo tuxedo",
  "bridesmaid-dress": "Váy phù dâu",

  // Rings
  "wedding-ring": "Nhẫn cưới",
  "princess-cut-ring": "Nhẫn cắt kiểu công chúa",
  "asscher-cut-ring": "Nhẫn cắt kiểu Asscher",
  "cushion-cut-ring": "Nhẫn cắt kiểu đệm",
  "emerald-cut-ring": "Nhẫn cắt kiểu ngọc lục bảo",
  "pear-cut-ring": "Nhẫn cắt kiểu hình quả lê",
  "radiant-cut-ring": "Nhẫn cắt kiểu rực rỡ",
  "round-cut-ring": "Nhẫn cắt kiểu tròn",
  "oval-cut-ring": "Nhẫn cắt kiểu hình bầu dục",
};

// Nhóm để hiển thị đẹp hơn trong dropdown
const typeGroups = {
  "Dịch vụ cưới chính": ["venue", "bridal-gown", "catering", "flowers", "makeup-services", "a-line-dress", "photographer", "wedding-planner", "wedding-cake", "dj", "videographer"],
  "Dịch vụ bổ sung": ["rental-bridal", "band", "bar-service", "transportation", "invitations"],
  "Kiểu váy cưới": ["ball-gown", "mermaid-dress", "bodycon-dress", "short-dress"],
  "Trang phục khác": ["suit-and-tuxedo", "bridesmaid-dress"],
  "Nhẫn cưới": ["wedding-ring", "princess-cut-ring", "asscher-cut-ring", "cushion-cut-ring", "emerald-cut-ring", "pear-cut-ring", "radiant-cut-ring", "round-cut-ring", "oval-cut-ring"],
};

function ManageVendorItem() {
  const [selectedType, setSelectedType] = useState("venue"); // mặc định
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy dữ liệu khi thay đổi type
  useEffect(() => {
    if (!selectedType) return;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/vendorItem/type/${selectedType}`);
        setItems(response.data.vendoritem || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedType]);

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    try {
      await api.delete(`/vendorItem/${id}`);
      alert("Xóa sản phẩm thành công!");
      // Reload lại danh sách theo type hiện tại
      const response = await api.get(`/vendorItem/type/${selectedType}`);
      setItems(response.data.vendoritem || []);
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Quản Lý Sản Phẩm Theo Loại</h1>

      {/* Dropdown chọn loại */}
      <div className="mb-8 max-w-md mx-auto">
        <label className="block text-lg font-medium mb-2">Chọn loại sản phẩm:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(typeGroups).map(([groupName, typeKeys]) => (
            <optgroup key={groupName} label={groupName}>
              {typeKeys.map((key) => (
                <option key={key} value={key}>
                  {types[key]}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Trạng thái loading / lỗi */}
      {loading && <p className="text-center text-blue-600">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Bảng sản phẩm */}
      {!loading && !error && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Hình ảnh</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tên sản phẩm</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Loại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Giá bán</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Giá thuê</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Đánh giá</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    Không có sản phẩm nào trong loại này.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imgLink || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{types[item.type] || item.type}</td>
                    <td className="px-6 py-4">
                      {item.priceSell?.toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="px-6 py-4">
                      {item.priceRent
                        ? `${item.priceRent.toLocaleString("vi-VN")} ₫ / ${item.periodRent || "ngày"}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      ⭐ {item.rate?.toFixed(1) || "Chưa có"} ({item.noReview || 0} đánh giá)
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageVendorItem;