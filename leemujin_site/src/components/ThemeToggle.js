import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle">
            <button onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
        </div>
    );
};

export default ThemeToggle;