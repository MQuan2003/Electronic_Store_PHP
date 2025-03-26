import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AuthModal from "../pages/AuthPage";
import SearchBox from "./SearchBox";
import CategoryMenu from "./CategoryMenu";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>

                <div className="nav-link">
                    <div className="nav-links-container">
                        <div><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></div>
                        <div className="nav-dropdown-menu" onMouseEnter={() => setIsCategoryMenuOpen(true)} onMouseLeave={() => setIsCategoryMenuOpen(false)}>
                            <Link to="/products" className={location.pathname.startsWith("/product") ? "active" : ""}>Products</Link>
                            {isCategoryMenuOpen && (
                                <div className="idk">
                                    <CategoryMenu onClose={() => setIsCategoryMenuOpen(false)} />
                                </div>
                            )}
                        </div>
                        <div><Link to="/contact">Contact Us</Link></div>
                    </div>
                </div>

                <div className="nav-icon">
                    <i className="bi bi-search" onClick={() => setIsSearchOpen(true)}></i>
                    <Link to="/cart" style={{textDecoration:"none" ,color: "inherit"}}><i className="bi bi-basket2"></i></Link>

                    {user ? (
                        <div className="user-info">
                            <span>{user.first_name}</span>
                            <i className="bi bi-person"></i>
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </div>
                    ) : (
                        <i className="bi bi-person" onClick={() => setIsModalOpen(true)}></i>
                    )}
                </div>

                {isSearchOpen && <div className="overlay" onClick={() => setIsSearchOpen(false)}></div>}
                {isSearchOpen && <SearchBox onClose={() => setIsSearchOpen(false)} />}
            </nav>

            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default Navbar;
