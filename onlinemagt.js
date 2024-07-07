document.addEventListener('DOMContentLoaded', function() {
  // Sample data for demonstration purposes
  const students = [
      { id: 1, name: 'John Doe', grade: 'A', attendance: 'Present' },
      { id: 2, name: 'Jane Smith', grade: 'B', attendance: 'Absent' }
  ];

  const announcements = [
      { id: 1, message: 'School will be closed on Friday.' },
      { id: 2, message: 'Parent-teacher meetings next week.' }
  ];

  // Functions to display data
  function displayStudents() {
      const studentSection = document.querySelector('#students');
      studentSection.innerHTML = '<h2>Student Information</h2><ul>' +
          students.map(student => `<li>${student.name} - Grade: ${student.grade}, Attendance: ${student.attendance}</li>`).join('') +
          '</ul>';
  }

  function displayAttendance() {
      const attendanceSection = document.querySelector('#attendance');
      attendanceSection.innerHTML = '<h2>Attendance</h2><ul>' +
          students.map(student => `<li>${student.name} - Attendance: ${student.attendance}</li>`).join('') +
          '</ul>';
  }

  function displayGrades() {
      const gradesSection = document.querySelector('#grades');
      gradesSection.innerHTML = '<h2>Grades</h2><ul>' +
          students.map(student => `<li>${student.name} - Grade: ${student.grade}</li>`).join('') +
          '</ul>';
  }

  function displayTimetable() {
      const timetableSection = document.querySelector('#timetable');
      timetableSection.innerHTML = '<h2>Timetable</h2><p>Timetable information will be displayed here.</p>';
  }

  function displayAnnouncements() {
      const announcementsSection = document.querySelector('#announcements');
      announcementsSection.innerHTML = '<h2>Announcements</h2><ul>' +
          announcements.map(announcement => `<li>${announcement.message}</li>`).join('') +
          '</ul>';
  }

  // Display initial data
  displayStudents();
  displayAttendance();
  displayGrades();
  displayTimetable();
  displayAnnouncements();
});
