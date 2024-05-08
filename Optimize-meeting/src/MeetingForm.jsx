import React, { useState } from 'react';

const MeetingForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, startTime, endTime });
        setTitle('');
        setStartTime('09:00');
        setEndTime('10:00');
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Meeting Title:
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Start Time:
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <br />
            <label>
                End Time:
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </label>
            <br />
            <button type="submit">Schedule Meeting</button>
        </form>
    );
};

export default MeetingForm;