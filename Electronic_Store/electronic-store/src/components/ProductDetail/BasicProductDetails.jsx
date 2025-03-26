import React, { useState } from "react";
import "../../css/BasicProductDetails.css";

const BasicProductDetails = ({ product }) => {
    const images = product.image_urls ? product.image_urls.split(",") : []; // Chuyển chuỗi thành mảng
    const [mainImage, setMainImage] = useState(images.length > 0 ? images[0] : "https://via.placeholder.com/300");

    return (
        <div className="BPD-container">
            {/* Thư viện ảnh */}
            <div className="BPD-gallery">
                <div className="BPD-gallery-mainImg">
                    <img src={mainImage} alt="Main product" />
                </div>
                <div className="BPD-gallery-subImg">
                    {images.length > 0 ? images.map((image, index) => (
                        <img key={index} src={image} onClick={() => setMainImage(image)} className="subImage" alt="Sub product" />
                    )) : <p>No additional images</p>}
                </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="BPD-details">
                <h3>{product.name}</h3>

                {/* Đánh giá & số lượng bán */}
                <div className="rating-section">
                    <span className="rating"><i className="bi bi-star-fill star-icon"></i> {product.rating || "4.9"}</span>
                    <span className="stick">|</span>
                    <span className="sold">Sold {product.sold || "0"}</span>
                </div>

                {/* Trạng thái hàng */}
                <div className="product-availability">
                    <span className={`availability ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        <i className="bi bi-shop-window"></i> {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                    <span className="availability guaranteed"><i className="bi bi-patch-check"></i> Guaranteed</span>
                    <span className="availability delivery"><i className="bi bi-truck"></i> Free Delivery</span>
                </div>

                {/* Thông số sản phẩm */}
                <div className="product-specs">
                    <ul>
                        <li><strong>Brand:</strong> <span>{product.brand_name || "Unknown"}</span></li>
                        <li><strong>Price:</strong> <span>${product.price}</span></li>
                        <li><strong>Discount:</strong> <span>{product.discount ? `${product.discount * 100}%` : "No discount"}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BasicProductDetails;
