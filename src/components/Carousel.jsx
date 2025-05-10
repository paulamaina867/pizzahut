import { Link } from "react-router-dom";

const ImageCarousel = () => {
  return (
    <section className="row my-5">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <div
          id="mycarousel"
          className="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>

          {/* Carousel Items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="images/pizza11.jpg" alt="Pizza 1" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>Deliciously Baked</h5>
                <p>Fresh from the oven, just for you!</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="images/pizza12.jpg" alt="Pizza 2" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>Perfect Crust</h5>
                <p>That golden-brown crunch in every bite.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="images/pizza13.jpg" alt="Pizza 3" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>Cheesy Goodness</h5>
                <p>Melted mozzarella dreams.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src="images/pizza14.jpg" alt="Pizza 4" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>Loaded with Toppings</h5>
                <p>Your favorite flavors on one slice.</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <Link to="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </Link>

          <Link to="#mycarousel" className="carousel-control-next" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </Link>
        </div>
      </div>
      <div className="col-md-1"></div>
    </section>
  );
};

export default ImageCarousel;
