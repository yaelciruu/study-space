function displayUsername() {
    const username = localStorage.getItem('appUsername');

    if (!username) {
        return; 
    }

    const sidebarName = document.getElementById('userName');
    if (sidebarName) {
        sidebarName.textContent = username;
    }

    const headerName = document.getElementById('userNameHeader');
    if (headerName) {
    headerName.textContent = username + '!';
}
}

displayUsername();