import React, { useState } from 'react';
import ConferenceRoom from './ConferenceRoom';
import Meeting from './Meeting';
import MeetingForm from './MeetingForm';

export default function App() {
  const [meetings, setMeetings] = useState([
    // Sample meeting data
    { id: 1, title: 'M1', startTime: '09:00', endTime: '12:00', roomId: null },
    { id: 2, title: 'M2', startTime: '12:00', endTime: '15:00', roomId: null },
    // ... other meetings
  ]);
  const [conferenceRooms, setConferenceRooms] = useState([
    { id: 'A', meetings: [] },
    { id: 'B', meetings: [] },
    { id: 'C', meetings: [] },
    { id: 'D', meetings: [] },
    { id: 'E', meetings: [] },
  ]);

  const handleOptimize = () => {
    const updatedMeetings = JSON.parse(JSON.stringify(meetings));
    const updatedConferenceRooms = [
      { id: 'A', meetings: [] },
      { id: 'B', meetings: [] },
      { id: 'C', meetings: [] },
      { id: 'D', meetings: [] },
      { id: 'E', meetings: [] },
    ];

    // 1. Sort meetings by start time for efficient scheduling
    updatedMeetings.sort((a, b) => {
      const startTimeA = new Date(`2024-05-08T${a.startTime}`);
      const startTimeB = new Date(`2024-05-08T${b.startTime}`);
      return startTimeA - startTimeB;
    });

    for (const meeting of updatedMeetings) {
      let assignedRoom = null;

      // Check for existing rooms with available time slots
      for (const room of updatedConferenceRooms) {
        if (isRoomAvailable(room.meetings, meeting)) {
          // Check if room is available
          assignedRoom = room.id;
          room.meetings.push(meeting);
          break;
        }
      }

      // Re-assign meeting to an available room only if currently unassigned
      if (!assignedRoom) {
        for (const room of updatedConferenceRooms) {
          if (isRoomAvailable(room.meetings, meeting)) {
            assignedRoom = room.id;
            room.meetings.push(meeting);
            break;
          } else {
            createRoom();
            assignedRoom = createRoom();
          }
        }
      }

      if (assignedRoom && !meeting.roomId) {
        meeting.roomId = assignedRoom;
      }
    }

    setMeetings(updatedMeetings);
    setConferenceRooms(updatedConferenceRooms);
  };

  // Function to check if a room is available for a meeting
  const isRoomAvailable = (roomMeetings, meeting) => {
    const meetingStartTime = new Date(`2024-05-08T${meeting.startTime}`);
    const meetingEndTime = new Date(`2024-05-08T${meeting.endTime}`);

    for (const roomMeeting of roomMeetings) {
      const roomMeetingStartTime = new Date(
        `2024-05-08T${roomMeeting.startTime}`
      );
      const roomMeetingEndTime = new Date(`2024-05-08T${roomMeeting.endTime}`);

      // Check for time conflicts
      if (
        (meetingStartTime < roomMeetingEndTime &&
          meetingStartTime >= roomMeetingStartTime) ||
        (meetingEndTime > roomMeetingStartTime &&
          meetingEndTime <= roomMeetingEndTime) ||
        (meetingStartTime <= roomMeetingStartTime &&
          meetingEndTime >= roomMeetingEndTime)
      ) {
        return false; // Conflict found, room not available
      }
    }

    return true; // No conflicts, room is available
  };

  const handleScheduleMeeting = (newMeeting) => {
    const updatedMeetings = [...meetings, newMeeting];

    // // Immediately attempt to assign a room to the new meeting
    // let assignedRoom = null;
    // for (const room of conferenceRooms) {
    //   if (isRoomAvailable(room.meetings, newMeeting)) {
    //     assignedRoom = room.id;
    //     room.meetings.push(newMeeting);
    //     break;
    //   }
    // }

    // if (!assignedRoom) {
    //   assignedRoom = createRoom();
    // }

    // newMeeting.roomId = assignedRoom; // Set the assigned room ID on the new meeting object

    setMeetings(updatedMeetings);
  };

  function createRoom() {
    const newRoomId = String.fromCharCode(conferenceRooms.length + 65); // Generate unique room ID
    setConferenceRooms([
      ...conferenceRooms,
      { id: newRoomId, meetings: [newMeeting] },
    ]);
    return newRoomId;
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{ width: '40%', height: '50%', justifyContent: 'flex-start' }}
        >
          <h2>Schedule Meeting</h2>
          <MeetingForm onSubmit={handleScheduleMeeting} />
        </div>

        <div
          style={{ width: '40%', height: '50%', justifyContent: 'flex-end' }}
        >
          <h2>Meetings</h2>
          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <Meeting key={meeting.id} {...meeting} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleOptimize}>Optimize Meetings</button>
      <h2>Conference Rooms</h2>
      {conferenceRooms.map((room) => (
        <div key={room.id}>
          <ConferenceRoom key={room.id} {...room} />
        </div>
      ))}
    </div>
  );
}
