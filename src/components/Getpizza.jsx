import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const Getpizza = () => {
  const [pizza, setPizza] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();
  const img_url = "https://paulamaina.pythonanywhere.com/static/images/";

  // Function to get pizzas from API
  const getpizza = async () => {
    setLoading("🍕 Please wait, we are retrieving the pizzas...");
    try {
      const response = await axios.get("https://paulamaina.pythonanywhere.com/api/getpizza");
      setPizza(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("❌ There was an error retrieving the pizzas.");
    }
  };

  useEffect(() => {
    getpizza();
  }, []);

  // Filter pizzas based on search and category
  const filtered_pizza = pizza.filter((item) => {
    const searchMatch = item.pizza_name.toLowerCase().includes(search.toLowerCase()) ||
                         item.pizza_description.toLowerCase().includes(search.toLowerCase());

    const categoryMatch = category === "All" || item.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="container py-4">
      <ImageCarousel />

      {/* Fancy Title Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold display-5 animated-heading text-warning">
          🍕 Our Irresistible Pizza Collection 🍕
        </h2>
       <p className="text-white">
  Handcrafted flavors. Baked to perfection. Served with love ❤️‍🔥
</p>


        {/* Search Input */}
        <input
          className="form-control w-50 mx-auto mt-3"
          type="search"
          placeholder="🔍 Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       {/* Category Filter */}
<div className="mt-3">
  <select
    className="form-select w-50 mx-auto"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="All">🍕 All Pizzas</option>
    <option value="Adult">👨‍🦱 Adult Pizzas</option>
    <option value="Children">👧 Children Pizzas</option>
    <option value="Healthy">🥗 Healthy Pizzas</option>
  </select>
</div>

      </div>

      {/* Feedback Messages */}
      {loading && <div className="alert alert-info text-center">{loading}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Pizza Cards */}
      <div className="row">
        {filtered_pizza.length > 0 ? (
          filtered_pizza.map((pizza, index) => (
            <div className="col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src={img_url + pizza.pizza_photo}
                  alt={pizza.pizza_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{pizza.pizza_name}</h5>
                  <p className="card-text text-muted">
                    {pizza.pizza_description.slice(0, 70)}...
                  </p>
                  <div className="mt-auto">
                    <p className="fw-bold text-warning mb-2">{pizza.pizza_cost} KES</p>
                    <button
                      className="btn btn-success w-100"
                      onClick={() =>
                        navigate("/mpesapayment", { state: { pizza } })
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="text-center text-muted">
              <p>No pizzas match your search 😢</p>
            </div>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Getpizza;
