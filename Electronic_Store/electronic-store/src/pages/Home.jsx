import React, { useState, useEffect } from "react";
import ProductSlider from "../components/ProductSlider";
import laptop from "../assets/Laptop-Home.png";
import styles from "../css/Home.module.css";
import ProductCard from "../components/Product/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy tất cả sản phẩm
        const productsRes = await fetch("http://localhost/PHP/store/server/get_products.php");
        const productsData = await productsRes.json();

        // Lấy sản phẩm mới
        const newProductsRes = await fetch("http://localhost/PHP/store/server/get_new_products.php");
        const newProductsData = await newProductsRes.json();

        // Lấy sản phẩm bán chạy
        const bestSellersRes = await fetch("http://localhost/PHP/store/server/get_best_sellers.php");
        const bestSellersData = await bestSellersRes.json();

        setProducts(productsData);
        setNewProducts(newProductsData);
        setBestSellers(bestSellersData);
      } catch (e) {
        console.error("Failed to load products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles["home"]}>
      {/* Landing Section */}
      <div className={styles["home-introduction"]}>
        <div className={styles["home-text"]}>
          <h1 style={{ fontSize: "64px" }}>GDkelvin</h1>
          <p style={{ fontSize: "32px" }}>
            "Join the <span style={{ color: "#FF6951" }}>digital revolution</span>"
          </p>
          <button>Explore more</button>
        </div>
        <div className={styles["home-image"]}>
          <img src={laptop} alt="Laptop" />
        </div>
      </div>

      {/* Product Slider */}
      {loading ? <h3>Loading products...</h3> : <ProductSlider products={products} />}

      {/* New Products */}
      <div className={styles["new-products"]}>
        <div className={styles["new-products-header"]}>
          <h2>New Products</h2>
        </div>
        <div className={styles["new-products-productCard"]}>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      {/* Best Seller */}
      <div className={styles["new-products"]}>
        <div className={styles["new-products-header"]}>
          <h2>Best Seller</h2>
        </div>
        <div className={styles["new-products-productCard"]}>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
