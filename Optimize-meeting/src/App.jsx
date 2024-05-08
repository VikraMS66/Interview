import React, { useState } from 'react';
import ConferenceRoom from './ConferenceRoom';
import Meeting from './Meeting';
import MeetingForm from './MeetingForm';

const App = () => {
  const [meetings, setMeetings] = useState([
    // Sample meeting data
    { id: 1, title: 'M1', startTime: '09:00', endTime: '12:00', roomId: null, isOptimized: false },
    { id: 2, title: 'M2', startTime: '12:00', endTime: '15:00', roomId: null, isOptimized: false },
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
    const updatedMeetings = JSON.parse(JSON.stringify(meetings)); // Deep clone meetings
    const updatedConferenceRooms = JSON.parse(JSON.stringify(conferenceRooms)); // Deep clone conferenceRooms

    // 1. Sort meetings by start time for efficient scheduling
    updatedMeetings.sort((a, b) => {
      const startTimeA = new Date(`2024-05-08T${a.startTime}`);
      const startTimeB = new Date(`2024-05-08T${b.startTime}`);
      return startTimeA - startTimeB;
    });

    // 2. Iterate through meetings, assigning rooms according to availability
    for (const meeting of updatedMeetings) {
      let assignedRoom = null; // Track potential new assignment

      // Check for existing rooms with available time slots
      for (const room of updatedConferenceRooms) {
        if (isRoomAvailable(room.meetings, meeting) && !meeting.roomId) { // Check if meeting is unassigned
          assignedRoom = room.id;
          room.meetings.push(meeting);
          break; // No need to check further rooms
        }
      }

      // Re-assign meeting to an available room only if currently unassigned
      if (!assignedRoom && !meeting.roomId) {
        for (const room of updatedConferenceRooms) {
          if (isRoomAvailable(room.meetings, meeting)) {
            assignedRoom = room.id;
            room.meetings.push(meeting);
            break;
          }
        }
      }

      // Update room assignment only if changed
      if (assignedRoom && !meeting.roomId) { // Check if there's a new assignment
        meeting.roomId = assignedRoom;
      }

      // meeting.roomId = assignedRoom;
    }

    // Update state with optimized data
    setMeetings(updatedMeetings);
    setConferenceRooms(updatedConferenceRooms);
  };

  // Function to check if a room is available for a meeting
  const isRoomAvailable = (roomMeetings, meeting) => {
    const meetingStartTime = new Date(`2024-05-08T${meeting.startTime}`);
    const meetingEndTime = new Date(`2024-05-08T${meeting.endTime}`);

    for (const roomMeeting of roomMeetings) {
      const roomMeetingStartTime = new Date(`2024-05-08T${roomMeeting.startTime}`);
      const roomMeetingEndTime = new Date(`2024-05-08T${roomMeeting.endTime}`);

      // Check for time conflicts
      if (
        (meetingStartTime < roomMeetingEndTime && meetingStartTime >= roomMeetingStartTime) ||
        (meetingEndTime > roomMeetingStartTime && meetingEndTime <= roomMeetingEndTime) ||
        (meetingStartTime <= roomMeetingStartTime && meetingEndTime >= roomMeetingEndTime)
      ) {
        return false; // Conflict found, room not available
      }
    }

    return true; // No conflicts, room is available
  };

  const handleScheduleMeeting = (newMeeting) => {
    const updatedMeetings = [...meetings, newMeeting];

    // Immediately attempt to assign a room to the new meeting
    let assignedRoom = null;
    for (const room of conferenceRooms) {
      if (isRoomAvailable(room.meetings, newMeeting)) {
        assignedRoom = room.id;
        room.meetings.push(newMeeting);
        break;
      }
    }

    // If no existing room is available, create a new room
    if (!assignedRoom) {
      const newRoomId = String.fromCharCode(conferenceRooms.length + 65); // Generate unique room ID
      setConferenceRooms([...conferenceRooms, { id: newRoomId, meetings: [newMeeting] }]);
    }

    newMeeting.roomId = assignedRoom; // Set the assigned room ID on the new meeting object

    setMeetings(updatedMeetings);
  };
  return (
    <div>
      <div>
        <h2>Schedule Meeting</h2>
        <MeetingForm onSubmit={handleScheduleMeeting} />
        {/* Rest of the code... */}
      </div>
      <h2>Meetings</h2>
      {meetings.map((meeting) => (
        <div key={meeting.id}>
          <Meeting key={meeting.id} {...meeting} />
        </div>

      ))}

      <h2>Conference Rooms</h2>
      {conferenceRooms.map((room) => (
        <div key={room.id}>
          <ConferenceRoom key={room.id} {...room} />
        </div>
      ))}

      <button onClick={handleOptimize}>Optimize</button>
    </div>
  );
};

export default App;