const apiUrl = 'http://localhost:5000'; // Your backend API URL

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showCourseListPage();
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchCourses() {
    try {
        const response = await fetch(`${apiUrl}/api/courses`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.ok) {
            const courses = await response.json();
            const courseList = document.getElementById('course-list');
            courseList.innerHTML = '';

            courses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = course.title;
                courseList.appendChild(li);
            });
        } else {
            console.error('Failed to fetch courses');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createCourse() {
    const title = document.getElementById('course-title').value;
    const description = document.getElementById('course-description').value;

    try {
        const response = await fetch(`${apiUrl}/api/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            alert('Course created successfully');
            showCourseListPage();
        } else {
            alert('Failed to create course');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showLoginPage() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('course-list-page').style.display = 'none';
    document.getElementById('create-course-page').style.display = 'none';
}

function showCourseListPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('course-list-page').style.display = 'block';
    document.getElementById('create-course-page').style.display = 'none';
    fetchCourses();
}

function showCreateCoursePage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('course-list-page').style.display = 'none';
    document.getElementById('create-course-page').style.display = 'block';
}

// Initial display
showLoginPage();
