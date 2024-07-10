// Dummy API URLs
const apiBaseUrl = 'https://api.greatvalueacademy.com';
const studentId = '12345'; // This should be dynamically set based on the logged-in user

// Fetch Student Profile
fetch(`${apiBaseUrl}/student/${studentId}/profile`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('profile-pic').src = data.profilePic;
        document.getElementById('student-name').textContent = `Name: ${data.name}`;
        document.getElementById('student-grade').textContent = `Grade: ${data.grade}`;
        document.getElementById('student-email').textContent = `Email: ${data.email}`;
    });

// Fetch Academic Performance
fetch(`${apiBaseUrl}/student/${studentId}/performance`)
    .then(response => response.json())
    .then(data => {
        const performanceTable = document.querySelector('#performance-table tbody');
        data.performance.forEach(subject => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${subject.subject}</td><td>${subject.grade}</td><td>${subject.remarks}</td>`;
            performanceTable.appendChild(row);
        });
    });

// Fetch Class Schedule
fetch(`${apiBaseUrl}/student/${studentId}/schedule`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('class-schedule-content').innerHTML = data.schedule.map(item => `<p>${item}</p>`).join('');
    });

// Fetch Assignments
fetch(`${apiBaseUrl}/student/${studentId}/assignments`)
    .then(response => response.json())
    .then(data => {
        const assignmentsList = document.getElementById('assignments-list');
        data.assignments.forEach(assignment => {
            const listItem = document.createElement('li');
            listItem.textContent = `${assignment.title} - Due: ${assignment.dueDate}`;
            assignmentsList.appendChild(listItem);
        });
    });

// Fetch Attendance
fetch(`${apiBaseUrl}/student/${studentId}/attendance`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('attendance-percentage').textContent = `Attendance Percentage: ${data.percentage}%`;
        const attendanceTable = document.querySelector('#attendance-table tbody');
        data.attendance.forEach(day => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${day.date}</td><td>${day.status}</td>`;
            attendanceTable.appendChild(row);
        });
    });

// Fetch Extracurricular Activities
fetch(`${apiBaseUrl}/student/${studentId}/activities`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('extracurricular-activities-content').textContent = data.activities.join(', ');
    });

// Fetch Notices and Announcements
fetch(`${apiBaseUrl}/student/${studentId}/notices`)
    .then(response => response.json())
    .then(data => {
        const noticesList = document.getElementById('notices-list');
        data.notices.forEach(notice => {
            const listItem = document.createElement('li');
            listItem.textContent = notice;
            noticesList.appendChild(listItem);
        });
    });

// Fetch Resources
fetch(`${apiBaseUrl}/student/${studentId}/resources`)
    .then(response => response.json())
    .then(data => {
        const resourcesList = document.getElementById('resources-list');
        data.resources.forEach(resource => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${resource.link}">${resource.title}</a>`;
            resourcesList.appendChild(listItem);
        });
    });

// Fetch Contact Teachers
fetch(`${apiBaseUrl}/student/${studentId}/teachers`)
    .then(response => response.json())
    .then(data => {
        const teachersContact = document.getElementById('teachers-contact');
        data.teachers.forEach(teacher => {
            const contactInfo = document.createElement('p');
            contactInfo.innerHTML = `${teacher.subject} Teacher: <a href="mailto:${teacher.email}">${teacher.name}</a>`;
            teachersContact.appendChild(contactInfo);
        });
    });

// Edit Profile Button Functionality
document.getElementById('editProfileBtn').addEventListener('click', function() {
    alert('Edit Profile functionality coming soon!');
});

// Dummy Calendar Functionality
document.getElementById('calendar').innerHTML = 'Calendar will be here';

// Chat Functionality
document.getElementById('sendMessageBtn').addEventListener('click', function() {
    const chatInput = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');

    if (chatInput.value.trim() !== '') {
        const message = document.createElement('div');
        message.classList.add('chat-message');
        message.textContent = chatInput.value;
        chatBox.appendChild(message);
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});
