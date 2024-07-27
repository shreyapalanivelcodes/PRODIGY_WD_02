let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let currentTime;
let lapNumber = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', function () {
    if (!running) {
        startStopBtn.textContent = "Stop";
        startStopBtn.classList.add('active');
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        resetBtn.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
    } else {
        startStopBtn.textContent = "Start";
        startStopBtn.classList.remove('active');
        running = false;
        clearInterval(tInterval);
        savedTime += difference;
    }
});

resetBtn.addEventListener('click', function () {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    laps.innerHTML = "";
    lapNumber = 0;
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove('active');
    resetBtn.style.display = "none";
    lapBtn.style.display = "none";
});

lapBtn.addEventListener('click', function () {
    lapNumber++;
    const lapTime = display.textContent;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapNumber}: ${lapTime}`;
    laps.appendChild(li);
});

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + savedTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
