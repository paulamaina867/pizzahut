import axios from 'axios';
import  { useState } from 'react';
import Footer from './Footer';


const Addpizza = () => {
  const [pizza_name, setPizzaName] = useState("");
  const [pizza_description, setPizzaDescription] = useState("");
  const [pizza_cost, setPizzaCost] = useState("");
  const [pizza_photo, setPizzaPhoto] = useState("");

     // Hooks for information messages
     const [loading, setLoading] = useState("");
     const [message, setMessage] = useState("");
     const [error, setError] = useState("");
   
     //Submit Function
     const submit = async (e) => {
       //Prevent default actions
       e.preventDefault();
       //update loading hook to show progress
       setLoading("Pleaser wait ... ");
   
       //add all updated hooks to data variable
       const data = new FormData();
       data.append("pizza_name", pizza_name);
       data.append("pizza_description", pizza_description);
       data.append("pizza_cost", pizza_cost);
       data.append("pizza_photo", pizza_photo);
   
       //Post data to Backend API
       try {
         const response = await axios.post(
           "https://paulamaina.pythonanywhere.com/api/addpizza",
           data
         );
         //Set loding message to empty, after a successful POST to API
         setLoading("")
         //Update message hook to successfully Added to notify the user.
        //  setMessage("pizza Added successfully!");
        setMessage(response.data.Message)
       //   setMessage(response.data.success);
   
         // reset the input fields 
         setPizzaName("");
         setPizzaDescription("");
         setPizzaCost("");
         setPizzaPhoto("");
   
         //Catch Any server error, i.e internet issues , server errors
       } catch (error) {
         setError("Failed to add pizza. Please try again.");
       }
     };


  return (
    <div className="row justify-content-center mt-2 y">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          {loading}
          {message}
          {error}
          <h2 className='text-info'>Add A pizza</h2>
          <input type="text" className="form-control" placeholder="Enter the pizza Name" 
          value={pizza_name} onChange={(e) => setPizzaName(e.target.value)} />
          <br />
          {/* {pizza_name} */}
          <textarea placeholder="Enter some Description of the pizza..." className="form-control" value={pizza_description}
          onChange={(e) => setPizzaDescription(e.target.value)}></textarea> <br />
          {/* {pizza_description} */}
          <input type="number" placeholder="Enter the price of the pizza" className="form-control"
          onChange={(e) => setPizzaCost(e.target.value)} value={pizza_cost} />
          <br />
          {/* {pizza_cost} */}

          <input type="file" className="form-control"
          accept='image/*'
          onChange={(e) => setPizzaPhoto(e.target.files[0])}
          />
          <br />

          
          <button type="submit" className="btn btn-primary w-100">Add pizza</button>
        </form>
      </div>

      <Footer/>
    </div>
  )
}

export default Addpizza