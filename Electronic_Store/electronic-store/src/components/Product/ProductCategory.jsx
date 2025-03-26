import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/ProductCategory.css";

const ProductCategory = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost/PHP/store/server/get_categories.php");
                const data = await response.json();
                setCategories(data); // API bây giờ trả về danh sách { id, name, icon_class }
            } catch (error) {
                console.error("Lỗi tải danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        const currentCategory = searchParams.get("name");
        if (currentCategory === categoryName) {
            navigate("/products");
        } else {
            navigate(`/products/category?name=${categoryName}`);
        }
    };

    return (
        <div className="category-tabs">
            {categories.map((cat) => (
                <div
                    key={cat.id || cat.name} // Dùng id, nếu không có thì fallback về name
                    className={`category ${searchParams.get("name") === cat.name ? "active" : ""}`}
                    onClick={() => handleCategoryClick(cat.name)}
                >
                    <i className={`bi ${cat.icon_class}`}></i> {cat.name}
                </div>
            ))}

        </div>
    );
};

export default ProductCategory;
