import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (value) => {
    const lengthCheck = value.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(value);
    const lowercaseCheck = /[a-z]/.test(value);
    const symbolCheck = /[^A-Za-z0-9]/.test(value);

    if (!lengthCheck || !uppercaseCheck || !lowercaseCheck || !symbolCheck) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    // Prevent form submission if password is weak
    if (passwordError) {
      setError("Please correct the password requirements.");
      return;
    }

    setLoading("Please wait as we log you In...");
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://paulamaina.pythonanywhere.com/api/signin",
        data
      );

      setLoading("");

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/"); // Redirect after success message
        }, 1500);
      } else {
        setError(response.data.Message || "Invalid credentials.");
      }
    } catch (error) {
      setLoading("");
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center mybcgcontainer">
      <div className="col-md-6 card shadow-lg p-5 bg-gradient rounded-5">
        <h2 className="text-center mb-4 text-success">Sign In</h2>
        <form onSubmit={submit}>
          {loading && <div className="alert alert-info">{loading}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="email"
            placeholder="Enter your email address"
            className="form-control mb-4 p-3 rounded-pill shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          {/* Password input with eye toggle */}
          <div className="input-group mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="form-control p-3 rounded-pill shadow-sm"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary p-3 rounded-circle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Password strength warning */}
          {password && passwordError && (
            <small className="text-danger d-block mb-3">{passwordError}</small>
          )}

          <button type="submit" className="btn btn-success w-100 p-3 rounded-pill shadow-lg">
            Sign In
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signin;
