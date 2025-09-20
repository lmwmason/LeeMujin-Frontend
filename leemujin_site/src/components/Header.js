import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="site-title">
                LeeMujinsite
            </Link>
            <ThemeToggle />
        </header>
    );
};

export default Header;