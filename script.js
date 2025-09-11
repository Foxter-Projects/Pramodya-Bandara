// ---- Particle Functions ----
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

// ---- Tic Tac Toe Game ----
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

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
    }
}

// Add scroll effect to navigation
function setupNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    function updateNavBackground() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(15px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground(); // Call once to set initial state
}

// Highlight active navigation link based on current page
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        // Handle different page scenarios
        if (currentPage === 'projects.html' && linkHref === 'projects.html') {
            link.classList.add('active');
        } else if ((currentPage === 'index.html' || currentPage === '') && linkHref.startsWith('#')) {
            // For index page, highlight based on hash or default to home
            if (linkHref === '#home' || (linkHref === window.location.hash && window.location.hash)) {
                link.classList.add('active');
            }
        }
    });
}

// Add intersection observer for section highlighting on index page
function setupSectionHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const correspondingLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
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
        this.autoSlideDelay = 2000;
        this.manualTimeout = 2000;
        
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

// Create floating particles for contact section
function createContactParticles() {
    const contactParticlesContainer = document.getElementById('contactParticles');
    if (!contactParticlesContainer) return;
    
    // Clear existing particles
    contactParticlesContainer.innerHTML = '';
    
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
    
    console.log('✓ Contact particles created');
}

// ---- Initialize everything ----
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('🚀 Initializing...');
    createParticles();
    createTicTacToe();
    setupSmoothScrolling();
    setupMobileNavigation();
    createContactParticles();
    initSlideShows();
    adjustParticlesForDevice();
});
