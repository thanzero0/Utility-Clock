// State
let showDate = true;
let use24h = true;
let precision = 'hms'; // 'h', 'hm', 'hms'

function updateClock() {
    const now = new Date();

    // Time Format Logic
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (!use24h) {
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    const h = String(hours).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    let timeString = h;
    if (precision === 'hm' || precision === 'hms') timeString += `:${m}`;
    if (precision === 'hms') timeString += `:${s}`;
    if (!use24h) timeString += ` <span style="font-size: 0.4em; opacity: 0.5; font-family: 'Inter'">${ampm}</span>`;

    const timeElement = document.getElementById('time');
    if (timeElement.innerHTML !== timeString) {
        timeElement.innerHTML = timeString;
    }

    // Date Update Logic
    const dateElement = document.getElementById('date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options).toUpperCase();

    if (dateElement.textContent !== dateString) {
        dateElement.textContent = dateString;
    }
}

// UI Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const dateSwitch = document.getElementById('toggle-date-btn');
const formatSwitch = document.getElementById('toggle-24h-btn');
const precisionBtns = document.querySelectorAll('.segment');
const dateElement = document.getElementById('date');

// Toggle Settings Panel
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('hidden');
});

// Toggle Date (Switch)
dateSwitch.addEventListener('click', () => {
    showDate = !showDate;
    dateSwitch.classList.toggle('active', showDate);
    dateElement.classList.toggle('hidden', !showDate);

    // Trigger animation
    dateSwitch.classList.remove('switch-animate');
    void dateSwitch.offsetWidth; // Force reflow
    dateSwitch.classList.add('switch-animate');
});

// Toggle 24H/12H (Switch)
formatSwitch.addEventListener('click', () => {
    use24h = !use24h;
    formatSwitch.classList.toggle('active', use24h);
    updateClock();

    // Trigger animation
    formatSwitch.classList.remove('switch-animate');
    void formatSwitch.offsetWidth; // Force reflow
    formatSwitch.classList.add('switch-animate');
});

// Precision Controls (Segments)
precisionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        precision = btn.dataset.value;
        precisionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateClock();
    });
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.add('hidden');
    }
});

// Initialize
setInterval(updateClock, 100); // Faster update for better responsiveness
updateClock();
