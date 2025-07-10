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
        setTimeout(appendTitle, 300);
      } else {
        // Login-Button nach Titel-Animation anzeigen
        document.getElementById('loginButton').classList.remove('hidden');
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};




// Login Button Event Listener
document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = 'present.html';
});


// Add interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const loginBtn = document.getElementById('loginButton');
    
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
        this.style.color = 'rgb(247, 77, 173)';
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
    
});


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
`;
document.head.appendChild(style);

// Initialize effects
createFloatingParticles();

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