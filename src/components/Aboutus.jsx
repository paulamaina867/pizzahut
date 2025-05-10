import React from 'react';
import Footer from './Footer';
import { FaPizzaSlice, FaStar, FaSmile, FaClock } from 'react-icons/fa';
import 'animate.css';


const Aboutus = () => {
  return (
    <div
      className="aboutus-page py-5 px-3"
      style={{
        backgroundImage: "url('pizza20.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: '#fff',
      }}
    >
      <div className="container" style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '1rem', padding: '2rem' }}>
        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-warning animate__animated animate__fadeIn animate__delay-1s">Why People Love Pizza Hut</h1>
          <p className="lead text-light animate__animated animate__fadeIn animate__delay-1s">Crafted with care. Served with joy. Remembered forever.</p>
        </div>

        {/* Main Content */}
        <div className="row align-items-center mb-5">
          {/* Video */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="shadow rounded-4 overflow-hidden">
              <video
                src="videos/pizza.mp4"
                autoPlay
                muted
                loop
                className="w-100"
                style={{ maxHeight: '320px', objectFit: 'cover', borderRadius: '1rem' }}
              ></video>
            </div>
          </div>

          {/* Description */}
          <div className="col-md-6">
            <div className="bg-dark bg-opacity-75 rounded-4 shadow-sm p-4 text-white">
              <p className="fs-5 mb-4">
                🍕 <strong>Pizza Hut</strong> is more than a brand — it's a memory maker and flavor icon:
              </p>
              <ul className="list-unstyled fs-6">
                <li>
                  <FaPizzaSlice className="text-warning me-2 icon" />
                  Signature Pan & Stuffed Crust
                </li>
                <li>
                  <FaSmile className="text-info me-2 icon" />
                  Family meals & party nostalgia
                </li>
                <li>
                  <FaStar className="text-success me-2 icon" />
                  Inventive menus & limited-time treats
                </li>
                <li>
                  <FaClock className="text-danger me-2 icon" />
                  Quick delivery with a smile
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row text-center g-4 mb-5">
          <div className="col-md-3">
            <div className="stat-card bg-dark bg-opacity-75 p-4 rounded-4 shadow-sm text-white animate__animated animate__fadeIn animate__delay-1s">
              <h2 className="text-warning fw-bold">1200+</h2>
              <p>Happy Customers</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark bg-opacity-75 p-4 rounded-4 shadow-sm text-white animate__animated animate__fadeIn animate__delay-1s">
              <h2 className="text-success fw-bold">30+</h2>
              <p>Unique Services</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark bg-opacity-75 p-4 rounded-4 shadow-sm text-white animate__animated animate__fadeIn animate__delay-1s">
              <h2 className="text-primary fw-bold">15</h2>
              <p>Years of Experience</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark bg-opacity-75 p-4 rounded-4 shadow-sm text-white animate__animated animate__fadeIn animate__delay-1s">
              <h2 className="text-danger fw-bold">50+</h2>
              <p>Pizza Varieties</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Aboutus;
