import img from "../assets/Logo.png";
import {FaSearch,FaUser,FaShoppingCart} from "react-icons/fa";
import "./Navbar.css"

function Navbar(){

    return(
        
        <div className="navbar">
            <div className="logo">
                <img src={img} alt="" />
            </div>
            <div className="searchbar">
                <input type="search" placeholder="pizzaa...!" />
                <button><FaSearch/></button>
            </div>
            <div className="links">
                <span>Home</span>
                <span>Menu</span>
                <span>About</span>
                <span>Services</span>
            </div>
            <div className="cp">        
               <FaUser className="icon"/>
                <FaShoppingCart className="icon"/>
            </div>
            

        </div>
    )
}

export default Navbar;