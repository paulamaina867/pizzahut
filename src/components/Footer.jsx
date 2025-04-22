const Footer = () => {
    return (
    <div>
        <section className="row  mt-4 footer-background-color">
            <div className="col-md-4 text-left text-light">
                <h5 className="p-2 text-center text-info">About Us</h5>
                <p>Pizza Hut is a globally recognized restaurant chain specializing in pizzas, pasta, and other delicious sides. It was founded in 1958 in Wichita, Kansas, and has since grown to become one of the largest pizza chains in the world. Known for its iconic tagline, "No One OutPizzas the Hut," Pizza Hut offers a variety of crust options, toppings, and meal deals to suit different tastesy. </p>
                <p> In Nairobi, Kenya, Pizza Hut has several locations, including outlets at Village Market, Yaya Centre, and Mombasa Road. They provide delivery and carryout services, making it convenient for customers to enjoy their meals at home or on the go.
                If you're looking for more details about their menu or deals, you can explore their official website or check out their local store locator. 🍕✨</p>
                <br/>
            </div>
            <div className="col-md-4 text-light">
                <h5 className="p-2 text-center text-info">Reach Us Out</h5>
                <input className="form-control" type="email" placeholder="Enter your email"/>
                <br/>
                <textarea className="form-control" rows="7" placeholder="Leave a comment"></textarea>
                <br/>
                <input type="submit" value="Send Message" className="btn btn-primary"/>
            </div>
            <div className="col-md-4 ">
                <h4 className="text-center text-info">Connect With Us</h4>
                <br/>
                <a href="https://facebook.com">
                <img src="images/facebook.jpg" alt="" className="socialspictures"/>
                </a>
                <a href="https://instagram.com">
                <img src="images/insta.jpg" alt="" className="socialspictures"/>
                </a>
                <p className="text-dark"> We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, we’re here for you. Reach out to us via.😊
                </p>
            </div>
        </section>
        <footer className="text-white text-center p-2 mt-2 bootom-footer">
                <h5>Developed by pauline maina &copy; 2025.All rights reserved</h5>
        </footer>
    </div>
    );
    }
     
   
    export default Footer;