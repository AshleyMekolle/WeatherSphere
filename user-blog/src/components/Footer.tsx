import React from 'react';
import { Github,LucideUserPen } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Weather Blog. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="Ashkey Mekolle's Github"><Github /></a>
          <a href="#" target="_blank" rel="Email"><LucideUserPen />mekolleashleyam@gmail.com</a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;