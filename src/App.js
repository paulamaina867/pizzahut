import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Getpizza from './components/Getpizza';
import"bootstrap/dist/js/bootstrap.min.js";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Addpizza from './components/Addpizza';
import Aboutus from './components/Aboutus';
import Notfound from './components/Notfound';


function App() {
  return (
    
        <Router>
          <div className="App backstyling">
            <header className="App-header">
              <h1>Pizza Hut</h1>
            </header>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Getpizza/>}/>
              <Route path='/signin' element={<Signin/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/addpizza' element={<Addpizza/>}/>
              <Route path='/aboutus' element={<Aboutus/>}/>
              <Route path='/*' element={<Notfound/>}/>
            </Routes>
          </div>
        </Router>
  );
}

export default App;
