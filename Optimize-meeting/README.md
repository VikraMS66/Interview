# React + Vite

## Steps to run
- download the code or pull
- change directory to "Optimize-meeting" folder and run "npm install"
- To run use "npm run dev"

## About
- Its a front end only solution to problem statement:
- ---------------------------------------------------------
"Effective utilization of conference rooms to minimize the maintenance cost.
 
Assume there is a conf room A has meeting M1 blocked from 9AM to 12 PM, conf room B has meeting M2 blocked from 3 PM to 5 PM. Clicking on "Optimize" should re-arrange the meetings ( with no conflicts ) by utilizing the conf rooms to maximum. considering above case it would be M2 moved to conf A, leaving the conf B whole day free. 
 
Consider 5 conf rooms ( A to E ) and around 12 meetings (M1to M12) scheduled as sample data."
--------------------------------------------------------------------------------------------------
- As the data base and back end is not their, I have assumed 5 rooms,
- It consist of "MeetingForm" component for scheduling the meeting and "Meeting" component its a dummy conmponent to show meeting details.
- "ConferenceRoom" comoponent shows Rooms and meeting scheduled to that room.
- "App" componets cotains all logic for optimizing rooms and meetings.
