const apiUrl = 'http://localhost:5000'; // Your backend API URL

async function fetchEvents() {
    try {
        const response = await fetch(`${apiUrl}/api/events`);
        if (response.ok) {
            const events = await response.json();
            const eventsList = document.getElementById('events-list');
            eventsList.innerHTML = '';

            events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = event.title;
                li.onclick = () => showEventDetails(event.id);
                eventsList.appendChild(li);
            });
        } else {
            console.error('Failed to fetch events');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createEvent() {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const description = document.getElementById('event-description').value;

    try {
        const response = await fetch(`${apiUrl}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, date, description }),
        });

        if (response.ok) {
            alert('Event created successfully');
            showEventsListPage();
        } else {
            alert('Failed to create event');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function showEventDetails(eventId) {
    try {
        const response = await fetch(`${apiUrl}/api/events/${eventId}`);
        if (response.ok) {
            const event = await response.json();
            const details = document.getElementById('event-details');
            details.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Description:</strong> ${event.description}</p>
            `;
            document.getElementById('event-details-page').style.display = 'block';
            document.getElementById('create-event-page').style.display = 'none';
            document.getElementById('events-list-page').style.display = 'none';
        } else {
            alert('Failed to fetch event details');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showCreateEventPage() {
    document.getElementById('events-list-page').style.display = 'none';
    document.getElementById('create-event-page').style.display = 'block';
    document.getElementById('event-details-page').style.display = 'none';
}

function showEventsListPage() {
    document.getElementById('events-list-page').style.display = 'block';
    document.getElementById('create-event-page').style.display = 'none';
    document.getElementById('event-details-page').style.display = 'none';
    fetchEvents();
}

// Initial display
showEventsListPage();
