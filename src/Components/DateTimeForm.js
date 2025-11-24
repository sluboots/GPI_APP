import React, { useState, useRef, useEffect } from 'react';
import '../CSS/DateTimeForm.css';

function DateTimeForm({ onEventSubmit }) {
    const [dateTime, setDateTime] = useState({
        date: '',
        time: ''
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    const [reasonType, setReasonType] = useState('');
    const [result, setResult] = useState(null);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showReasonDropdown, setShowReasonDropdown] = useState(false);

    const categoryDropdownRef = useRef(null);
    const reasonDropdownRef = useRef(null);

    // Только две категории
    const categories = ['Производственные', 'Непроизводственные'];

    // Причины для непроизводственных — только три пункта
    const nonProductiveReasons = [
        'Поликлиника',
        'Банк',
        'Семейные обстоятельства'
    ];

    // Закрываем выпадающие списки при клике вне них
    useEffect(() => {
        function handleClickOutside(event) {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setShowCategoryDropdown(false);
            }
            if (reasonDropdownRef.current && !reasonDropdownRef.current.contains(event.target)) {
                setShowReasonDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDateTime(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setReasonType(''); // Сбрасываем причину при смене категории
        setShowCategoryDropdown(false);
    };

    const handleReasonSelect = (reason) => {
        setReasonType(reason);
        setShowReasonDropdown(false);
    };

    const formatDateTime = (dateStr, timeStr) => {
        if (!dateStr || !timeStr) return '';

        const date = new Date(`${dateStr}T${timeStr}`);
        if (isNaN(date)) return 'Неверный формат даты';

        const day = date.getDate();
        const monthNames = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const time = timeStr;

        return `${day} ${month} ${year}, ${time}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка обязательных полей
        if (!dateTime.date) {
            alert('Пожалуйста, выберите дату');
            return;
        }
        if (!dateTime.time) {
            alert('Пожалуйста, выберите время');
            return;
        }
        if (!selectedCategory) {
            alert('Пожалуйста, выберите категорию');
            return;
        }
        if (selectedCategory === 'Непроизводственные' && !reasonType) {
            alert('Пожалуйста, выберите причину для непроизводственного события');
            return;
        }

        const formattedResult = formatDateTime(dateTime.date, dateTime.time);
        const newEvent = {
            dateTime: formattedResult,
            category: selectedCategory,
            reason: selectedCategory === 'Непроизводственные' ? reasonType : null
        };

        // Безопасно вызываем функцию передачи события
        if (typeof onEventSubmit === 'function') {
            onEventSubmit(newEvent);
        }

        setResult(newEvent);
        console.log('Форма отправлена:', newEvent);
    };

    const showReasonField = selectedCategory === 'Непроизводственные';

    return (
        <div className="form-container">
            <h2>Ввод отсутствия</h2>
            <form onSubmit={handleSubmit} className="datetime-form">
                <div className="form-group">
                    <label htmlFor="date">Дата *</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={dateTime.date}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Время *</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={dateTime.time}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Категория *</label>
                    <div className="autocomplete-container" ref={categoryDropdownRef}>
                        <input
                            type="text"
                            value={selectedCategory}
                            onChange={() => {}}
                            onClick={() => setShowCategoryDropdown(true)}
                            placeholder="Выберите категорию..."
                            className="form-input autocomplete-input"
                            readOnly
                        />

                        {showCategoryDropdown && (
                            <div className="autocomplete-dropdown">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="autocomplete-option"
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Дополнительное поле — только для непроизводственных */}
                {showReasonField && (
                    <div className="form-group">
                        <label>Причина отсутствия *</label>
                        <div className="autocomplete-container" ref={reasonDropdownRef}>
                            <input
                                type="text"
                                value={reasonType}
                                onChange={() => {}}
                                onClick={() => setShowReasonDropdown(true)}
                                placeholder="Выберите причину..."
                                className="form-input autocomplete-input"
                                readOnly
                            />

                            {showReasonDropdown && (
                                <div className="autocomplete-dropdown">
                                    {nonProductiveReasons.map((reason, index) => (
                                        <div
                                            key={index}
                                            className="autocomplete-option"
                                            onClick={() => handleReasonSelect(reason)}
                                        >
                                            {reason}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <button type="submit" className="submit-btn">
                    Подтвердить
                </button>
            </form>

            {result && (
                <div className="result-display">
                    <h3>Запланированное событие:</h3>
                    <p><strong>Дата и время:</strong> {result.dateTime}</p>
                    <p><strong>Категория:</strong> {result.category}</p>

                    {result.reason && (
                        <p className="event-reason">
                            <strong>Причина:</strong> {result.reason}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DateTimeForm;