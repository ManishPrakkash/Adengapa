document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const busList = document.querySelector('.bus-list');
    const seatsSection = document.getElementById('seats');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;

    // Sample bus data with routes
    const buses = [
        { id: 1, name: 'Udumalai', type: '24', origin: 'SECE', destination: 'Udumalai', departure: '4:45 PM', arrival: '6:15 PM', duration: '3h', price: 500, seats: 40, available: 25 },
        { id: 2, name: 'Pollachi', type: '32', origin: 'SECE', destination: 'Pollachi', departure: '4:30 PM', arrival: '6:15 PM', duration: '3h', price: 600, seats: 40, available: 15 },
        { id: 3, name: 'Coimbatore', type: '24', origin: 'SECE', destination: 'Coimbatore', departure: '4:30 PM', arrival: '7:15 PM', duration: '2h', price: 450, seats: 40, available: 20 },
        { id: 4, name: 'palladam', type: '25', origin: 'SECE', destination: 'palladam', departure: '4 :45 PM', arrival: '6:00 PM', duration: '1:30h', price: 800, seats: 40, available: 30 },
        { id: 5, name: 'Tirupur', type: '32', origin: 'SECE', destination: 'Madurai', departure: '7:00 AM', arrival: '1:00 PM', duration: '6h', price: 700, seats: 40, available: 20 },
        { id: 6, name: 'Sundarapuram', type: '24', origin: 'SECE', destination: 'Trichy', departure: '8:00 AM', arrival: '2:00 PM', duration: '6h', price: 750, seats: 40, available: 25 },
        { id: 7, name: 'Pothanur', type: '32', origin: 'SECE', destination: 'Salem', departure: '9:00 AM', arrival: '1:00 PM', duration: '4h', price: 600, seats: 40, available: 30 },
        { id: 8, name: 'Anamalai', type: '24', origin: 'SECE', destination: 'Erode', departure: '10:00 AM', arrival: '12:00 PM', duration: '2h', price: 500, seats: 40, available: 35 },
        { id: 9, name: 'Echanari', type: '32', origin: 'SECE', destination: 'Tirunelveli', departure: '11:00 AM', arrival: '7:00 PM', duration: '8h', price: 900, seats: 40, available: 20 },
        { id: 10, name: 'Negamam', type: '24', origin: 'SECE', destination: 'Nagercoil', departure: '12:00 PM', arrival: '8:00 PM', duration: '8h', price: 950, seats: 40, available: 15 }
    ];

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            seatsSection.style.display = 'none';
            busList.innerHTML = '';
            
            const destination = document.getElementById('destination').value.trim().toLowerCase();
            
            // Filter buses based on destination
            const filteredBuses = buses.filter(bus => bus.destination.toLowerCase() === destination);
            
            if (filteredBuses.length === 0) {
                busList.innerHTML = '<div class="no-buses">No buses available for this route.</div>';
                return;
            }
            
            filteredBuses.forEach(bus => {
                const busItem = document.createElement('div');
                busItem.classList.add('bus-item');
                busItem.innerHTML = `
                    <img src="/api/placeholder/80/80" alt="${bus.name}">
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

            // Add event listeners to bus selection buttons
            document.querySelectorAll('.select-bus').forEach(button => {
                button.addEventListener('click', () => {
                    const busId = parseInt(button.getAttribute('data-bus-id'));
                    const selectedBus = buses.find(bus => bus.id === busId);
                    seatsSection.style.display = 'block';
                    seatsSection.scrollIntoView({ behavior: 'smooth' });
                    
                    const seatsDiv = document.querySelector('.seats');
                    seatsDiv.innerHTML = '';
                    
                    // Generate seats
                    for (let i = 1; i <= selectedBus.seats; i++) {
                        const seatButton = document.createElement('button');
                        seatButton.classList.add('seat');
                        // Mark seats as unavailable based on available seats count
                        if (i > selectedBus.available) {
                            seatButton.classList.add('unavailable');
                            seatButton.disabled = true;
                        }
                        seatButton.innerText = i;
                        
                        if (!seatButton.disabled) {
                            seatButton.addEventListener('click', () => {
                                if (!seatButton.classList.contains('unavailable')) {
                                    seatButton.classList.toggle('selected');
                                    updateSelectedSeats();
                                }
                            });
                        }
                        
                        seatsDiv.appendChild(seatButton);
                    }
                });
            });
        });
    }

    // Function to update selected seats count
    function updateSelectedSeats() {
        const selectedSeats = document.querySelectorAll('.seat.selected').length;
        const passengerCount = parseInt(document.getElementById('passengers').value);
        
        if (selectedSeats > passengerCount) {
            alert(`You can only select ${passengerCount} seat(s) as per your passenger count.`);
            // Deselect the last selected seat
            const lastSelected = document.querySelector('.seat.selected:last-child');
            if (lastSelected) {
                lastSelected.classList.remove('selected');
            }
        }
    }
   
    // Add booking confirmation
    document.querySelector('.book-seats').addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat to proceed with booking.');
            return;
        }
        const seatNumbers = Array.from(selectedSeats).map(seat => seat.innerText).join(', ');
        alert(`Booking confirmed for seats: ${seatNumbers}`);
        location.href = '#home';
        bookingForm.reset();
        busList.innerHTML = '';
        seatsSection.style.display = 'none';
    });
});
