document.addEventListener('DOMContentLoaded', function() {
    let minuteDisplay = document.querySelector('.minute');
    let secondDisplay = document.querySelector('.sec');
    let millisecondDisplay = document.querySelector('.msec');
    let playButton = document.querySelector('.btn.play');
    let resetButton = document.querySelector('.btn.reset');
    let lapButton = document.querySelector('.btn.lap');
    let lapClearButton = document.querySelector('.lap-clear-btn');
    let lapsList = document.querySelector('.laps');
    let outerCircle = document.querySelector('.outer-circle');

    let minute = 0, second = 0, millisecond = 0;
    let timerInterval = null; // Initialize timerInterval to null
    let lapCounter = 1;

    function updateDisplay() {
        minuteDisplay.textContent = String(minute).padStart(2, '0');
        secondDisplay.textContent = String(second).padStart(2, '0');
        millisecondDisplay.textContent = String(millisecond).padStart(2, '0');
    }

    function startTimer() {
        timerInterval = setInterval(function() {
            millisecond++;
            if (millisecond === 100) {
                millisecond = 0;
                second++;
            }
            if (second === 60) {
                second = 0;
                minute++;
            }
            updateDisplay();
        }, 10);
        outerCircle.classList.add('animate-color'); // Start animation on play
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null; // Reset timerInterval to null when stopped
        outerCircle.classList.remove('animate-color'); // Stop animation on pause
    }

    playButton.addEventListener('click', function() {
        if (timerInterval === null) {
            startTimer();
            playButton.textContent = 'Pause';
            lapButton.classList.remove('hidden');
            resetButton.classList.add('hidden');
        } else {
            stopTimer();
            playButton.textContent = 'Play';
            lapButton.classList.add('hidden');
            resetButton.classList.remove('hidden');
        }
    });

    resetButton.addEventListener('click', function() {
        stopTimer();
        minute = 0;
        second = 0;
        millisecond = 0;
        updateDisplay();
        playButton.textContent = 'Play';
        lapButton.classList.add('hidden');
        resetButton.classList.add('hidden');
        lapClearButton.classList.remove('hidden');
        lapsList.innerHTML = '';
        lapCounter = 1;
    });

    lapButton.addEventListener('click', function() {
        if (timerInterval) {
            let lapItem = document.createElement('li');
            lapItem.classList.add('lap-item');
            let lapTime = `${String(minute).padStart(2, '0')} : ${String(second).padStart(2, '0')} : ${String(millisecond).padStart(2, '0')}`;
            lapItem.innerHTML = `<span class="number">#${lapCounter}</span><span class="time-stamp">${lapTime}</span>`;
            lapsList.appendChild(lapItem);
            lapCounter++;
        }
    });

    lapClearButton.addEventListener('click', function() {
        lapsList.innerHTML = '';
        lapCounter = 1;
        lapClearButton.classList.add('hidden');
    });

    // Initialize display
    updateDisplay();
});
