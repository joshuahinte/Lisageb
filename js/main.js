
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const titles = ('Happy Birthday mein Schatz! ❤️').split('')
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 300); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};


// Modal Funktionen
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Geschenkkasten-Animation beim Öffnen
    const giftBox = document.querySelector('.gift-box');
    giftBox.style.animation = 'giftOpen 0.5s ease-out';
    setTimeout(() => {
        giftBox.style.animation = 'giftBounce 2s ease-in-out infinite';
    }, 500);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Login Button Event Listener
document.getElementById('loginButton').addEventListener('click', openLoginModal);

// Modal schließen wenn außerhalb geklickt wird
document.getElementById('loginModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLoginModal();
    }
});

// ESC-Taste zum Schließen des Modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLoginModal();
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Loading state
    submitBtn.textContent = 'Anmeldung läuft...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Login successful
            closeLoginModal();
            showHomePage(username);
        } else {
            // Login failed
            errorMessage.textContent = data.message || 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
    } finally {
        // Reset button state
        submitBtn.textContent = 'Anmelden';
        submitBtn.disabled = false;
    }
});

// Show home page after successful login
function showHomePage(username) {
    // Verstecke die Blumen und den Login-Bereich
    document.querySelector('.container').style.display = 'none';
    
    const homeContainer = document.createElement('div');
    homeContainer.className = 'home-container';
    homeContainer.innerHTML = `
        <h1>🌸 Willkommen, ${username}! 🌸</h1>
        <p>Sie haben das Geschenk erfolgreich geöffnet! Hier ist Ihre persönliche Startseite.</p>
        <p>Genießen Sie Ihre Zeit auf unserer wunderschönen Website!</p>
        <button class="logout-btn" onclick="logout()">Abmelden</button>
    `;
    
    document.body.appendChild(homeContainer);
    homeContainer.style.display = 'block';
}

// Logout function
function logout() {
    // Clear any stored session data
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Remove home container
    const homeContainer = document.querySelector('.home-container');
    if (homeContainer) {
        homeContainer.remove();
    }
    
    // Show flowers and login section again
    document.querySelector('.container').style.display = 'flex';
}

// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const loginBtn = document.getElementById('loginButton');
    const giftBox = document.querySelector('.gift-box');
    
    // Add focus effects to inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to login button
    loginBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    loginBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click effect
    loginBtn.addEventListener('click', function() {
        this.style.transform = 'translateY(-1px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(0) scale(1)';
        }, 150);
    });
    
    // Add hover effect to gift box
    giftBox.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    giftBox.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add click effect to gift box
    giftBox.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add floating particles in the background
function createFloatingParticles() {
    const body = document.body;
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 3 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animation = `particleFloat ${4 + Math.random() * 3}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.zIndex = '0';
        
        body.appendChild(particle);
    }
}

// Add flower interaction effects
function addFlowerEffects() {
    const mainFlower = document.querySelector('.main-flower');
    const smallFlowers = document.querySelectorAll('.small-flower');
    
    // Add mouse move effect to main flower
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        
        mainFlower.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Add click effects to small flowers
    smallFlowers.forEach((flower, index) => {
        flower.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
            
            // Create sparkle effect
            createSparkle(e.clientX, e.clientY);
        });
    });
}

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '20px';
    sparkle.style.height = '20px';
    sparkle.style.background = 'radial-gradient(circle, #fff, #ffd93d, transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.3;
        }
        50% { 
            transform: translateY(-15px) translateX(8px); 
            opacity: 0.8;
        }
    }
    
    @keyframes giftOpen {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes sparkle {
        0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 1;
        }
        50% { 
            transform: scale(1) rotate(180deg); 
            opacity: 1;
        }
        100% { 
            transform: scale(0) rotate(360deg); 
            opacity: 0;
        }
    }
    
    .small-flower {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .small-flower:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Initialize effects
createFloatingParticles();
addFlowerEffects();

// Add heart click effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart')) {
        e.target.style.transform = 'scale(1.5) rotate(360deg)';
        e.target.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
            e.target.style.transform = '';
            e.target.style.filter = '';
        }, 500);
    }
}); 