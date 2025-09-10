// --- Particle Functions ---
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

function adjustParticlesForDevice() {
    if (window.innerWidth <= 768) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((p, i) => { if (i > 25) p.remove(); });
    }
}

// --- Tic Tac Toe Game ---
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
        e.target.style.color = currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)';
        if (checkWinner()) {
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer} wins! 🎉`;
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            document.getElementById('gameStatus').textContent = "It's a tie! 🤝";
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
    return winPatterns.some(p => p.every(i => gameBoard[i] === currentPlayer));
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard.fill('');
    gameActive = true;
    document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.game-cell').forEach((cell,i)=>{
        cell.textContent = '';
        cell.setAttribute('aria-label', `Cell ${i+1}, empty`);
        cell.style.color = '#fff';
    });
}

// --- Smooth scrolling ---
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(a=>{
        a.addEventListener('click', e=>{
            if (a.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
            }
            const navMenu = document.getElementById('nav-menu');
            if(navMenu) navMenu.classList.remove('show');
        });
    });
}

// --- Mobile nav ---
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if(navToggle && navMenu){
        navToggle.addEventListener('click', ()=> navMenu.classList.toggle('show'));
    }
}

// --- Auto slideshow with manual override ---
class SlideShow {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dots = container.querySelectorAll('.dot');
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.currentIndex = 0;
        this.autoSlideDelay = 4000;
        this.manualTimeout = null;

        this.showSlide(this.currentIndex);
        this.startAutoSlide();
        this.setupEvents();
    }

    showSlide(index) {
        this.slides.forEach((s,i)=> s.style.display = i===index ? 'block':'none');
        this.dots.forEach((d,i)=> d.classList.toggle('active', i===index));
        this.currentIndex = index;
    }

    nextSlide() { this.showSlide((this.currentIndex+1)%this.slides.length); }
    prevSlide() { this.showSlide((this.currentIndex-1+this.slides.length)%this.slides.length); }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoInterval = setInterval(()=> this.nextSlide(), this.autoSlideDelay);
    }

    stopAutoSlide() { clearInterval(this.autoInterval); }

    setupEvents() {
        if(this.prevBtn) this.prevBtn.addEventListener('click', ()=> this.manualSlide(()=> this.prevSlide()));
        if(this.nextBtn) this.nextBtn.addEventListener('click', ()=> this.manualSlide(()=> this.nextSlide()));
        this.dots.forEach((d,i)=>{
            d.addEventListener('click', ()=> this.manualSlide(()=> this.showSlide(i)));
        });
    }

    manualSlide(callback){
        callback();
        this.stopAutoSlide();
        clearTimeout(this.manualTimeout);
        this.manualTimeout = setTimeout(()=> this.startAutoSlide(), this.autoSlideDelay);
    }
}

function initSlideShows() {
    document.querySelectorAll('.slideshow-container').forEach(slideContainer=>{
        new SlideShow(slideContainer);
    });
}

// --- Initialize everything ---
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('🚀 Initializing...');
    createParticles();
    createTicTacToe();
    setupSmoothScrolling();
    setupMobileNavigation();
    initSlideShows();
    adjustParticlesForDevice();
});
