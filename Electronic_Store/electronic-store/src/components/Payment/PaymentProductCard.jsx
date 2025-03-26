import React from "react";
import "../../css/PaymentProductCard.css";

const PaymentProductCard = ({ product, onQuantityChange, onRemove }) => {
    const price = parseFloat(product.price) || 0; 
    const discount = parseFloat(product.discount) || 0; 
    const discountedPrice = discount > 0 
    ? (price * (1 - discount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
    : price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formattedOriginalPrice = price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    return (
        <div className="PPD">
            <div className="PPD-image">
                <img src={product.image || "fallback.jpg"} alt={product.name} />
            </div>
            <div className="PPD-info">
                <h3>{product.name}</h3>
                <div className="PPD-info-2">
                    <div className="PPD-price">
                        {discount > 0 ? (
                            <>
                                <span className="original-price"><s>${formattedOriginalPrice}</s></span>
                                <span className="discounted-price">${discountedPrice}</span>
                            </>
                        ) : (
                            <span className="discounted-price">${formattedOriginalPrice}</span>
                        )}
                    </div>
                    <div className="PPD-actions">
                        <span className="quantity-controls">
                            <i className="bi bi-trash text-danger" onClick={() => onRemove(product.id)}></i>
                            <button className="decrease" onClick={() => onQuantityChange(product.id, -1)}>-</button>
                            <span className="quantity">{product.quantity}</span>
                            <button className="increase" onClick={() => onQuantityChange(product.id, 1)}>+</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentProductCard;
