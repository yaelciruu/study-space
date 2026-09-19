let currentPlayingNoiseId = 'none';

function saveNoisePreference(noiseId) {
    const formData = new FormData();
    formData.append('background_noise', noiseId); 

    fetch('php/theme.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        console.log("Noise Preference Saved:", data);
    })
    .catch(err => console.error("Error saving noise preference:", err));
}

function toggleMiniSound(element, soundId) {
    const audio = element.querySelector('audio');
    
    if (element.classList.contains('active')) {
        audio.pause();
        element.classList.remove('active');
        currentPlayingNoiseId = 'none';
    } else {
        document.querySelectorAll('.mini-sound-item').forEach(item => {
            const itemAudio = item.querySelector('audio');
            itemAudio.pause();
            item.classList.remove('active');
        });

        audio.volume = 0.5; 
        
        audio.play().catch(error => {
            console.log("Autoplay was blocked by the browser. Please click on the page.");
        });
        
        element.classList.add('active');
        currentPlayingNoiseId = soundId;
    }

    saveNoisePreference(currentPlayingNoiseId);
}

function loadNoisePreference() {
    fetch('php/get_theme.php')
    .then(res => res.json())
    .then(data => {
        const savedNoiseId = data.background_noise; 

        if (savedNoiseId && savedNoiseId !== 'none') {
            const audioEl = document.getElementById(`audio-${savedNoiseId}`); 
            const element = audioEl ? audioEl.closest('.mini-sound-item') : null;

            if (element && audioEl) {
                audioEl.volume = 0.5;
                audioEl.play().then(() => {
                    element.classList.add('active');
                    currentPlayingNoiseId = savedNoiseId;
                }).catch(err => {
                    console.log(`Autoplay for ${savedNoiseId} was blocked. User interaction required.`);
                });
            }
        }
    })
    .catch(err => console.error("Error loading preferences:", err));
}

document.addEventListener('DOMContentLoaded', loadNoisePreference);