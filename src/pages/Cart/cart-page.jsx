import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import CartItem from "./cart-item";          // Điều chỉnh đường dẫn theo cấu trúc của bạn
import FooterOrderBar from "./footer-order-bar"; // Điều chỉnh đường dẫn
import { Loader2 } from "lucide-react";
import { AppContext } from '../../AppContext'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { acc } = useContext(AppContext);
  const accId = acc._id
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Lấy danh sách sản phẩm trong giỏ hàng
        const cartResponse = await axios.get(`/cart/${acc._id}`);
        const cartData = cartResponse.data; // { vendors: [{ vendorId, quantity }] }

        // 2. Lấy chi tiết từng vendor
        const itemsWithDetails = await Promise.all(
          cartData.vendors.map(async (vendor) => {
            try {
              const vendorResponse = await axios.get(
                `/vendorItem/${vendor.vendorId}`
              );
              return {
                vendorId: vendor.vendorId,
                quantity: vendor.quantity,
                vendorDetail: vendorResponse.data, // { name, image, price }
                selected: false,
              };
            } catch (err) {
              console.error(`Lỗi khi lấy vendor ${vendor.vendorId}:`, err);
              return null;
            }
          })
        );

        // Loại bỏ các item bị lỗi
        setCartItems(itemsWithDetails.filter((item) => item !== null));
      } catch (err) {
        console.error("Lỗi tải giỏ hàng:", err);
        setError("Không tải được giỏ hàng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [accId]);

  const handleQuantityChange = async (vendorId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.post(`/cart/update`, {
        accId,
        vendorId,
        quantity: newQuantity,
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.vendorId === vendorId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Cập nhật số lượng thất bại:", err);
      setError("Không thể cập nhật số lượng.");
    }
  };

  const handleRemoveItem = async (vendorId) => {
    try {
      await axios.post(`/cart/remove`, {
        accId,
        vendorId,
      });

      setCartItems((prev) => prev.filter((item) => item.vendorId !== vendorId));
    } catch (err) {
      console.error("Xóa sản phẩm thất bại:", err);
      setError("Không thể xóa sản phẩm.");
    }
  };

  const handleSelectItem = (vendorId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.vendorId === vendorId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = (selectAll) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: selectAll })));
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.vendorDetail.price,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Giỏ hàng</h1>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <>
            {/* Select all */}
            <div className="mb-4 flex items-center gap-4">
              <input
                type="checkbox"
                checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-5 h-5 cursor-pointer rounded border-gray-300"
              />
              <span className="text-sm text-muted-foreground">
                Chọn tất cả ({selectedItems.length}/{cartItems.length})
              </span>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItem
                  key={item.vendorId}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onSelect={handleSelectItem}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer thanh toán cố định */}
      {cartItems.length > 0 && (
        <FooterOrderBar
          selectedCount={selectedItems.length}
          totalPrice={totalPrice}
          isDisabled={selectedItems.length === 0}
        />
      )}
    </div>
  );
};

export default CartPage;