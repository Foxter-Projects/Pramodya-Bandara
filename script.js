// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
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
            document.getElementById('gameStatus').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('gameStatus').textContent = 'It\'s a tie!';
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
    document.getElementById('gameStatus').textContent = `Player ${currentPlayer}'s turn`;
    
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.setAttribute('aria-label', `Cell ${parseInt(cell.dataset.index)+1}, empty`);
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
            document.getElementById('nav-menu').classList.remove('show');
        });
    });
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.getElementById('nav-menu').classList.toggle('show');
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
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
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
    createParticles();
    createTicTacToe();
    createContactParticles();
    setupSmoothScrolling();
    setupMobileNavigation();
    setupNavScrollEffect();
    highlightActiveNavLink();
});