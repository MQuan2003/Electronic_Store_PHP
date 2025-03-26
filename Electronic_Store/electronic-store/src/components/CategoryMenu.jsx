import React, { useState, useEffect } from "react";
import styles from "../css/CategoryMenu.module.css";

const CategoryMenu = ({ products = [] }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Gọi API lấy danh mục khi component mount
  useEffect(() => {
    fetch("http://localhost/PHP/store/server/get_categories.php") // Đảm bảo đúng đường dẫn API
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Lỗi dữ liệu danh mục:", data);
        }
      })
      .catch((err) => console.error("Lỗi lấy danh mục:", err));
  }, []);

  // Lọc sản phẩm theo danh mục
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_name === selectedCategory)
    : products;

  return (
    <div className={styles.categoryMenu}>
      {/* Sidebar danh mục */}
      <div className={styles.sidebar}>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id} // Dùng id thay vì index
              className={`${styles.sidebarItem} ${
                selectedCategory === category.name ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <i className={category.icon_class}></i> {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Nội dung sản phẩm */}
      <div className={styles.content}>
        <h3>{selectedCategory || "All Products"}</h3>
        <p className={styles.accessories}>Accessories</p>

        <div className={styles.products}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={styles.productImage}
                />
                <p>{product.name}</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <p className={styles.viewAll} onClick={() => setSelectedCategory(null)}>
          View all
        </p>
      </div>
    </div>
  );
};

export default CategoryMenu;
