// 1. INTRO SCREEN & ANIMASI MASUK
const enterBtn = document.getElementById('enter-btn');
const introScreen = document.getElementById('intro-screen');

enterBtn.addEventListener('click', () => {
    introScreen.classList.add('slide-up');
    setTimeout(() => {
        document.querySelector('.hero').classList.add('active');
    }, 400);
});

// 2. SMOOTH SCROLL REVEAL
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealOnScroll.observe(el));


// 3. FITUR BALON LOVE 3D MELAYANG & MELEDAK
const balloonContainer = document.getElementById('balloon-container');

// SVG Hati 3D bergradasi bercahaya pink
const balloonSVG = `
<svg viewBox="0 0 32 29.6" width="100%" height="100%">
  <defs>
    <radialGradient id="grad3D" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="20%" stop-color="#ff80bf" stop-opacity="1" />
      <stop offset="65%" stop-color="#ff1a8c" stop-opacity="1" />
      <stop offset="100%" stop-color="#880e4f" stop-opacity="1" />
    </radialGradient>
  </defs>
  <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" fill="url(#grad3D)"/>
</svg>`;

function createLoveBalloon() {
    if (!balloonContainer) return;

    const balloon = document.createElement('div');
    balloon.classList.add('love-balloon');
    balloon.innerHTML = balloonSVG;

    // Posisi acak horizontal & ukuran acak
    const randomLeft = Math.random() * 90; // 0% sampai 90%
    const randomSize = Math.floor(Math.random() * 25) + 35; // Ukuran 35px - 60px
    const randomDuration = Math.random() * 5 + 6; // Kecepatan melayang 6 - 11 detik

    balloon.style.left = `${randomLeft}%`;
    balloon.style.width = `${randomSize}px`;
    balloon.style.height = `${randomSize}px`;
    balloon.style.setProperty('--duration', `${randomDuration}s`);

    // EVENT KETIKA BALON DIKLIK (MELEDAK JADI TEKS MISQAIRINI)
    balloon.addEventListener('click', (e) => {
        // Hapus balon
        balloon.remove();

        // Buat efek teks meledak di koordinat klik
        const popText = document.createElement('span');
        popText.classList.add('pop-text');
        popText.innerText = "MISQAIRINI ✨";
        popText.style.left = `${e.clientX}px`;
        popText.style.top = `${e.clientY}px`;

        document.body.appendChild(popText);

        // Hapus teks setelah animasi selesai (1.2 detik)
        setTimeout(() => {
            popText.remove();
        }, 1200);
    });

    balloonContainer.appendChild(balloon);

    // Hapus balon secara otomatis kalau sudah terbang melewati layar agar tidak bikin berat web
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, randomDuration * 1000);
}

// Munculkan balon baru setiap 800 milidetik (0.8 detik)
setInterval(createLoveBalloon, 800);


// 4. LOVE TIMER
const startDate = new Date('2023-09-26T14:55:00');

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if(document.getElementById('days')) {
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }
}

setInterval(updateTimer, 1000);
updateTimer();


// 5. PESAN CINTA INTERAKTIF
const loveMessages = [
    "Kakak sayang banget sama adek ❤️",
    "Adek sayang banget sama kakak ❤️",
    "Terima kasih sudah jadi pasangan terbaik di dunia! 🌸",
    "Sayangg kangenn.. Nanti kita ketemu ya! 🥰",
    "Semoga kita terus bersama dunia akhirat. ✨",
    "I love you today, tomorrow, and forever! 💖"
];

const loveBtn = document.getElementById('loveBtn');
const loveMessageDisplay = document.getElementById('loveMessage');

if(loveBtn) {
    loveBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * loveMessages.length);
        loveMessageDisplay.style.opacity = 0;
        
        setTimeout(() => {
            loveMessageDisplay.innerText = loveMessages[randomIndex];
            loveMessageDisplay.style.transition = "opacity 0.5s ease-in";
            loveMessageDisplay.style.opacity = 1;
        }, 150);
    });
}