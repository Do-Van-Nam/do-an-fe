import api from '../api'

// ==================
// GET
// ==================

// Lấy 1 sản phẩm theo ID
export const getVendorItemById = (id) => {
  return api.get(`/vendoritem/id/${id}`)
}

// Lấy danh sách sản phẩm của người bán (theo accId) – cần login
export const getVendorItemsByAccId = (accId) => {
  return api.get(`/vendoritem/accId/${accId}`, {
    withCredentials: true,
  })
}

// ✅ ALIAS cho SellerDashboard (để khỏi sửa file kia)
export const getMyProducts = (accId) => {
  return getVendorItemsByAccId(accId)
}

// Lấy sản phẩm theo type
export const getVendorItemsByType = (type) => {
  return api.get(`/vendoritem/type/${type}`)
}

// Group sản phẩm theo type (theo plan)
export const getVendorItemsGroupedByType = (accId) => {
  return api.get(`/vendoritem/getVendorItemGroupedByType/accId/${accId}`)
}

// ==================
// POST
// ==================

// Thêm 1 sản phẩm
export const createVendorItem = (data) => {
  return api.post('/vendoritem', data, {
    withCredentials: true,
  })
}

// Thêm nhiều sản phẩm
export const createManyVendorItems = (data) => {
  return api.post('/vendoritem/addManyVendorItems', data, {
    withCredentials: true,
  })
}

// ==================
// PUT
// ==================

// Cập nhật 1 sản phẩm
export const updateVendorItem = (id, data) => {
  return api.put(`/vendoritem/id/${id}`, data, {
    withCredentials: true,
  })
}

// Update field cho toàn bộ sản phẩm
export const updateAllVendorItems = (data) => {
  return api.put('/vendoritem/updateAll', data)
}

// ==================
// DELETE
// ==================

// Xóa sản phẩm theo ID
export const deleteVendorItemById = (id) => {
  return api.delete(`/vendoritem/${id}`, {
    withCredentials: true,
  })
}

// ✅ ALIAS cho SellerDashboard
export const deleteProduct = (id) => {
  return deleteVendorItemById(id)
}

// Xóa sản phẩm theo type
export const deleteVendorItemByType = (type) => {
  return api.delete(`/vendoritem/type/${type}`)
}
