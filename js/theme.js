document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode'); 
    const body = document.body;

    loadThemeFromDB();

    if (toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                enableLightMode();
            } else {
                disableLightMode();
            }
        });
    }

    function loadThemeFromDB() {
        fetch('php/get_theme.php')
            .then(res => res.json())
            .then(data => {
                const theme = data.theme_mode;

                if (theme === 'light') {
                    body.classList.add('light-mode');
                    if (toggle) toggle.checked = true;
                    localStorage.setItem('theme', 'light'); 
                } else {
                    body.classList.remove('light-mode');
                    if (toggle) toggle.checked = false;
                    localStorage.setItem('theme', 'dark'); 
                }
            })
            .catch(err => {
                console.error("Failed to load theme from DB, defaulting to dark mode.", err);
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') body.classList.add('light-mode');
            });
    }

    function enableLightMode() {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        saveToDB('light');
    }

    function disableLightMode() {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        saveToDB('dark');
    }

    function saveToDB(mode) {
        const formData = new FormData();
        formData.append('theme', mode);

        fetch('php/theme.php', {
            method: 'POST',
            body: formData
        }).then(res => res.text()).then(data => console.log('Theme saved:', data));
    }
});