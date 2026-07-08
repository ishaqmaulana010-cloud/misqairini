// 1. INTRO SCREEN & ANIMASI MASUK
const enterBtn = document.getElementById('enter-btn');
const introScreen = document.getElementById('intro-screen');

enterBtn.addEventListener('click', () => {
    introScreen.classList.add('slide-up');
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('active');
    }, 300);
});

// 2. SMOOTH SCROLL REVEAL (OPTIMIZED)
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { 
    threshold: 0.08 // Diperkecil agar elemen cepat muncul di layar HP yang pendek
});

revealElements.forEach(el => revealOnScroll.observe(el));


// 3. FITUR BALON LOVE 3D MELAYANG & MELEDAK (HIGH PERFORMANCE)
const balloonContainer = document.getElementById('balloon-container');

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

    // Batasi jumlah balon maksimal di layar HP agar tidak overload (Maks 15 balon)
    if (balloonContainer.childElementCount > 15) return;

    const balloon = document.createElement('div');
    balloon.classList.add('love-balloon');
    balloon.innerHTML = balloonSVG;

    const randomLeft = Math.random() * 85; // Dipersempit agar tidak mentok ke sisi kanan layar HP
    const randomSize = Math.floor(Math.random() * 15) + 35; // Ukuran disesuaikan untuk HP (35px - 50px)
    const randomDuration = Math.random() * 4 + 5; // Kecepatan melayang (5 - 9 detik)

    balloon.style.left = `${randomLeft}%`;
    balloon.style.width = `${randomSize}px`;
    balloon.style.height = `${randomSize}px`;
    balloon.style.setProperty('--duration', `${randomDuration}s`);

    // EVENT DIUBAH KE POINTERDOWN (Langsung meledak pas disentuh di HP tanpa delay klik)
    balloon.addEventListener('pointerdown', (e) => {
        balloon.remove();

        const popText = document.createElement('span');
        popText.classList.add('pop-text');
        popText.innerText = "MISQAIRINI ✨";
        
        // Menghitung koordinat sentuhan secara akurat di HP
        popText.style.left = `${e.clientX}px`;
        popText.style.top = `${e.clientY}px`;

        document.body.appendChild(popText);

        setTimeout(() => {
            popText.remove();
        }, 1000);
    });

    balloonContainer.appendChild(balloon);

    // Otomatis hapus saat keluar layar agar menghemat memori RAM HP
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, randomDuration * 1000);
}

// Interval kemunculan balon (Setiap 900ms agar pas, tidak terlalu padat di HP)
setInterval(createLoveBalloon, 900);


// 4. LOVE TIMER
const startDate = new Date('2024-01-01T00:00:00'); // <--- Ganti tanggal jadian kamu di sini bre!

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
    "Kakak sayang banget sama adek! ❤️",
    "Adek sayang banget sama kakak! ❤️",
    "Terima kasih sudah jadi pasangan terbaik di dunia! 🌸",
    "sayangg kangenn.. Nanti kita ketemu ya! 🥰",
    "Kamu adalah alasan tersenyumku hari ini. ✨",
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
            loveMessageDisplay.style.transition = "opacity 0.4s ease-in";
            loveMessageDisplay.style.opacity = 1;
        }, 100);
    });
}