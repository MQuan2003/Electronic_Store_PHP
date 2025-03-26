import React from "react";
import "../../css/TechnicalDetails.css";

const TechnicalDetails = ({ attributes }) => {
    if (!attributes || Object.keys(attributes).length === 0) {
        return <p className="no-details">No technical details available.</p>;
    }

    // Hàm viết hoa chữ cái đầu của key
    const formatKey = (key) => key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="technical-detail">
            <h3 style={{ marginBottom: "10px", marginTop: "50px" }}>Technical Details</h3>
            <table>
                <tbody>
                    {Object.entries(attributes).map(([key, value], index) => (
                        <tr key={index}>
                            <td className="first-column">{formatKey(key)}</td>
                            <td className="second-column">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TechnicalDetails;
