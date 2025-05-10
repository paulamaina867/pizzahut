import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm mt-1">
      {/* Brand Logo */}
      <Link to="/" className="navbar-brand fw-bold text-primary">
        pizza<span className="text-danger">Hut</span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarcontents"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarcontents">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link fs-5 text-dark">
              <strong>See Pizza</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addpizza" className="nav-link fs-5 text-dark">
              <strong>Sell Pizza</strong>
            </Link>
          </li>
        </ul>

        {/* Authorization Links (Aligned Right) */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link fs-5 text-dark">
              <strong>About Us</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chatbot" className="nav-link fs-5 text-dark">
              <strong>Chat Bot</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signin"
              className="btn btn-outline-primary rounded-pill text-dark me-2 fs-6"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="btn btn-danger rounded-pill text-white fs-6"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
