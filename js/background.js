document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('world-trigger');
    const modal = document.getElementById('worlds-modal');
    const closeBtn = document.getElementById('close-modal');
    const cards = document.querySelectorAll('.world-card');
    const body = document.body;

    if (trigger && modal) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.add('visible');
            
            const soundFrame = document.getElementById('sound-frame');
            if (soundFrame) soundFrame.classList.remove('visible');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const bgUrl = this.getAttribute('data-bg-url');
            if (bgUrl) {
                body.style.backgroundImage = `url('${bgUrl}')`;
                body.style.backgroundSize = "cover";
                body.style.backgroundPosition = "center";
                body.style.backgroundAttachment = "fixed";
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.classList.remove('visible');
        }
    });
});