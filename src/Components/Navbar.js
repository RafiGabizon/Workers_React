import '../Css/Navbar.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="separator">|</li>
          <li className="navbar-item">
            <Link to="/favourites">FAVOURITES</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
