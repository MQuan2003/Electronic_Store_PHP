import React, { useEffect, useState } from "react";
import TechnicalDetails from "../components/ProductDetail/TechnicalDetails";
import AddToCart from "../components/ProductDetail/AddToCart";
import "../css/ProductDetail.css";
import BasicProductDetails from "../components/ProductDetail/BasicProductDetails";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import RatingComment from "../components/ProductDetail/CommentAndRating";
import DisplayComment from "../components/ProductDetail/DisplayComment";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost/server/get_product_detail.php?id=${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(`Product ${id}: `, data);
                
                setProduct(data);
            } catch (e) {
                console.error("Lỗi khi lấy sản phẩm: ", e.message);
                setError("Không thể tải sản phẩm, vui lòng thử lại sau!");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!product) return <p style={{ textAlign: "center" }}>Không có sản phẩm nào!</p>;

    return (
        <>
            <Breadcrumb />
            <div className="BPD">
                <div>
                    <BasicProductDetails product={product} />
                    <TechnicalDetails attributes={product.attributes} />
                </div>
                <div>
                    <AddToCart product={product} />
                </div>
            </div>
            <div className="BPD-Comment">
                <RatingComment />
                <div style={{ width: "100%", maxWidth: "956px" }}>
                    <DisplayComment />
                    <DisplayComment />
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
