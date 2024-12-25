
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const busList = document.querySelector('.bus-list');
    const seatsSection = document.getElementById('seats');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;

    // Sample bus data with images
    const buses = [
        {
            id: 1,
            name: 'Udumalai',
            type: '24',
            departure: '4:45 PM',
            arrival: '6:15 PM',
            duration: '3h',
            price: 500,
            seats: 40,
            available: 25
        },
        {
            id: 2,
            name: 'Pollachi',
            type: '32',
            departure: '4:30 PM',
            arrival: '6:15 PM',
            duration: '3h',
            price: 600,
            seats: 40,
            available: 15
        }
    ];

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            seatsSection.style.display = 'none';
            busList.innerHTML = '';
            
            buses.forEach(bus => {
                const busItem = document.createElement('div');
                busItem.classList.add('bus-item');
                busItem.innerHTML = `
                    <img src="/api/placeholder/80/80" alt="${bus.name}">
                    <div class="bus-info">
                        <h3>${bus.name} (${bus.type})</h3>
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
                    const busId = button.getAttribute('data-bus-id');
                    seatsSection.style.display = 'block';
                    seatsSection.scrollIntoView({ behavior: 'smooth' });
                    
                    const seatsDiv = document.querySelector('.seats');
                    seatsDiv.innerHTML = '';
                    
                    // Generate seats
                    for (let i = 1; i <= 40; i++) {
                        const seatButton = document.createElement('button');
                        seatButton.classList.add('seat');
                        // Randomly mark some seats as unavailable
                        if (Math.random() < 0.3) {
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
    document.querySelector('.book-seats')?.addEventListener('click', () => {
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