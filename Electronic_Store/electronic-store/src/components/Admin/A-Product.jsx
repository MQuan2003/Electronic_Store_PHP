import React, { useState, useEffect } from "react";
import styles from "../../css/Admin/A-Product.module.css";

const ProductTable = ({ onAdd, onEdit }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/PHP/store/server/get_admin_products.php") 
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "no_data") {
          setProducts([]);
        } else {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm!");
      });
  }, []);

  // Hàm xử lý xóa sản phẩm
  const handleDeleteProduct = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      return;
    }

    fetch("http://localhost/PHP/store/server/delete_product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Xóa sản phẩm thành công!");
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } else {
          alert("Lỗi: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi xóa sản phẩm:", err);
        alert("Không thể xóa sản phẩm!");
      });
  };

  return (
    <div className={styles.productTable}>
      <div className={styles.tableHeader}>
        <h2>Danh sách sản phẩm</h2>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Sale count</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category_name || "Empty"}</td>
                <td>{product.stock > 0 ? `${product.stock}` : "0"}</td>
                <td>{product.sales_count > 0 ? `${product.sales_count}` : "0"}</td>
                <td>{product.rating || "0"}</td>
                <td>{product.price} VND</td>
                <td>
                  <button onClick={() => onEdit(product)}>Sửa</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có sản phẩm nào!</td> {/* Đổi colSpan 6 -> 7 */}
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <button onClick={onAdd}>Add new product</button>
      </div>
    </div>
  );
};

export default ProductTable;
