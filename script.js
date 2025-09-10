// -------------------- Particles --------------------

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

// -------------------- Tic-Tac-Toe --------------------

let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

function createTicTacToe() {
    const board = document.getElementById('ticTacToe');
    if (!board) return;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.setAttribute('aria-label', `Cell ${i + 1}, empty`);
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
            document.getElementById('gameStatus').textContent = `It's a tie! 🤝`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => pattern.every(i => gameBoard[i] === currentPlayer));
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard.fill('');
    gameActive = true;

    document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.game-cell').forEach((cell, index) => {
        cell.textContent = '';
        cell.style.color = '#fff';
        cell.setAttribute('aria-label', `Cell ${index+1}, empty`);
    });
}

// -------------------- Smooth Scrolling --------------------

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

// -------------------- Mobile Navigation --------------------

function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }
}

// -------------------- Contact Particles --------------------

function createContactParticles() {
    const container = document.getElementById('contactParticles');
    if (!container) return;

    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', '#ff6b6b'];
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        particle.style.left = Math.random()*100+'%';
        particle.style.animationDelay = Math.random()*8+'s';
        particle.style.animationDuration = (Math.random()*3+5)+'s';
        particle.style.setProperty('--particle-color', colors[Math.floor(Math.random()*colors.length)]);
        container.appendChild(particle);
    }
}

// -------------------- Navigation Scroll Effect --------------------

function setupNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 50 ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.9)';
    });
}

// -------------------- Highlight Active Nav Link --------------------

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' || currentPage === '') && linkPage === '#home') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// -------------------- Project Slideshows --------------------

function initProjectSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => {
        const slides = Array.from(slideshow.children);
        let currentIndex = 0;
        slides.forEach((slide, i) => {
            slide.style.position = 'absolute';
            slide.style.top = 0;
            slide.style.left = 0;
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.transition = 'opacity 0.5s ease-in-out';
            slide.style.opacity = i === 0 ? 1 : 0;
        });

        setInterval(() => {
            slides[currentIndex].style.opacity = 0;
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.opacity = 1;
        }, 4000); // 4s per slide
    });
}

// -------------------- Initialize --------------------

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing portfolio website...');
    createParticles();
    adjustParticlesForDevice();
    createTicTacToe();
    createContactParticles();
    setupSmoothScrolling();
    setupMobileNavigation();
    setupNavScrollEffect();
    highlightActiveNavLink();
    initProjectSlideshows();

    // Debug particles
    setTimeout(() => {
        const container = document.getElementById('particles');
        if (!container || container.children.length === 0) console.error('❌ No particles created!');
    }, 100);
});
