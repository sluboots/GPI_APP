import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import DateTimeForm from './Components/DateTimeForm'; // ваша форма
import AllEventsView from './Components/AllEventsView'; // компонент просмотра событий
import './App.css';

function App() {
    const [activeView, setActiveView] = useState('form');
    const [events, setEvents] = useState([
        {
            id: 1,
            category: 'Производственные',
            dateTime: '20 ноября 2025, 14:30',
            reason: null
        },
        {
            id: 2,
            category: 'Непроизводственные',
            dateTime: '21 ноября 2025, 10:00',
            reason: 'Поликлиника'
        }
    ]);

    const handleNavigate = (view) => {
        setActiveView(view);
    };

    const addEvent = (newEvent) => {
        setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    };

    return (
        <div className="app">
            <Navbar activeView={activeView} onNavigate={handleNavigate} />
            <main className="main-content">
                {activeView === 'form' ? (
                    <DateTimeForm onEventSubmit={addEvent} />
                ) : (
                    <AllEventsView events={events} />
                )}
            </main>
        </div>
    );
}

export default App;