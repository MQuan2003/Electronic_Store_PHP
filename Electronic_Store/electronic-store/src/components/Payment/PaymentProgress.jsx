import React from "react";
import { useLocation } from "react-router-dom";
import "../../css/PaymentProgress.css";

const ProgressBar = () => {
    const location = useLocation();
    const steps = [
        { name: "cart", icon: "bi-cart" },
        { name: "checkout", icon: "bi-truck" },
        { name: "payment", icon: "bi-credit-card" }
    ];
    
    const currentStep = steps.findIndex(step => location.pathname.startsWith(`/${step.name}`)) + 1;

    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ "--progress-width": `${(currentStep - 1) / (steps.length - 1) * 90}%` }}>
                {steps.map((step, index) => (
                    <div key={index} className="step-wrapper">
                        <div className={`step ${index < currentStep ? "completed" : ""} ${index + 1 === currentStep ? "active" : ""}`}>
                            <div className="step-circle">
                                <i className={`bi ${step.icon}`}></i>
                            </div>
                            <div className="step-label">{step.name.charAt(0).toUpperCase() + step.name.slice(1)}</div>
                        </div>
                        {index < steps.length - 1 && <div className="step-line"></div>}
                        
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
