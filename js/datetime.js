function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // 24 - 12 hrs
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    const timeElement = document.getElementById('clock-time');
    if (timeElement) {
        timeElement.innerText = timeString;
    }

    // --- date ---
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    const dateElement = document.getElementById('clock-date');
    if (dateElement) {
        dateElement.innerText = dateString;
    }
}

// run immediately 
updateClock();

// update every second
setInterval(updateClock, 1000);