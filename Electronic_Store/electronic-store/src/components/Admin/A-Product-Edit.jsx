import React, { useState, useEffect } from "react";
import "../../css/Admin/A-Product-Edit.css";

const EditProductForm = ({ productData, onUpdate }) => {
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

  useEffect(() => {
    if (productData) {
      setProduct({
        ...productData,
        attributes: JSON.stringify(productData.attributes, null, 2)
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <textarea name="attributes" value={product.attributes} onChange={handleChange} />
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
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProductForm;
