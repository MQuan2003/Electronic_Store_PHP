import React, { useState } from "react";
import Sidebar from "../components/Admin/AdminSideBar";
import ProductTable from "../components/Admin/A-Product";
import AddProductForm from "../components/Admin/A-Product-Add";
import EditProductForm from "../components/Admin/A-Product-Edit";
import ManageUsers from "../components/Admin/A-User";

const Admin = () => {
  const [view, setView] = useState("Products"); // Default view
  const [editProduct, setEditProduct] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [refresh, setRefresh] = useState(false); // ✅ Thêm trạng thái để refresh danh sách sản phẩm
  const [previousView, setPreviousView] = useState("Products"); // ✅ Lưu lại trang trước

  // Handlers for Products
  const handleAddProduct = () => {
    setPreviousView(view); // ✅ Lưu lại trang hiện tại
    setView("AddProduct");
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setPreviousView(view); // ✅ Lưu lại trang hiện tại
    setView("EditProduct");
  };

  const handleUpdateProduct = (updatedProduct) => {
    fetch("http://localhost/PHP/store/server/update_product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Cập nhật sản phẩm thành công!");
          setRefresh((prev) => !prev); // ✅ Kích hoạt refresh danh sách
          handleBack();
        } else {
          alert("Lỗi: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Không thể cập nhật sản phẩm!");
      });
  };

  // Handlers for Users
  const handleAddUser = () => {
    setPreviousView(view);
    setView("AddUser");
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setPreviousView(view);
    setView("EditUser");
  };

  // ✅ Quay lại trang trước đó
  const handleBack = () => setView(previousView);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={(selectedView) => setView(selectedView)} />
      <div style={{ flex: 1, padding: "20px" }}>
        {view === "Products" && <ProductTable onAdd={handleAddProduct} onEdit={handleEditProduct} refresh={refresh} />}
        {view === "AddProduct" && <AddProductForm onAdd={handleBack} onBack={handleBack} />}
        {view === "EditProduct" && (
          <EditProductForm productData={editProduct} onUpdate={handleUpdateProduct} onBack={handleBack} />
        )}
        {view === "Users" && <ManageUsers onAdd={handleAddUser} onEdit={handleEditUser} />}
      </div>
    </div>
  );
};

export default Admin;
