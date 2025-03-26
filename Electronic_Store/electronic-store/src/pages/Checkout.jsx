import React, { useEffect, useState } from "react";
import ShippingDetails from "../components/Payment/ShippingDetails";
import ContinueToPay from "../components/Payment/ContinueToPay";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        const storedAddress = JSON.parse(localStorage.getItem("address"));
        setAddress(storedAddress);
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%" }}>
                <ShippingDetails setAddress={setAddress} />
                <a href="/cart" style={{ color: "#0C68F4", marginTop: "20px", display: "block" }}>Return to Cart</a>
            </div>
            <div style={{ width: "40%" }}>
                <ContinueToPay cart={cart} setCart={setCart} address={address} />
            </div>
        </div>
    );
};

export default Checkout;
