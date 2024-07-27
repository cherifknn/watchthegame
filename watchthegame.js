document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('dynamic-input');
    var placeholders = ['ManCity vs Arsenal', 'Euro 2024', 'Roland Garros', 'Tour de France', 'La Liga Barcelona', 'Ligue 1 PSG', 'Bundesliga Bayern', 'Champions League', 'F1 Canadian GP', 'NBA Finals', 'Wimbledon'];
    var currentIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;
    var deletingSpeed = 50;
    var delayBetweenWords = 1500;
    var typingTimeout;

    function adjustWidth() {
        var text = input.value || input.placeholder;
        var tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);
        var width = tempSpan.offsetWidth + 40; // Add padding width
        document.body.removeChild(tempSpan);
        input.style.width = width + 'px';
    }

    function typePlaceholder() {
        var currentText = placeholders[currentIndex];
        var placeholderText = input.placeholder;

        if (!isDeleting) {
            input.placeholder = currentText.substring(0, placeholderText.length + 1);
            adjustWidth();

            if (input.placeholder === currentText) {
                isDeleting = true;
                typingTimeout = setTimeout(typePlaceholder, delayBetweenWords);
            } else {
                typingTimeout = setTimeout(typePlaceholder, typingSpeed);
            }
        } else {
            input.placeholder = currentText.substring(0, placeholderText.length - 1);
            adjustWidth();

            if (input.placeholder === '') {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % placeholders.length;
                typingTimeout = setTimeout(typePlaceholder, typingSpeed);
            } else {
                typingTimeout = setTimeout(typePlaceholder, deletingSpeed);
            }
        }
    }

    function stopTyping() {
        clearTimeout(typingTimeout);
        input.placeholder = ''; // Ensure placeholder is cleared when focused
    }

    input.addEventListener('focus', function() {
        stopTyping();
        adjustWidth();
    });

    input.addEventListener('blur', function() {
        if (input.value === '') {
            currentIndex = (currentIndex + 1) % placeholders.length;
            input.placeholder = placeholders[currentIndex];
            adjustWidth();
            typingTimeout = setTimeout(typePlaceholder, delayBetweenWords); // Restart typing on blur
        }
    });

    input.addEventListener('input', adjustWidth);

    // Initial width adjustment
    adjustWidth();

    // Start the typing effect
    typingTimeout = setTimeout(typePlaceholder, delayBetweenWords);
});
