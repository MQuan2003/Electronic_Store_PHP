import React from "react";
import "../../css/ProductCard.css";
import defaultImg from "../../assets/laptop.jpg";  // Ảnh mặc định khi không có ảnh
import line from "../../assets/line.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    if (!product) return <p>Loading ...</p>;

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
        ? (price * (1 - discount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const formattedOriginalPrice = price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const discountPercentage = discount > 0 ? `-${(discount * 100).toFixed(0)}%` : null;

    // Xử lý ảnh sản phẩm
    const productImage = product.image_url
        ? `${product.image_url}`  // Thêm đường dẫn đầy đủ nếu chỉ có tên file
        : defaultImg;
    console.log(productImage);
    return (
        <Link to={`/products/${product.id}`}>
            <div className="product-card">
                {discount > 0 && <div className="product-discount">{discountPercentage}</div>}

                <div className="product-image">
                    <img src={productImage} alt={product.name} onError={(e) => e.target.src = defaultImg} />
                </div>

                <img src={line} alt="divider" className="line" />

                <div className="product-info">
                    <p className="product-name">{product.name}</p>

                    <div className="product-footer">
                        <div className="product-footer-discount">
                            <span className="product-price">${discountedPrice}</span>
                            {discount > 0 && (
                                <span className="product-old-price" style={{ textDecoration: "line-through", color: "gray", marginLeft: "8px" }}>
                                    ${formattedOriginalPrice}
                                </span>
                            )}

                        </div>

                        <div className="product-rating">
                            <i className="bi bi-star-fill star-icon"></i>
                            <span className="rating-score">{product.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
