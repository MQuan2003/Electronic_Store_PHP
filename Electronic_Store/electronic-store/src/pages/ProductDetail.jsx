import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TechnicalDetails from "../components/ProductDetail/TechnicalDetails";
import AddToCart from "../components/ProductDetail/AddToCart";
import BasicProductDetails from "../components/ProductDetail/BasicProductDetails";
import Breadcrumb from "../components/Breadcrumb";
import RatingComment from "../components/ProductDetail/CommentAndRating";
import DisplayComment from "../components/ProductDetail/DisplayComment";
import "../css/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost/PHP/store/server/get_product_detail.php?id=${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(`Product ${id}: `, data);

                if (data.status === "success") {
                    setProduct({
                        ...data.product,
                        attributes: data.product.attributes || {},
                    });
                    setReviews(data.reviews || []);
                } else {
                    throw new Error(data.message || "Sản phẩm không tồn tại!");
                }
            } catch (e) {
                console.error("Lỗi khi lấy sản phẩm: ", e.message);
                setError(e.message);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmitReview = (newReview) => {
        setReviews([{ user_name: "You", ...newReview, created_at: new Date().toISOString() }, ...reviews]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!product) return <p style={{ textAlign: "center" }}>Không có sản phẩm nào!</p>;

    return (
        <>
            <Breadcrumb />
            <div className="BPD">
                <div>
                    <BasicProductDetails product={product} />
                    <TechnicalDetails attributes={product?.attributes || {}} />
                </div>
                <div>
                    <AddToCart product={product} />
                </div>
            </div>

            <div className="BPD-Comment">
                <RatingComment onSubmit={handleSubmitReview} />
                <div style={{ width: "100%", maxWidth: "956px" }}>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <DisplayComment key={index} review={review} />
                        ))
                    ) : (
                        <p>Chưa có đánh giá nào.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
