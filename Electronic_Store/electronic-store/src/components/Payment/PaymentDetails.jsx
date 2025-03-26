import React, { useEffect, useState } from "react";
import "../../css/PaymentDetails.css";
import { Link } from "react-router-dom";

const PaymentDetails = ({ cart }) => {
    const [subtotal, setSubtotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    // Handle shipment cost later
    const [shipmentCost, setShipmentCost] = useState(0); 

    useEffect(() => {
        let newSubtotal = 0;
        let newDiscount = 0;

        cart.forEach((item) => {
            const price = parseFloat(item.price) || 0;
            const discount = parseFloat(item.discount) || 0;
            const discountedPrice = price * (1 - discount);
            
            newSubtotal += price * item.quantity;
            newDiscount += (price - discountedPrice) * item.quantity;
        });

        setSubtotal(newSubtotal);
        setTotalDiscount(newDiscount);
    }, [cart]);

    const grandTotal = subtotal - totalDiscount + shipmentCost;
    const isCartEmpty = cart.length === 0;

    return (
        <div className="PaymentDetails">
            <h3>Payment Details</h3>
            <div className="sub-total">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="discount">
                <span>Discount</span>
                <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="shipment-cost">
                <span>Shipment cost</span>
                <span>${shipmentCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="grand-total">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>
            <Link to={isCartEmpty ? "#" : "/checkout"}>
                <button 
                    className="PTC"
                    disabled={isCartEmpty}
                    style={{ opacity: isCartEmpty ? 0.5 : 1, cursor: isCartEmpty ? "not-allowed" : "pointer" }}
                >
                    Proceed to checkout
                </button>
            </Link>
        </div>
    );
};

export default PaymentDetails;
