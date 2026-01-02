(function () {
    const targetUrl = "https://blancbeu.online";
    let timeLeft = 5;
    const countdownEl = document.getElementById('countdown');
    const redirectBtn = document.getElementById('redirect-btn');

    // Button redirect
    if (redirectBtn) {
        redirectBtn.addEventListener('click', () => {
            window.location.href = targetUrl;
        });
    }

    // Update countdown visually
    const timerId = setInterval(() => {
        timeLeft--;
        if (countdownEl) {
            countdownEl.textContent = timeLeft;
        }

        if (timeLeft <= 0) {
            clearInterval(timerId);
            window.location.href = targetUrl;
        }
    }, 1000);

    // Fallback security: ensure redirect happens even if interval stalls
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 5500); // 5.5s safety net
})();
