// Check if the user is authenticated
const teacherId = localStorage.getItem('teacherId');
const loginContainer = document.getElementById('loginContainer');
const teacherPortal = document.getElementById('teacherPortal');

// If teacherId exists in localStorage, show the portal
if (teacherId) {
    loginContainer.style.display = 'none';
    teacherPortal.style.display = 'block';
    loadTeacherData(teacherId);
}

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const teacherId = document.getElementById('teacherId').value;
    const password = document.getElementById('password').value;

    // Dummy authentication for demonstration
    // Replace with real authentication logic
    if (teacherId === '12345' && password === 'password') {
        localStorage.setItem('teacherId', teacherId);
        loginContainer.style.display = 'none';
        teacherPortal.style.display = 'block';
        loadTeacherData(teacherId);
    } else {
        document.getElementById('error-message').textContent = 'Invalid Teacher ID or Password';
    }
});

// Load Teacher Data
function loadTeacherData(teacherId) {
    const apiBaseUrl = 'https://api.greatvalueacademy.com';

    // Fetch Upcoming Classes
    fetch(`${apiBaseUrl}/teacher/${teacherId}/classes`)
        .then(response => response.json())
        .then(data => {
            const classList = document.getElementById('class-list');
            classList.innerHTML = ''; // Clear previous data
            data.classes.forEach(cls => {
                const listItem = document.createElement('li');
                listItem.textContent = `${cls.name} - ${cls.time}`;
                classList.appendChild(listItem);
            });
        });

    // Fetch Notifications
    fetch(`${apiBaseUrl}/teacher/${teacherId}/notifications`)
        .then(response => response.json())
        .then(data => {
            const notificationList = document.getElementById('notification-list');
            notificationList.innerHTML = ''; // Clear previous data
            data.notifications.forEach(notification => {
                const listItem = document.createElement('li');
                listItem.textContent = notification;
                notificationList.appendChild(listItem);
            });
        });

    // Fetch My Classes
    fetch(`${apiBaseUrl}/teacher/${teacherId}/my-classes`)
        .then(response => response.json())
        .then(data => {
            const myClasses = document.getElementById('my-classes');
            myClasses.innerHTML = ''; // Clear previous data
            data.myClasses.forEach(cls => {
                const listItem = document.createElement('li');
                listItem.textContent = `${cls.name} - ${cls.time}`;
                myClasses.appendChild(listItem);
            });
        });

    // Fetch Attendance Records
    fetch(`${apiBaseUrl}/teacher/${teacherId}/attendance`)
        .then(response => response.json())
        .then(data => {
            const attendanceRecords = document.getElementById('attendance-records');
            attendanceRecords.innerHTML = ''; // Clear previous data
            data.records.forEach(record => {
                const listItem = document.createElement('li');
                listItem.textContent = `${record.date} - ${record.studentName} - ${record.status}`;
                attendanceRecords.appendChild(listItem);
            });
        });

    // Fetch Inbox Messages
    fetch(`${apiBaseUrl}/teacher/${teacherId}/messages`)
        .then(response => response.json())
        .then(data => {
            const inbox = document.getElementById('inbox');
            inbox.innerHTML = ''; // Clear previous data
            data.messages.forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = `${message.sender}: ${message.content}`;
                inbox.appendChild(listItem);
            });
        });

    // Fetch Resources
    fetch(`${apiBaseUrl}/teacher/${teacherId}/resources`)
        .then(response => response.json())
        .then(data => {
            const resourceList = document.getElementById('resource-list');
            resourceList.innerHTML = ''; // Clear previous data
            data.resources.forEach(resource => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${resource.link}">${resource.title}</a>`;
                resourceList.appendChild(listItem);
            });
        });

    // Fetch Profile Data
    fetch(`${apiBaseUrl}/teacher/${teacherId}/profile`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('profile-name').value = data.name;
            document.getElementById('profile-email').value = data.email;
        });
}

// Add Class Form Submission
document.getElementById('add-class-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const className = document.getElementById('class-name').value;
    const classTime = document.getElementById('class-time').value;

    fetch(`${apiBaseUrl}/teacher/${teacherId}/add-class`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: className, time: classTime }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Class added successfully!');
            loadTeacherData(teacherId);
        } else {
            alert('Error adding class.');
        }
    });
});

// Mark Attendance Form Submission
document.getElementById('mark-attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const classSelect = document.getElementById('class-select').value;
    const studentName = document.getElementById('student-name').value;

    fetch(`${apiBaseUrl}/teacher/${teacherId}/mark-attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classId: classSelect, studentName }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Attendance marked successfully!');
            loadTeacherData(teacherId);
        } else {
            alert('Error marking attendance.');
        }
    });
});

// Send Message Form Submission
document.getElementById('send-message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const messageContent = document.getElementById('message-content').value;

    fetch(`${apiBaseUrl}/teacher/${teacherId}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, content: messageContent }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message sent successfully!');
            loadTeacherData(teacherId);
        } else {
            alert('Error sending message.');
        }
    });
});

// Upload Resource Form Submission
document.getElementById('upload-resource-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const resourceTitle = document.getElementById('resource-title').value;
    const resourceFile = document.getElementById('resource-file').files[0];

    const formData = new FormData();
    formData.append('title', resourceTitle);
    formData.append('file', resourceFile);

    fetch(`${apiBaseUrl}/teacher/${teacherId}/upload-resource`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Resource uploaded successfully!');
            loadTeacherData(teacherId);
        } else {
            alert('Error uploading resource.');
        }
    });
});

// Update Profile Form Submission
document.getElementById('update-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;

    fetch(`${apiBaseUrl}/teacher/${teacherId}/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
        } else {
            alert('Error updating profile.');
        }
    });
});
