import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {/* Background section with overlay */}
      <section className="footer-wallpaper text-white py-5">
        <div className="container">
          <div className="row">

            {/* About Us */}
            <div className="col-md-4 mb-4">
              <h5 className="text-warning mb-3">About Us</h5>
              <p>
                <strong>Pizza Hut</strong> is a global favorite for delicious pizzas, pasta, and sides. Founded in 1958, it now serves customers in over 100 countries — including here in Nairobi, Kenya!
              </p>
              <p>
                Visit us at Village Market, Yaya Centre, and Mombasa Road. Enjoy delivery, takeout, or dine-in. 🍕✨
              </p>
            </div>

            {/* Contact Form */}
            <div className="col-md-4 mb-4">
              <h5 className="text-warning mb-3">Reach Us</h5>
              <form>
                <div className="mb-2">
                  <input type="email" className="form-control" placeholder="Enter your email" />
                </div>
                <div className="mb-2">
                  <textarea className="form-control" rows="4" placeholder="Leave a comment..."></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    <FaEnvelope className="me-2" /> Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Social Links */}
            <div className="col-md-4 text-center mb-4">
              <h5 className="text-warning mb-3">Connect With Us</h5>
              <div className="mb-3">
                <a href="https://facebook.com" className="btn btn-outline-light me-2">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com" className="btn btn-outline-light">
                  <FaInstagram />
                </a>
              </div>
              <p>Have questions or feedback? We’d love to hear from you. 😊</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="footer-black text-white text-center py-3">
        <small>Developed by Pauline Maina &copy; 2025. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default Footer;
