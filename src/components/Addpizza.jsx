import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addpizza = () => {
  const [pizza_name, setPizzaName] = useState("");
  const [pizza_description, setPizzaDescription] = useState("");
  const [pizza_cost, setPizzaCost] = useState("");
  const [pizza_photo, setPizzaPhoto] = useState(null);
  const [category, setCategory] = useState("");  // NEW STATE
  const [photoPreview, setPhotoPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const showToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  const resetForm = () => {
    setPizzaName("");
    setPizzaDescription("");
    setPizzaCost("");
    setPizzaPhoto(null);
    setCategory("");  // RESET CATEGORY
    setPhotoPreview("");
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPizzaPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!pizza_name || !pizza_description || !pizza_cost || !pizza_photo || !category) {
      showErrorToast("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("pizza_name", pizza_name);
    data.append("pizza_description", pizza_description);
    data.append("pizza_cost", pizza_cost);
    data.append("pizza_photo", pizza_photo);
    data.append("category", category); // ADD CATEGORY TO FORM DATA

    try {
      const response = await axios.post(
        "https://paulamaina.pythonanywhere.com/api/addpizza",
        data
      );

      setLoading(false);
      showToast(response.data.Message);
      resetForm();

    } catch (err) {
      setLoading(false);
      setError("Failed to add pizza. Please try again.");
      showErrorToast("An error occurred while adding the pizza.");
    }
  };

  return (
    <div className="row justify-content-center mt-5 mb-5">
      <div className="col-lg-8 col-md-10 mx-auto">
        <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "900px", margin: "auto" }}>
          <h3 className="text-center text-primary mb-4">🍕 Add a New Pizza</h3>

          {loading && (
            <div className="text-center mb-3">
              <div className="spinner-border text-primary" role="status" />
              <p className="text-muted">Uploading pizza details...</p>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-group mb-3">
              <label className="form-label">Pizza Name</label>
              <input
                type="text"
                className={`form-control ${!pizza_name && error ? 'is-invalid' : ''}`}
                value={pizza_name}
                onChange={(e) => setPizzaName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">
                Description <small className="text-muted">({pizza_description.length}/500)</small>
              </label>
              <textarea
                className={`form-control ${!pizza_description && error ? 'is-invalid' : ''}`}
                maxLength="200"
                value={pizza_description}
                onChange={(e) => setPizzaDescription(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Cost (KES)</label>
              <input
                type="number"
                className={`form-control ${!pizza_cost && error ? 'is-invalid' : ''}`}
                value={pizza_cost}
                onChange={(e) => setPizzaCost(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Pizza Category</label>
              <select
                className={`form-select ${!category && error ? 'is-invalid' : ''}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Adult">Adult</option>
                <option value="Children">Children</option>
                <option value="Healthy">Healthy</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Pizza Image</label>
              <input
                type="file"
                className={`form-control ${!pizza_photo && error ? 'is-invalid' : ''}`}
                accept="image/*"
                onChange={handleFileChange}
              />
              {photoPreview && (
                <div className="mt-3 text-center">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success w-50 me-2"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Pizza"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary w-50"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Addpizza;
