import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";

function ManagerUser() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("user"); // "user" hoặc "seller"

  // Lấy danh sách tài khoản khi component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/acc/getAllAcc`);
      const accs = response.data.accs || [];
      setAccounts(accs);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách tài khoản:", err);
      setError("Không thể tải danh sách tài khoản. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xóa tài khoản
  const handleDelete = async (accId) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản này không?")) {
      return;
    }

    try {
      await api.delete(`/acc/${accId}`);
      alert("Xóa tài khoản thành công!");
      // Reload lại danh sách
      fetchAccounts();
    } catch (err) {
      console.error("Lỗi khi xóa tài khoản:", err);
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  // Lọc theo tab
  const filteredAccounts = accounts.filter((acc) => {
    if (activeTab === "user") return acc.role !== "seller";
    if (activeTab === "seller") return acc.role === "seller";
    return true;
  });

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchAccounts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Quản Lý Tài Khoản</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6 border-b">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-8 py-3 font-medium border-b-4 transition-colors ${
            activeTab === "user"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Người dùng (User)
        </button>
        <button
          onClick={() => setActiveTab("seller")}
          className={`px-8 py-3 font-medium border-b-4 transition-colors ${
            activeTab === "seller"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Người bán (Seller)
        </button>
      </div>

      {/* Bảng tài khoản */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vai trò</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thông tin thêm</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Không có tài khoản nào trong danh mục này.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((acc) => (
                <tr key={acc._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{acc._id.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm font-medium">{acc.phone}</td>
                  <td className="px-6 py-4 text-sm">{acc.name || "(Chưa đặt tên)"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        acc.role === "seller"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {acc.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {acc.role === "seller" ? (
                      <>
                        {acc.shopName && <div><strong>Shop:</strong> {acc.shopName}</div>}
                        {acc.email && <div><strong>Email:</strong> {acc.email}</div>}
                        {acc.address && <div><strong>Địa chỉ:</strong> {acc.address}</div>}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(acc._id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
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
    </div>
  );
}

export default ManagerUser;