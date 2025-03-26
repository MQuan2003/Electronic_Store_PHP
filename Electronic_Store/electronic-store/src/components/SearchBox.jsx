import React, { useState, useEffect } from "react";
import styles from "../css/SearchBox.module.css";
import { Link } from "react-router-dom";

const SearchBox = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchTerm) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/products/search?name=${searchTerm}`);
                const data = await response.json();
                setProducts(data.slice(0, 20));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className={styles.searchBox}>
            <div className={styles.searchHeader}>
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={styles.exitBtn} onClick={onClose}>✖</button>
            </div>

            <div className={styles.results} style={{ maxHeight: "400px", overflowY: "auto" }}>
                {loading ? (
                    <p>Loading...</p>
                ) : products.length > 0 ? (
                    products.map((product, index) => {
                        const price = parseFloat(product.price);
                        const discount = parseFloat(product.discount);
                        const discountedPrice = discount > 0
                            ? (price * (1 - discount)).toFixed(2)
                            : price.toFixed(2);

                        return (
                            <Link to={`/products/${product.id}`} onClick={onClose}>
                                <div key={index} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        <p className={styles.productName}>{product.name}</p>
                                        <p className={styles.productPrice} style={{ color: "red" }}>
                                            ${discountedPrice}
                                        </p>
                                        {discount > 0 && (
                                            <p className={styles.productOldPrice} style={{ textDecoration: "line-through", color: "gray" }}>
                                                ${price.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    searchTerm && <p className={styles.noResults}>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchBox;
