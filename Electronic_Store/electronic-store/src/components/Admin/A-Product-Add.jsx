import React, { useState } from "react";
import "../../css/Admin/A-Product-Add.css";

const AddProductForm = ({ onAdd, onBack  }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    attributes: "",
    discount: "",
    category: "",
    brand: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
      discount: parseFloat(product.discount),
      attributes: product.attributes ? JSON.parse(product.attributes) : {}
    };
  
    try {
      const response = await fetch("http://localhost/PHP/store/server/add_product.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct)
      });
  
      const data = await response.json();
      if (data.status === "success") {
        alert("Thêm sản phẩm thành công!");
        if (typeof onAdd === "function") {
          onAdd(formattedProduct);
        } else {
          console.warn("onAdd không được truyền hoặc không phải là hàm!");
        }
      } else {
        alert("Lỗi: " + data.message);
      }
      
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Lỗi kết nối đến server!");
    }
  
    setProduct({
      name: "",
      price: "",
      stock: "",
      attributes: "",
      discount: "",
      category: "",
      brand: "",
      image: ""
    });
  };
  

  return (
    
    <form onSubmit={handleSubmit} className="add-product-form">
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </label>
      <label>
        Stock:
        <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
      </label>
      <label>
        Attributes (JSON format):
        <textarea name="attributes" value={product.attributes} onChange={handleChange} placeholder='{"size": "M", "color": "red"}' />
      </label>
      <label>
        Discount:
        <input type="number" name="discount" value={product.discount} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={product.category} onChange={handleChange} required />
      </label>
      <label>
        Brand:
        <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
      </label>
      <label>
        Image URL:
        <input type="text" name="image" value={product.image} onChange={handleChange} required />
      </label>
      <button type="submit">Add Product</button>
      
      
    </form>
  );
};

export default AddProductForm;
