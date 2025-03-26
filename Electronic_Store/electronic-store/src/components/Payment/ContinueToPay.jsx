import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/ContinueToPay.css";

const ContinueToPay = ({ cart, setCart, address }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderId, setOrderId] = useState(null);

    const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);
    const totalDiscount = cart.reduce((acc, item) => {
        const price = parseFloat(item.price) || 0;
        const discount = parseFloat(item.discount) || 0;
        return acc + (price * discount * item.quantity);
    }, 0);
    const shipmentCost = 0;
    const grandTotal = subtotal - totalDiscount + shipmentCost;

    const handleOrderSubmit = async () => {
        if (!address) {
            alert("Please enter a shipping address before proceeding.");
            return;
        }
    
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("You must be logged in to place an order.");
            return;
        }
    
        const user = JSON.parse(storedUser);
        const userId = user?.id;
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }
    
        try {
            let currentOrderId = orderId;
            if (!currentOrderId) {
                const existingOrderId = localStorage.getItem("orderId"); 
                if (existingOrderId) {
                    currentOrderId = existingOrderId;
                } else {
                    const orderData = {
                        userId,
                        items: cart.map(item => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        total_price: grandTotal,
                        shipping_address: `${address.street}, ${address.district}, ${address.city}, ${address.postalCode}`
                    };
    
                    const orderResponse = await fetch("http://localhost:3000/order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(orderData),
                    });
    
                    if (!orderResponse.ok) {
                        throw new Error("Order submission failed.");
                    }
    
                    const orderResult = await orderResponse.json();
                    currentOrderId = orderResult.id;
                    setOrderId(currentOrderId);
                    localStorage.setItem("orderId", currentOrderId); 
                }
            }
    
            if (location.pathname === "/checkout") {
                navigate("/payment");
            } else {
                const paymentData = {
                    orderId: currentOrderId,
                    userId,
                    amount: grandTotal,
                    paymentMethod: "creditCard",
                };
    
                const paymentResponse = await fetch("http://localhost:3000/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentData),
                });
    
                if (!paymentResponse.ok) {
                    throw new Error("Payment failed.");
                }
    
                localStorage.removeItem("cart");
                localStorage.removeItem("orderId"); 
                alert("Payment Successful!")
                navigate("/");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="your-order">
            <h2>Your Order</h2>
            <div className="y-card-container">
                {cart.map((item) => {
                    const price = parseFloat(item.price) || 0;
                    const discount = parseFloat(item.discount) || 0;
                    const discountedPrice = price * (1 - discount);

                    return (
                        <div className="y-card" key={item.id}>
                            <div className="y-card-image">
                                <img src={item.image || "fallback.jpg"} alt={item.name} />
                            </div>

                            <div className="y-card-info" style={{ width: "100%" }}>
                                <p>{item.name}</p>
                                <div className="y-card-info-price">
                                    <div><span>x{item.quantity}</span></div>
                                    <div>
                                        <span style={{ marginRight: "6px" }}>${discountedPrice.toFixed(2)}</span>
                                        {discount > 0 && <span style={{ color: "#717171" }}>from ${price.toFixed(2)}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="y-price">
                <div>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div>
                    <span>Discount</span>
                    <span>-${totalDiscount.toFixed(2)}</span>
                </div>
                <div>
                    <span>Shipment cost</span>
                    <span>${shipmentCost.toFixed(2)}</span>
                </div>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>Grand Total</span>
                <span style={{ color: "#717171" }}>${grandTotal.toFixed(2)}</span>
            </div>

            <div className="btn-continue">
                <button onClick={handleOrderSubmit}>
                    {location.pathname === "/checkout" ? "Continue to Pay" : "Complete Payment"}
                </button>
            </div>
        </div>
    );
};

export default ContinueToPay;
