import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Header = () => {
    return (
        <header>
            <div>
                <h1><Link to="/">Your Company Name</Link></h1> {/* Main link to home page */}
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
