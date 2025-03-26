
import "../../css/ShippingDetails.css";
import { useState, useEffect } from "react";

const ShippingDetails = ({ setAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setLocalAddress] = useState({
        street: "",
        district: "",
        city: "",
        postalCode: ""
    });

    useEffect(() => {
        const storedAddress = JSON.parse(localStorage.getItem("address"));
        if (storedAddress) {
            setLocalAddress(storedAddress);
        }
    }, []);

    const [tempAddress, setTempAddress] = useState({ ...address });

    const handleOpenModal = () => {
        setTempAddress(address); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setLocalAddress(tempAddress);
        setAddress(tempAddress);
        localStorage.setItem("address", JSON.stringify(tempAddress));
        setIsModalOpen(false);
    };

    return (
        <div className="Shipping-detail">
            <div className="SD-container">
                <label>User</label>
                <input type="text" value="Quoc Bao" readOnly />
                
                <label>Ship to</label>
                <div className="editable-input">
                    <input 
                        type="text" 
                        value={address.street ? `${address.street}, ${address.district}, ${address.city}` : "No address entered"} 
                        readOnly 
                    />
                    <i className="bi bi-pencil edit-icon" onClick={handleOpenModal}></i>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Address Details</h2>

                        <label>Address</label>
                        <input 
                            type="text" 
                            value={tempAddress.street} 
                            onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })} 
                        />

                        <label>District</label>
                        <input 
                            type="text" 
                            value={tempAddress.district} 
                            onChange={(e) => setTempAddress({ ...tempAddress, district: e.target.value })} 
                        />

                        <label>City</label>
                        <input 
                            type="text" 
                            value={tempAddress.city} 
                            onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} 
                        />

                        <label>Postal Code</label>
                        <input 
                            type="text" 
                            value={tempAddress.postalCode} 
                            onChange={(e) => setTempAddress({ ...tempAddress, postalCode: e.target.value })} 
                        />

                        <div className="modal-actions">
                            <button onClick={handleCloseModal}>Hủy</button>
                            <button onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingDetails;