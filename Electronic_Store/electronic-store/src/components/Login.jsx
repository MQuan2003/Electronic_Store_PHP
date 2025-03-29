import React, { useState } from "react";
import axios from "axios";
import styles from "../css/login_signup.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");
    
        try {
            const response = await axios.post("http://localhost/PHP/store/server/login.php", form);
            console.log("API Response:", response.data); // Debug response
    
            if (response.data.status === "success") {
                const token = response.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
    
                setMessage(response.data.message);
                alert("Login successfully");
                window.location.reload();
            } else {
                setErrors({ login: response.data.message });
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ login: "Có lỗi xảy ra, vui lòng thử lại." });
        }
    };
    

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            {message && <p className={styles.success}>{message}</p>}
            {errors.login && <p className={styles.error}>{errors.login}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles["Signup-input"]}>
                    <div className={styles["input-group"]}>
                        <i className="bi bi-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-group"]}>
                        <i className="bi bi-key"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles["agree-term"]}>
                    <input type="checkbox" /> Keep me logged in
                </div>
                <p className={styles.forgotPass}><a href="#">Forgot Password?</a></p>

                <button className={styles["btn-Signup"]} type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;
