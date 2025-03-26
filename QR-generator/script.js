// QR Code Generator Functionality
document.getElementById('generateButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value.trim();
    const qrContainer = document.getElementById('qrcode');
    const toast = document.getElementById('toast');

    qrContainer.innerHTML = ""; // Clear previous QR code

    if (!inputText) {
        alert("Please enter some text or URL.");
        return;
    }

    // Generate QR Code
    const qrCode = document.createElement("img");
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputText)}&size=200x200`;
    qrCode.classList.add("qr-image");
    qrCode.onload = function() {
        console.log("QR Code loaded successfully");
    };
    qrCode.onerror = function() {
        console.error("Error loading QR Code");
    };
    qrContainer.appendChild(qrCode);

    // Show toast
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Toggle theme and save preference
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

prefersDarkScheme.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }
});

themeToggle.addEventListener('change', function() {
    const icon = document.querySelector('.theme__icon');
    if (this.checked) {
        icon.textContent = '🌙';
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.textContent = '☀️';
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

if (themeToggle.checked) {
    document.querySelector('.theme__icon').textContent = '🌙';
} else {
    document.querySelector('.theme__icon').textContent = '☀️';
}