// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    particlesContainer.innerHTML = '';
    const numberOfParticles = 50;
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff6b6b'];

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particlesContainer.appendChild(particle);
    }
}

// Reduce particles on mobile
function adjustParticlesForDevice() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 25) particle.remove();
        });
    }
}

// Tic-Tac-Toe Game Logic
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createTicTacToe() {
    const board = document.getElementById('ticTacToe');
    if (!board) return;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.setAttribute('aria-label', `Cell ${i+1}, empty`);
        cell.addEventListener('click', makeMove);
        board.appendChild(cell);
    }
}

function makeMove(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.setAttribute('aria-label', `Cell ${parseInt(index)+1}, occupied by ${currentPlayer}`);
        e.target.style.color = currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)';
        
        if (checkWinner()) {
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer} wins! 🎉`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('gameStatus').textContent = 'It\'s a tie! 🤝';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(i => gameBoard[i] === currentPlayer));
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll('.game-cell').forEach((cell, i) => {
        cell.textContent = '';
        cell.setAttribute('aria-label', `Cell ${i+1}, empty`);
        cell.style.color = '#fff';
    });
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) navMenu.classList.remove('show');
        });
    });
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
}

// Contact particles
function createContactParticles() {
    const contactParticlesContainer = document.getElementById('contactParticles');
    if (!contactParticlesContainer) return;

    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', '#ff6b6b'];
    const numberOfParticles = 15;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particle.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
        contactParticlesContainer.appendChild(particle);
    }
}

// Nav scroll effect
function setupNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 50 ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.9)';
    });
}

// Highlight active link
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === '#home') link.classList.add('active');
        else if (linkPage === currentPage) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// ----- New: Slideshow for project sections -----
function initProjectSlideshows() {
    const slideshows = document.querySelectorAll('.media-slideshow');
    slideshows.forEach(slideshow => {
        let currentIndex = 0;
        const slides = slideshow.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.prev-slide');
        const nextBtn = slideshow.querySelector('.next-slide');

        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        }

        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        // Optional: autoplay every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);

        showSlide(currentIndex);
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    adjustParticlesForDevice();
    createTicTacToe();
    createContactParticles();
    setupSmoothScrolling();
    setupMobileNavigation();
    setupNavScrollEffect();
    highlightActiveNavLink();
    initProjectSlideshows();
});
