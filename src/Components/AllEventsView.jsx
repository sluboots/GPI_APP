import React, { useState } from 'react';
import '../CSS/AllEventsView.css';

function AllEventsView({ events = [] }) {
    // Состояние для хранения времени возврата по ID события
    const [returnTimes, setReturnTimes] = useState({});

    // Функция для показа поля ввода времени
    const handleAddReturnTime = (eventId) => {
        setReturnTimes(prev => ({
            ...prev,
            [eventId]: prev[eventId] || '' // Инициализируем пустой строкой
        }));
    };

    // Функция для обновления времени возврата
    const handleReturnTimeChange = (eventId, value) => {
        setReturnTimes(prev => ({
            ...prev,
            [eventId]: value
        }));
    };

    return (
        <div className="events-container">
            <h2>Все мои отсутствия</h2>

            {events.length === 0 ? (
                <div className="no-events">
                    <p>У вас пока нет зарегистрированных отсутствий</p>
                </div>
            ) : (
                <div className="events-list">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-meta">
                <span className={`event-badge ${event.category === 'Производственные' ? 'productive' : 'non-productive'}`}>
                  {event.category}
                </span>
                                <span className="event-date">{event.dateTime}</span>
                            </div>

                            {event.reason && (
                                <div className="event-reason">
                                    Причина: {event.reason}
                                </div>
                            )}

                            <div className="event-time">
                                🕒 Время отсутствия
                            </div>

                            {/* === БЛОК С КНОПКОЙ И ПОЛЕМ ВВОДА === */}
                            <div className="return-time-section">
                                {!returnTimes[event.id] && returnTimes[event.id] !== '' ? (
                                    <button
                                        className="add-return-time-btn"
                                        onClick={() => handleAddReturnTime(event.id)}
                                    >
                                        + Добавить время возврата
                                    </button>
                                ) : (
                                    <div className="return-time-input-wrapper">
                                        <label className="return-time-label">Время возврата:</label>
                                        <input
                                            type="time"
                                            value={returnTimes[event.id] || ''}
                                            onChange={(e) => handleReturnTimeChange(event.id, e.target.value)}
                                            className="return-time-input"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllEventsView;