import React, { useState, useEffect } from "react";
import "../../css/Admin/A-Product-Edit.css";

const EditProductForm = ({ productData, onUpdate }) => {
  const [product, setProduct] = useState({
    id: null, // Thêm id vào state để tránh lỗi thiếu id
    name: "",
    price: 0,
    stock: 0,
    attributes: "{}",
    discount: 0,
    category: "",
    brand: "",
    image: ""
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    if (productData && Object.keys(productData).length > 0) {
      setProduct({
        id: productData.id ?? null, // Đảm bảo id không bị thiếu
        name: productData.name || "",
        price: productData.price ?? 0,
        stock: productData.stock ?? 0,
        attributes: productData.attributes ? JSON.stringify(productData.attributes, null, 2) : "{}",
        discount: productData.discount ?? 0,
        category: productData.category || "",
        brand: productData.brand || "",
        image: productData.image || ""
      });
    }
  }, [productData]);

  useEffect(() => {
    fetch("http://localhost/PHP/store/server/get_categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    fetch("http://localhost/PHP/store/server/get_brands.php")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));

    if (name === "attributes") {
      try {
        JSON.parse(value);
        setJsonError("");
      } catch (error) {
        setJsonError("Lỗi: JSON không hợp lệ!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.id) {
      alert("Lỗi: Thiếu ID sản phẩm!");
      return;
    }

    if (jsonError) {
      alert("Vui lòng nhập attributes dưới dạng JSON hợp lệ!");
      return;
    }

    const updatedProduct = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
      discount: parseFloat(product.discount),
      attributes: product.attributes ? JSON.parse(product.attributes) : {}
    };

    onUpdate(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
      <label>
        Name:
        <input type="text" name="name" value={product.name || ""} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price ?? 0} onChange={handleChange} required />
      </label>
      <label>
        Stock:
        <input type="number" name="stock" value={product.stock ?? 0} onChange={handleChange} required />
      </label>
      <label>
        Attributes (JSON format):
        <textarea name="attributes" value={product.attributes || "{}"} onChange={handleChange} />
      </label>
      {jsonError && <p style={{ color: "red" }}>{jsonError}</p>}
      <label>
        Discount:
        <input type="number" name="discount" value={product.discount ?? 0} onChange={handleChange} />
      </label>
      <label>
        Category:
        <select name="category" value={product.category || ""} onChange={handleChange} required>
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Brand:
        <select name="brand" value={product.brand || ""} onChange={handleChange} required>
          <option value="">Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Image URL:
        <input type="text" name="image" value={product.image || ""} onChange={handleChange} required />
      </label>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProductForm;
