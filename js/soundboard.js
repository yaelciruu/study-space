document.addEventListener('DOMContentLoaded', () => {
    
    const musicBtn = document.getElementById('music-icon');
    const soundFrame = document.getElementById('sound-frame');
    
    if (musicBtn && soundFrame) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            soundFrame.classList.toggle('visible');
            
            const worldModal = document.getElementById('worlds-modal');
            if (worldModal) worldModal.classList.remove('visible');
        });
    }

    const sidebarSoundBtn = document.getElementById('sidebar-sound-btn');
    if (sidebarSoundBtn && soundFrame) {
        sidebarSoundBtn.addEventListener('click', (e) => {
            e.preventDefault();
            soundFrame.classList.toggle('visible');
        });
    }

    const soundCards = document.querySelectorAll('.sound-card');
    soundCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('volume-slider')) return;
            const audio = this.querySelector('audio');
            if (audio.paused) {
                audio.play();
                this.classList.add('playing');
            } else {
                audio.pause();
                this.classList.remove('playing');
            }
            updateActiveCount();
        });

        const slider = card.querySelector('.volume-slider');
        const audio = card.querySelector('audio');
        if (slider && audio) {
            slider.addEventListener('input', function(e) {
                e.stopPropagation();
                audio.volume = this.value / 100;
            });
            slider.addEventListener('click', (e) => e.stopPropagation());
        }
    });

    function updateActiveCount() {
        const count = document.querySelectorAll('.sound-card.playing').length;
        const display = document.querySelector('.status-footer .count');
        if (display) display.textContent = count;
    }
});