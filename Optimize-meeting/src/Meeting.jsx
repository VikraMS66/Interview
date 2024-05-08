import React from 'react';

const Meeting = ({ id, title, startTime, endTime, roomId }) => {
    return (
        <div>
            <p>Meeting: {title}</p>
            <p>Time: {startTime} - {endTime}</p>
            <p>Room: {roomId ? `Room ${roomId}` : 'Unassigned'}</p>
        </div>
    );
};

export default Meeting;