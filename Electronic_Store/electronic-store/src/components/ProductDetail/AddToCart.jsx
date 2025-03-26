import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AddToCart.css";

const AddToCart = ({ product, userId }) => {
    const navigate = useNavigate();
    const [cartUpdated, setCartUpdated] = useState(false);

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
    ? (price * (1 - discount / 100)).toFixed(2) // Chia discount cho 100
    : price.toFixed(2);

    const discountPercentage = discount > 0 ? `${(discount * 100).toFixed(0)}%` : null;

    const updateCart = async () => {
        if (!userId) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        try {
            const response = await fetch("http://localhost/PHP/store/server/add_to_cart.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: product.id,
                    quantity: 1
                })
            });

            const data = await response.json();
            if (response.ok) {
                setCartUpdated(true);
                setTimeout(() => setCartUpdated(false), 2000);
            } else {
                console.error("Lỗi:", data.error);
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    const handleBuyNow = () => {
        updateCart();
        navigate("/cart");
    };

    return (
        <div className="ATC-container">
            <div className="ATC-container-2">
                <div className="ATC-price">
                    <span className="price">${discountedPrice}</span>
                    {discount > 0 && <span className="sale">-{discountPercentage}</span>}
                </div>
                {discount > 0 && (
                    <p className="ATC-last-price">
                        Last price <s>${price.toFixed(2)}</s>
                    </p>
                )}

                <button className="buy" onClick={handleBuyNow}>Buy now</button>
                <button className="add-to-cart" onClick={updateCart}>Add to cart</button>

                {cartUpdated && <p className="cart-message">Added to cart!</p>}
            </div>
        </div>
    );
};

export default AddToCart;
