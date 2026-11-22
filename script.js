// AOS Init
AOS.init({
  duration: 800,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('active', window.scrollY > 50);
});

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
});

// ─── SCROLL PROGRESS BAR ───
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc);
  z-index: 9999;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
});

// ─── TYPEWRITER EFFECT ───
const typewriterEl = document.querySelector('.hero-content h2');
if (typewriterEl) {
  const texts = [
    'Website & App Development',
    'Landing Page Profesional',
    'Company Profile Modern',
    'Sistem Informasi Custom',
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  typewriterEl.innerHTML = '<span class="tw-text"></span><span class="tw-cursor">|</span>';
  const twText = typewriterEl.querySelector('.tw-text');
  const twCursor = typewriterEl.querySelector('.tw-cursor');

  // Cursor blink style
  const style = document.createElement('style');
  style.textContent = `
    .tw-cursor {
      display: inline-block;
      color: var(--accent2);
      animation: blink 0.75s step-end infinite;
      margin-left: 2px;
      font-weight: 300;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function type() {
    const current = texts[textIndex];

    if (isDeleting) {
      twText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      twText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800; // pause sebelum hapus
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  // Mulai typewriter setelah sedikit delay
  setTimeout(type, 800);
}

// ─── KALKULATOR HARGA ───
const baseOptions = document.querySelectorAll('input[name="base"]');
const addonOptions = document.querySelectorAll('.calc-addon');
const calcTotal = document.getElementById('calcTotal');
const calcBreakdown = document.getElementById('calcBreakdown');

const baseNames = {
  '300000': 'Landing Page',
  '500000': 'Portfolio Website',
  '700000': 'Company Profile',
  '1500000': 'Sistem Informasi',
};

const addonNames = {
  '150000': 'Admin Panel',
  '100000': 'Responsive Mobile',
  '75000': 'Animasi Custom',
  '200000': 'Fitur E-Commerce',
  '50000': 'Integrasi WhatsApp',
};

function formatRupiah(num) {
  return 'Rp' + num.toLocaleString('id-ID').replace(/,/g, '.');
}

function updateCalc() {
  const baseVal = parseInt(document.querySelector('input[name="base"]:checked')?.value || 0);
  let addonsTotal = 0;
  let breakdown = [];

  // Base
  breakdown.push({ name: baseNames[baseVal], price: baseVal });

  // Addons
  addonOptions.forEach(cb => {
    if (cb.checked) {
      const val = parseInt(cb.value);
      addonsTotal += val;
      breakdown.push({ name: addonNames[cb.value], price: val });
    }
  });

  const total = baseVal + addonsTotal;

  // Update total dengan animasi pop
  calcTotal.textContent = formatRupiah(total);
  calcTotal.classList.add('pop');
  setTimeout(() => calcTotal.classList.remove('pop'), 300);

  // Update breakdown
  calcBreakdown.innerHTML = breakdown.map(item => `
    <div class="calc-breakdown-item">
      <span>${item.name}</span>
      <span>${formatRupiah(item.price)}</span>
    </div>
  `).join('');
}

if (calcTotal) {
  baseOptions.forEach(r => r.addEventListener('change', updateCalc));
  addonOptions.forEach(c => c.addEventListener('change', updateCalc));
  updateCalc();
}

// ─── SCRIPT SLIDER GAMBAR HERO AUTOMATIS ───
const gambarHero = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop", // Gambar 1 (Tech Team)
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", // Gambar 2 (Analisis & Web)
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"  // Gambar 3 (UI/UX Design)
];

let indexSekarang = 0;
const elemenGambar = document.getElementById("heroSlider");

function gantiGambarHero() {
  // Tambahkan efek transisi memudar (fade-out) sebelum ganti gambar
  elemenGambar.style.opacity = 0;

  setTimeout(() => {
    // Naikkan indeks gambar, kalau sudah di ujung balik lagi ke 0
    indexSekarang = (indexSekarang + 1) % gambarHero.length;
    
    // Ganti source gambar baru
    elemenGambar.src = gambarHero[indexSekarang];
    
    // Kembalikan efek transisi muncul (fade-in)
    elemenGambar.style.opacity = 1;
  }, 400); // Menunggu 0.4 detik saat gambar memudar transparan
}

// Jalankan fungsi ganti gambar setiap 4000 milidetik (4 detik)
setInterval(gantiGambarHero, 4000);