import React from 'react';
import '../CSS/NavBar.css';

function Navbar({ activeView, onNavigate }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">Электронный журнал отсутствия</h1>
                <div className="navbar-buttons">
                    <button
                        className={`navbar-btn ${activeView === 'form' ? 'active' : ''}`}
                        onClick={() => onNavigate('form')}
                    >
                        Записать отсутствие
                    </button>
                    <button
                        className={`navbar-btn ${activeView === 'events' ? 'active' : ''}`}
                        onClick={() => onNavigate('events')}
                    >
                        Посмотреть все мои отсутствия
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;