import React, { useState } from "react";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
import styles from "../css/AuthPage.module.css";

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login"); // Default to login

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button
            className={activeTab === "login" ? styles.active : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? styles.active : ""}
            onClick={() => setActiveTab("signup")}
          >
            Create Account
          </button>
        </div>

        {/* Show Login or CreateAccount component */}
        {activeTab === "login" ? <Login /> : <CreateAccount />}

        {/* <button className={styles.closeBtn} onClick={onClose}>✖</button> */}
      </div>
    </div>
  );
};

export default AuthModal;
