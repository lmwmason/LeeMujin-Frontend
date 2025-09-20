import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './styles/App.css';
import './styles/themes.css';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;