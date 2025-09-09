// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Check if container exists
    if (!particlesContainer) {
        console.error('Particles container not found! Make sure you have <div class="particles" id="particles"></div> in your HTML');
        return;
    }
    
    // Clear existing particles first
    particlesContainer.innerHTML = '';
    
    const numberOfParticles = 50;
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff6b6b'];

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay (0 to 6 seconds)
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random animation duration (3 to 6 seconds)
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random color selection
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size variation
        const size = Math.random() * 2 + 1; // 1-3px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Add the particle to container
        particlesContainer.appendChild(particle);
    }
    
    console.log(`✓ Created ${numberOfParticles} particles successfully`);
}

function adjustParticlesForDevice() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce particles on mobile for better performance
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 25) { // Keep only first 25 particles on mobile
                particle.remove();
            }
        });
        console.log('✓ Reduced particles for mobile device');
    }
}

// Tic-Tac-Toe Game Logic (only for index.html)
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createTicTacToe() {
    const board = document.getElementById('ticTacToe');
    if (!board) return; // Only run if element exists
    
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
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    const gameStatus = document.getElementById('gameStatus');
    if (gameStatus) {
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.setAttribute('aria-label', `Cell ${index+1}, empty`);
        cell.style.color = '#fff';
    });
    
    console.log('✓ Game reset');
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
            
            // Close mobile menu if open - FIX: Add null check
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
    }
}

// Create floating particles for contact section
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

// Add scroll effect to navigation
function setupNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return; // Add this null check
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
}

// Highlight active navigation link based on current page
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

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing portfolio website...');
    
    // Initialize all features
    createParticles();
    createTicTacToe();
    createContactParticles();
    setupSmoothScrolling();
    setupMobileNavigation();
    setupNavScrollEffect();
    highlightActiveNavLink();
    
    // Adjust particles for mobile devices (call after particles are created)
    setTimeout(() => {
        adjustParticlesForDevice();
    }, 50);
    
    // Debug: Check if particles are working
    setTimeout(() => {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            console.log('Particles container found:', particlesContainer);
            console.log('Number of particles created:', particlesContainer.children.length);
            if (particlesContainer.children.length === 0) {
                console.error('❌ No particles were created! Check your CSS animations.');
            }
        } else {
            console.error('❌ Particles container not found in DOM!');
        }
    }, 100);
});