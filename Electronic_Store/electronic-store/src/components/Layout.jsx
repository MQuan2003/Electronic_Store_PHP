import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Layout.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import ProgressBar from "./Payment/PaymentProgress";
const Layout = () => {
    const location = useLocation();
    const showProgressBar = ["/cart", "/checkout", "/payment"].includes(location.pathname);
    console.log("Current Path:", location.pathname);
    return (
        <>
            <div className="layout">
                <Navbar />
                <main className="content">
                    {showProgressBar && <ProgressBar />}
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout