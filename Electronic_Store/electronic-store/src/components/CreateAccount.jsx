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
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(form.password)) {
      newErrors.password = "Password must be at least 6 characters and include a number, uppercase letter, and special character";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

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
        const response = await axios.post("http://localhost:3000/user/register", {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password
        });

        alert("Account created successfully");

        // Auto login after registration
        const loginResponse = await axios.post("http://localhost:3000/user/login", {
          email: form.email,
          password: form.password
        });

        const user = loginResponse.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();  

      } catch (e) {
        console.error("Error response:", e.response); 
        if (e.response) {
          if (e.response.status === 400 || e.response.status === 409) {
            alert("This email is already registered"); 
          } else {
            alert("Failed to create account");
          }
        } else {
          alert("Server error. Please try again later.");
        }
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
            <input
              type="text"
              placeholder="Enter First Name"
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="Enter Last Name"
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="text"
              placeholder="Enter Email"
              id="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-key"></i>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <div className={styles["input-group"]}>
            <i className="bi bi-key"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <div className={styles["agree-term"]}>
          <input type="checkbox" /> I agree to all <a href="#">Terms & Conditions</a>
        </div>

        <button className={styles["btn-Signup"]} type="submit">
          Create Account
        </button>

        <div className={styles["other-signin"]}>
          <div className={styles["text-other-signin"]}>Or Sign In With</div>
          <div className={styles.btn}>
            <button className={styles["btn-Google"]}>
              <i className="bi bi-google"></i> Google
            </button>
            <button className={styles["btn-Facebook"]}>
              <i className="bi bi-facebook"></i> Facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
