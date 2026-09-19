document.addEventListener('DOMContentLoaded', () => {
    
    const WORK_TIME = 1500; // 25 minutes in seconds
    const BREAK_TIME = 300;  // 5 minutes in seconds
    const TOTAL_CYCLES = 4;  

    let cyclesCompleted = 0;
    let isWorking = true;
    let timeLeft = WORK_TIME;
    let timerInterval = null;
    let isPaused = true;

    const timerDisplay = document.getElementById('focus-timer') || 
                         document.getElementById('mini-timer');
    const startBtn = document.getElementById('startBtn');
    const statusDisplay = document.getElementById('cycle-status'); 

    updateDisplay();
    updateStatusText();

    if (startBtn) {
        startBtn.addEventListener('click', toggleTimer);
    }

    function toggleTimer() {
        if (!timerDisplay) return;

        if (isPaused) {
            isPaused = false;
            startBtn.textContent = 'PAUSE';
            timerInterval = setInterval(countdown, 1000);
        } else {
            isPaused = true;
            startBtn.textContent = 'RESUME';
            clearInterval(timerInterval);
        }
    }

    function countdown() {
        if (timeLeft <= 0) {
            handleCycleEnd();
            return;
        }

        timeLeft--;
        updateDisplay();
    }
    
    function handleCycleEnd() {
        clearInterval(timerInterval);
        
        if (isWorking) {
            cyclesCompleted++;
            
            if (cyclesCompleted >= TOTAL_CYCLES) {
                timeLeft = 0;
                timerDisplay.textContent = '00:00';
                startBtn.textContent = 'SESSION COMPLETE';
                startBtn.disabled = true;
                updateStatusText('Session Complete!');
                
            } else {
                isWorking = false;
                timeLeft = BREAK_TIME;
                startBtn.textContent = 'START BREAK';
                updateStatusText();
            }
            
        } else {
            isWorking = true;
            timeLeft = WORK_TIME;
            startBtn.textContent = 'START';
            updateStatusText();
        }
        
        if (cyclesCompleted < TOTAL_CYCLES) {
            isPaused = true;
            toggleTimer();
        }
    }


    function updateDisplay() {
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }
        
        document.title = `${minutes}:${seconds} | ${isWorking ? 'STUDY' : 'BREAK'}`;
    }

    function updateStatusText(message = null) {
        if (!statusDisplay) return;

        if (message) {
            statusDisplay.textContent = message;
        } else {
            const cycleNumber = cyclesCompleted + 1;
            if (isWorking) {
                statusDisplay.textContent = `${cycleNumber} Cycle (Study)`;
            } else {
                statusDisplay.textContent = `${cyclesCompleted} Break (5 min)`;
            }
        }
    }
});