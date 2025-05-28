let time = 25 * 60; // seconds
const timerDiv = document.getElementById('timer');
const startBtn = document.getElementById('start_btn');
const pauseBtn = document.getElementById('pause_btn');
const resetBtn = document.getElementById('reset_btn');
const randomBtn = document.getElementById('random_btn');
let timerInterval = null;
let endTime = null; // Track when the timer should end

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDiv.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const now = Date.now();
    let remaining = Math.round((endTime - now) / 1000);
    if (remaining < 0) remaining = 0;
    displayTime(remaining);
    if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDiv.textContent = "Time's up!";
    }
    time = remaining; // Keep time in sync for reset/pause
}

function startTimer() {
    if (!timerInterval && time > 0) {
        endTime = Date.now() + time * 1000;
        updateTimer();
        timerInterval = setInterval(updateTimer, 200); // 200ms for better accuracy
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    // Update time to what's left
    if (endTime) {
        let remaining = Math.round((endTime - Date.now()) / 1000);
        time = remaining > 0 ? remaining : 0;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60;
    displayTime(time);
}

function randomTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    let min = 10;
    let max = 60;
    let randomMinutes = Math.floor(Math.random() * (max - min + 1)) + min;
    time = randomMinutes * 60;
    displayTime(time);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
randomBtn.addEventListener('click', randomTimer);

// ...existing background and Spotify code...

displayTime(time); // initial display

// Background image functionality
const bgBtn = document.getElementById('bg_btn');
const wallpapers = [
    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
    "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')",
    "url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=80')"
];
let wallpaperIndex = 0;

bgBtn.addEventListener('click', () => {
    wallpaperIndex = (wallpaperIndex + 1) % wallpapers.length;
    document.body.style.backgroundImage = wallpapers[wallpaperIndex];
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
});

// Spotify embed functionality
const loadSpotifyBtn = document.getElementById('load_spotify');
const spotifyUrlInput = document.getElementById('spotify_url');
const spotifyIframe = document.getElementById('spotify_iframe');

if (loadSpotifyBtn) {
    loadSpotifyBtn.addEventListener('click', () => {
        const url = spotifyUrlInput.value.trim();
        const match = url.match(/spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
        if (match) {
            const type = match[1];
            const id = match[2];
            const embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
            spotifyIframe.src = embedUrl;
        } else {
            alert('Please enter a valid Spotify track, album, or playlist URL.');
        }
    });
}