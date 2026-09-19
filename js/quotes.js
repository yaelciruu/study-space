document.addEventListener('DOMContentLoaded', () => {
    
    const quotes = [
        // try lang mga to
        "\"The only way to do great work is to love what you do.\"",
        "\"Believe you can and you're halfway there.\"",
        "\"Don't watch the clock; do what it does. Keep going.\"",
        "\"Success is the sum of small efforts, repeated day in and day out.\"",
        "\"Your future is created by what you do today, not tomorrow.\"",
        "\"Dream big and dare to fail.\"",
        "\"Discipline is choosing between what you want now and what you want most.\"",
        "\"It always seems impossible until it's done.\"",
        "\"You are capable of more than you know.\"",
        "\"Focus on the step in front of you, not the whole staircase.\""
    ];

    const quoteElement = document.getElementById('quote-text');
    
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.innerText = quotes[randomIndex];
    }
});