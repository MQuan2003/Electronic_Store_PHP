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

  // Handlers for Products
  const handleAddProduct = () => setView("AddProduct");
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setView("EditProduct");
  };

  // Handlers for Users
  const handleAddUser = () => setView("AddUser");
  const handleEditUser = (user) => {
    setEditUser(user);
    setView("EditUser");
  };

  // Back to product or user list
  const handleBack = () => setView(view.includes("Product") ? "Products" : "Users");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={(selectedView) => setView(selectedView)} /> {/* Dynamic switching */}
      <div style={{ flex: 1, padding: "20px" }}>
        {view === "Products" && <ProductTable onAdd={handleAddProduct} onEdit={handleEditProduct} />}
        {view === "AddProduct" && <AddProductForm onBack={handleBack} />}
        {view === "EditProduct" && <EditProductForm productData={editProduct} onBack={handleBack} />}
        
        {view === "Users" && <ManageUsers onAdd={handleAddUser} onEdit={handleEditUser} />}
        {/* Future AddUser and EditUser components can be added here */}
      </div>
    </div>
  );
};

export default Admin;
