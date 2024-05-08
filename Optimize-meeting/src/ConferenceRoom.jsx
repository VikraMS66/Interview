import React from 'react';
import Meeting from './Meeting';

const ConferenceRoom = ({ id, meetings }) => {
    const filteredMeetings = meetings.filter((meeting) => meeting.roomId === id);

    return (
        <div key={id}>
            <h3>Conference Room {id}</h3>
            {filteredMeetings.map((meeting) => (
                <div key={meeting.id}>
                    <Meeting key={meeting.id} {...meeting} />
                </div>
            ))}
        </div>
    );
};


export default ConferenceRoom;