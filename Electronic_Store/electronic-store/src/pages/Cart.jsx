import React, { useEffect, useState } from "react";
import PaymentProductCard from "../components/Payment/PaymentProductCard";
import PaymentDetails from "../components/Payment/PaymentDetails";
import styles from "../css/Cart.module.css";
import { Link } from "react-router-dom";
const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handleQuantityChange = (id, change) => {
        const newCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        );
        updateCart(newCart);
    };

    const handleRemoveItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        updateCart(newCart);
    };

    return (
        <div className={styles.Cart}>
            <div className={styles["payment-product-card"]}>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <PaymentProductCard 
                            key={item.id} 
                            product={item} 
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))
                ) : (
                    <div className={styles.emptyCart}>
                        <p>Your cart is empty</p>
                        <Link to="/products" className={styles.continueShoppingButton}>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles["payment-details"]}>
                <PaymentDetails cart={cart} />
            </div>
        </div>
    );
};

export default Cart;
