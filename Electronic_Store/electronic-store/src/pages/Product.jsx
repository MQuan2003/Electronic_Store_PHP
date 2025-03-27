import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCategory from '../components/Product/ProductCategory';
import ProductCard from '../components/Product/ProductCard';
import ProductFilter from '../components/Product/ProductFilter';
import Breadcrumb from "../components/Breadcrumb";
import "../css/Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("name");
  const [sorting, setSorting] = useState("newArrivals");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 99999 });
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let url = `http://localhost/PHP/store/server/get_products.php?`;

        if (selectedCategory) {
          url += `category=${selectedCategory}&`;
        }
        if (selectedBrands.length > 0) {
          url += `brand=${selectedBrands.join(",")}&`; // Đảm bảo gửi danh sách ID thay vì tên
        }


        const response = await fetch(url);
        const data = await response.json();

        setProducts(data);
      } catch (e) {
        console.error("Failed to load products: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [selectedCategory, selectedBrands]);

  const sortProducts = [...products]
    .filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)
    .sort((a, b) => {
      if (sorting === "newArrivals") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sorting === "priceAscending") {
        return a.price - b.price;
      }
      if (sorting === "priceDescending") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <>
      <Breadcrumb />
      <div className="product-page">
        <div className="category-section">
          <ProductCategory />
        </div>

        <div className="content-container">
          <div className="filter-section">
            <ProductFilter onBrandChange={setSelectedBrands} onPriceChange={setPriceRange} />
          </div>

          <div className="product-section">
            <div className="sort-product">
              <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
                <option value="newArrivals">Sort by: New arrivals</option>
                <option value="priceAscending">Price: Ascending</option>
                <option value="priceDescending">Price: Descending</option>
              </select>
            </div>
            {loading ? (
              <h1 className="loading-message">Loading...</h1>
            ) : sortProducts.length === 0 ? (
              <h1 className="loading-message">No Product Found</h1>
            ) : (
              <div className="product-grid">
                {sortProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
