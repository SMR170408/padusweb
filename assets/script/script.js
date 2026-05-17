/* --- 1. FUNGSI MASUK (ENTER SITE) --- */
function enterSite() {
    const audio = document.getElementById('bg-music');
    const overlay = document.getElementById('enter-overlay');

    // Coba putar musik saat layar ditekan
    if (audio) {
        audio.play().then(() => {
            updateIcons(true);
            console.log("Musik menyala.");
        }).catch(error => {
            console.log("Autoplay gagal:", error);
        });
    }

    // Sembunyikan overlay
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

/* --- 2. LOGIKA MUSIC PLAYER --- */
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const iconPlay = document.querySelector('.icon-play');
const iconPause = document.querySelector('.icon-pause');

function updateIcons(isPlaying) {
    if (isPlaying) {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        musicBtn.classList.remove('paused');
    } else {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        musicBtn.classList.add('paused');
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            updateIcons(true);
        } else {
            audio.pause();
            updateIcons(false);
        }
    });
}

// Set awal ikon
updateIcons(false);

/* --- 3. LOGIKA MENU NAVIGASI --- */
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');
    const body = document.body;

    nav.classList.toggle('active');
    toggle.classList.toggle('active');

    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

/* --- 4. LOGIKA HEADER SCROLL --- */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* --- 5. LOGIKA TOMBOL MORE (Galeri) --- */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- A. LOGIKA GALERI (EXISTING) ---
    const btnMore = document.getElementById('btn-more');
    const galleryItems = document.querySelectorAll('.photo-card');
    let isExpanded = false;

    if (galleryItems.length > 5) {
        galleryItems.forEach((item, index) => {
            if (index >= 5) {
                item.style.display = 'none';
            }
        });
    } else {
        if (btnMore) btnMore.style.display = 'none';
    }

    if (btnMore) {
        btnMore.addEventListener('click', () => {
            isExpanded = !isExpanded;

            galleryItems.forEach((item, index) => {
                if (index >= 5) {
                    if (isExpanded) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                    }
                }
            });

            if (isExpanded) {
                btnMore.textContent = "Tampilkan Sedikit";
            } else {
                btnMore.textContent = "Tampilkan Lebih Banyak";
            }
        });
    }

    // --- B. LOGIKA BARCODE QR CODE (BARU) ---
    // Membuat QR Code otomatis berdasarkan URL website saat ini
    const currentUrl = window.location.href;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`;
    const qrImgElement = document.getElementById('website-qr');
    
    if (qrImgElement) {
        qrImgElement.src = qrApiUrl;
    }
});