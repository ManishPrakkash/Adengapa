document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const busList = document.querySelector('.bus-list');
    const busesSection = document.getElementById('buses');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;

    
    const buses = [
        { id: 1, name: 'Udumalai', type: '24', origin: 'SECE', destination: 'Udumalai', departure: '4:45 PM', arrival: '6:15 PM', duration: '2h', price: 300, seats: 40, available: 25, image: '' },
        { id: 2, name: 'Pollachi', type: '32', origin: 'SECE', destination: 'Pollachi', departure: '4:30 PM', arrival: '5:30 PM', duration: '1h', price: 200, seats: 40, available: 15, image: 'assets/ClgBus.jpeg' },
        { id: 3, name: 'Coimbatore', type: '24', origin: 'SECE', destination: 'Coimbatore', departure: '4:30 PM', arrival: '6:30 PM', duration: '2h', price: 450, seats: 40, available: 20, image: 'assets/ClgBus.jpeg' },
        { id: 4, name: 'Palladam', type: '25', origin: 'SECE', destination: 'Palladam', departure: '4:45 PM', arrival: '6:00 PM', duration: '1:30h', price: 200, seats: 40, available: 30, image: 'assets/ClgBus.jpeg' },
        { id: 5, name: 'Tirupur', type: '33', origin: 'SECE', destination: 'Tirupur', departure: '4:45 PM', arrival: '6:00 PM', duration: '1:15h', price: 300, seats: 40, available: 20, image: 'assets/ClgBus.jpeg' },
        { id: 6, name: 'Sundarapuram', type: '34', origin: 'SECE', destination: 'Sundarapuram', departure: '4:30 PM', arrival: '5:30 PM', duration: '1h', price: 100, seats: 40, available: 25, image: 'assets/ClgBus.jpeg' },
        { id: 7, name: 'Pothanur', type: '35', origin: 'SECE', destination: 'Pothanur', departure: '4:30 PM', arrival: '5:30 PM', duration: '1h', price: 300, seats: 40, available: 30, image: 'assets/ClgBus.jpeg' },
        { id: 8, name: 'Anaimalai', type: '27', origin: 'SECE', destination: 'Anaimalai', departure: '4:45 PM', arrival: '6:15 PM', duration: '1h', price: 200, seats: 40, available: 35, image: 'assets/ClgBus.jpeg' },
        { id: 9, name: 'Echanari', type: '32', origin: 'SECE', destination: 'Echanari', departure: '4:30 PM', arrival: '6:00 PM', duration: '1.30h', price: 200, seats: 40, available: 20, image: 'assets/ClgBus.jpeg' },
        { id: 10, name: 'Negamam', type: '24', origin: 'SECE', destination: 'Negamam', departure: '4:30 PM', arrival: '5:30 PM', duration: '1h', price: 200, seats: 40, available: 15, image: 'assets/ClgBus.jpeg' }
    ];

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            busList.innerHTML = '';
            
            const destination = document.getElementById('destination').value.trim().toLowerCase();
            
            
            const filteredBuses = buses.filter(bus => bus.destination.toLowerCase() === destination);
            
            if (filteredBuses.length === 0) {
                busList.innerHTML = '<div class="no-buses">No buses available for this route.</div>';
                busesSection.style.display = 'block';
                return;
            }
            
            busesSection.style.display = 'block';
            filteredBuses.forEach(bus => {
                const busItem = document.createElement('div');
                busItem.classList.add('bus-item');
                busItem.innerHTML = `
                    <img src="${bus.image}" alt="${bus.name}">
                    <div class="bus-info">
                        <h3>${bus.name} (${bus.type} Seater)</h3>
                        <p>${bus.origin} to ${bus.destination}</p>
                        <p>Departure: ${bus.departure} | Arrival: ${bus.arrival} (${bus.duration})</p>
                        <p>Available Seats: ${bus.available}/${bus.seats}</p>
                    </div>
                    <div class="bus-price">
                        <p>₹${bus.price}</p>
                        <button class="select-bus" data-bus-id="${bus.id}">Select Seats</button>
                    </div>
                `;
                busList.appendChild(busItem);
            });

             selection buttons
            document.querySelectorAll('.select-bus').forEach(button => {
                button.addEventListener('click', () => {
                    const busId = parseInt(button.getAttribute('data-bus-id'));
                    window.location.href = `seat.html?busId=${busId}`;
                });
            });
        });
    }
});