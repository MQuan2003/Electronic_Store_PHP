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
            const response = await axios.post("http://localhost:3000/user/login", form);
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));

            setMessage(response.data.message);
            alert("Login successfully");
            window.location.reload(); 
            
        } catch (error) {
            if (error.response) {
                setErrors({ login: error.response.data.message || "Invalid email or password" });
            } else if (error.request) {
                alert("Server error. Please try again later.");
            } else {
                // Other unexpected errors
                setErrors({ login: "An unexpected error occurred. Please try again." });
            }
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
