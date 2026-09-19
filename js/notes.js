document.addEventListener("DOMContentLoaded", function() {
    const noteArea = document.getElementById("sticky-note-area");
    const statusMsg = document.getElementById("save-status");
    let timeoutId;

    fetch('php/notes.php?action=get_note') 
        .then(response => response.text())
        .then(data => {
            noteArea.value = data;
        });

    noteArea.addEventListener("input", function() {
        statusMsg.innerText = "Typing...";
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            saveNoteToDB(noteArea.value);
        }, 1000);
    });

    function saveNoteToDB(text) {
        statusMsg.innerText = "Saving...";
        
        const formData = new FormData();
        formData.append('action', 'save_note');
        formData.append('content', text);     

        fetch('php/notes.php', {          
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if(data.trim() === "Saved") {
                statusMsg.innerText = "Saved.";
            } else {
                statusMsg.innerText = "Error.";
            }
        });
    }
});