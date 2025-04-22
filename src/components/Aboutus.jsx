import React from 'react'
import Footer from './Footer';

const Aboutus = () => {
  return (
    <div className="row justify-content-center">

        <h1 className='display-4 text-info'>why people like us</h1>

        <div className="col-md-6">
            <div className="card shadow p-4 m-3">
                <img src="images/pixxa hut.jpg" alt="our location" />
            </div>
        </div>
        <div className="col-md-6 justify-content-start">
            <h2 className='text-success'></h2>
            
                <p> Pizza Hut has earned its place in people's hearts for several reasons:
- Signature Pan Pizza: Their pan pizza is iconic, with a crispy crust and generous toppings that many find irresistible.
- Stuffed Crust Innovation: Pizza Hut introduced stuffed crust pizza, which became a game-changer for pizza lovers.
- Nostalgia: For many, Pizza Hut evokes fond memories of childhood outings and celebrations.
- Variety: They offer a wide range of pizzas, sides, and desserts, catering to diverse tastes.
- Limited-Time Offers: Pizza Hut frequently introduces exciting new menu items, keeping customers intrigued. 😊😊😊😊😊</p>

 

               

            <h3 className='text-primary'>Over 30+ services, over 1200+ customers served...</h3>

            
        </div>
        <Footer/>
    </div>
  )
}

export default Aboutus;