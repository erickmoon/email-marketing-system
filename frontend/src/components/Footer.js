import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Footer = () => {
    return (
        <footer>
            <div>
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
            <div>
                <ul>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms-of-service">Terms of Service</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
