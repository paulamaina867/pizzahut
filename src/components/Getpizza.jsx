import { useState, useEffect } from "react"; // for state management
import axios from "axios"; //For API Access
import { Link, useNavigate } from "react-router-dom"; // For link to other component
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const Getpizza = () => {

    // Initialize Hooks
    const [pizza, setPizza] = useState([]);  // Default to empty array instead of a string
    const [loading, setLoading] = useState(""); //For loading message
    const [error, setError] = useState(""); //error message hook

    const navigate = useNavigate();
    
    //Specify image location URL
    const img_url = "https://paulamaina.pythonanywhere.com/static/images/"
    
    const getpizza= async()=>{
        setLoading("Please wait, We are retrieving the products .."); // Set loading message when fetching starts
        try {
        const response = await axios.get("https://paulamaina.pythonanywhere.com/api/getpizza")
        setPizza(response.data)
        console.log(response.data)
        setLoading("")
        }
        catch(error){
            setLoading("")
            setError("There was an Error")    
        }
    }//end function

    // Call getproducts on Use Effect
    useEffect(() => {
       getpizza()
    }, []); // empty dependency array ensures this runs only once when the component mounts

     // Filtered products based on search
     const [search, setSearch] = useState("");

     const filtered_pizza = pizza.filter((item) =>
       item.pizza_name.toLowerCase().includes(search.toLowerCase()) ||
       item.pizza_description.toLowerCase().includes(search.toLowerCase()) 

    );
   
   

    return (
        
    <div className="row">
        <ImageCarousel/>

         <h3 className="mt-1 text-danger ">Available pizzas</h3>
         <div className="row justify-content-center mt-3 mb-3">
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search Pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
    </div>

        {/* Bind Error Messages */}
          {loading}
          {error}

        {/* Map over pizza and display them */}
        {filtered_pizza.map((pizza) => (
            <div className="col-md-3 justify-content-center mb-3">
                {/* Card with equal size */}
                <div className="card shadow card-margin">
                        <img 
                            className="pizza_img mt-4"
                            src={img_url + pizza.pizza_photo} 
                            alt="missing"
                        />
                        {/* {pizza.pizza_photo} */}
                  
                    <div className="card-body">
                        <h5 className="mt-2">{pizza.pizza_name}</h5>
                        <p className="text-muted">{pizza.pizza_description.slice(0, 65)}</p>
                        <b className="text-warning">{pizza.pizza_cost} KES</b>  <br />
                        <button className="btn btn-success" onClick={()=> navigate("/makepayment", {state : {pizza}})}>Buy Now</button>
                    </div>
                </div>
            </div>
        ))}

        <Footer/>
        
    </div>
    );

}

export default Getpizza;