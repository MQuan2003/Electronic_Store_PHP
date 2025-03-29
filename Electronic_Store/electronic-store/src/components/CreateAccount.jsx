import React, { useState } from "react";
import styles from "../css/CreateAccount.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function CreateAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(form.password)) {
      newErrors.password = "Password must be at least 6 characters and include a number, uppercase letter, and special character";
    }
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost/PHP/store/server/register.php", {
          name: `${form.firstName} ${form.lastName}`,  // Gộp firstName + lastName thành name
          email: form.email,
          password: form.password,
          phone: null, // Gửi null nếu không có input phone
          address: null, // Gửi null nếu không có input address
        });

        if (response.data.status === "success") {
          alert("Account created successfully!");
          window.location.reload();
        } else {
          alert(response.data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.signup}>
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["Signup-input"]}>
          <div className={styles["input-group"]}>
            <i className="bi bi-person"></i>
            <input type="text" placeholder="Enter First Name" id="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-person"></i>
            <input type="text" placeholder="Enter Last Name" id="lastName" value={form.lastName} onChange={handleChange} />
          </div>
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-envelope"></i>
            <input type="text" placeholder="Enter Email" id="email" value={form.email} onChange={handleChange} />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-key"></i>
            <input type="password" placeholder="Enter Password" id="password" value={form.password} onChange={handleChange} />
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-key"></i>
            <input type="password" placeholder="Confirm Password" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          </div>
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <button className={styles["btn-Signup"]} type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
