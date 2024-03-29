document.addEventListener('DOMContentLoaded', function () {
    fetchEvents();
    const token = getTokenFromQueryParams();
    toggleEventCreationForm(isAdmin(token));
});

async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        const data = await response.json();
        const events = data.events;

        const eventListElement = document.getElementById('eventList');
        eventListElement.innerHTML = '';

        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('eventItem'); // Add event item class
            eventItem.innerHTML = `
                <h2 class="eventName">${event.event_name}</h2>
                <p class="eventDetails"><strong>Event ID:</strong> ${event.event_id}</p>
                <p class="eventDetails"><strong>Location:</strong> ${event.event_location}</p>
                <p class="eventDetails"><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                <p class="eventDetails"><strong>Regular Price:</strong> ${event.regular_price}</p>
                <p class="eventDetails"><strong>VIP Price:</strong> ${event.vip_price}</p>
                <p class="eventDetails"><strong>Normal Price:</strong> ${event.normal_price}</p>
                <img class="eventFlyer" src="${event.event_flyer}" alt="Event Flyer">
                <button class="purchaseTicketBtn" data-event-id="${event._id}">Purchase Ticket</button> <!-- Purchase Ticket button -->
            `;

            // Add click event listener to the Purchase Ticket button
            const purchaseTicketBtn = eventItem.querySelector('.purchaseTicketBtn');
            purchaseTicketBtn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-event-id');
                const eventData = {
                    eventId,
                    eventName: event.event_name,
                    eventLocation: event.event_location,
                    eventDate: event.event_date,
                    regularPrice: event.regular_price,
                    vipPrice: event.vip_price,
                    normalPrice: event.normal_price,
                    eventFlyer: event.event_flyer
                };
                redirectToTicketPurchaseForm(eventData);
            });

            eventListElement.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

function redirectToTicketPurchaseForm(eventData) {
    const queryString = Object.entries(eventData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    window.location.href = `ticketPurchaseForm.html?${queryString}`;
}

function getTokenFromQueryParams() {
    return new URLSearchParams(window.location.search).get('token');
}

function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload;
}

function isAdmin(token) {
    const payload = decodeToken(token);
    console.log('Token Payload:', payload); // Log the decoded token payload
    const isAdmin = payload.isAdmin === true;
    console.log('isAdmin:', isAdmin); // Log the isAdmin status
    return isAdmin;
}

// Function to toggle event creation form based on user role
function toggleEventCreationForm(isAdmin) {
    const form = document.getElementById('eventCreationForm');
    if (isAdmin) {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}





