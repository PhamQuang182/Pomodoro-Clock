let time = 25 * 60; // 25 minutes in seconds
const timerDiv = document.getElementById('timer');
const startBtn = document.getElementById('start_btn');
const stopBtn = document.getElementById('stop_btn');
const resetBtn = document.getElementById('reset_btn');
const randomBtn = document.getElementById('random_btn');
let timerInterval = null;

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDiv.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDiv.textContent = "Time's up!";
    }
}

function startTimer() {
    if (!timerInterval && time > 0) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60; // reset to 25 minutes
    updateTimer();
}

function randomTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    let min = 10;
    let max = 60;
    let randomMinutes = Math.floor(Math.random() * (max - min + 1)) + min;
    time = randomMinutes * 60;
    updateTimer();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
randomBtn.addEventListener('click', randomTimer);

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

updateTimer(); // initial display