// Clippy Interactive JavaScript
// Office 97/2000 Style Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    const clippy = document.getElementById('clippy-character');
    const speechBubbles = document.querySelectorAll('.clippy-speech-bubble');
    
    // Make Clippy interactive
    if (clippy) {
        clippy.addEventListener('click', function() {
            // Random Clippy quotes from conversations
            const quotes = [
                "Hi there! Need help with something?",
                "It looks like you're exploring my website!",
                "Would you like assistance with your AI project?",
                "I'm here to help you build something intelligent!",
                "Remember the good old Office days?",
                "Let me know if you need any guidance!",
                "Looking for something specific?",
                "I'm your friendly neighborhood Clippy!",
                "Building intelligence, not just software!",
                "Let's transform your ideas into reality!",
                "AI-powered solutions that actually work!",
                "Ready to build something amazing together?"
            ];
            
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            showClippyMessage(randomQuote);
        });
        
        // Add hover effect
        clippy.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        clippy.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add hover effect to speech bubbles
    speechBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add Office 97 style console log
    console.log('%c📎 Clippy AI Website Loaded!', 'color: #004E8C; font-size: 16px; font-weight: bold;');
    console.log('%c"Hi there! I see you\'re checking the console. Need help with something?" - Clippy', 'color: #008000; font-style: italic;');
    
    // Add Easter egg - Konami Code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showClippyMessage("Cheat code activated! You found the secret! 🎮✨");
            konamiCode = [];
            
            // Celebration animation
            if (clippy) {
                clippy.style.animation = 'none';
                clippy.style.transform = 'scale(2) rotate(360deg)';
                clippy.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    clippy.style.animation = 'float 3s ease-in-out infinite';
                    clippy.style.transform = 'scale(1) rotate(0deg)';
                }, 1000);
            }
        }
    });
    
    // Add tooltips to value cards
    const valueCards = document.querySelectorAll('.value-card, .service-card');
    valueCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const tooltips = [
                "This is one of my specialties!",
                "Let me show you how this works!",
                "I'm really good at this!",
                "Want to learn more about this?",
                "This is what makes me unique!",
                "Let's build something like this!",
                "I can help you with this!",
                "This is where the magic happens!"
            ];
            
            if (Math.random() > 0.7) { // 30% chance
                const tooltip = tooltips[Math.floor(Math.random() * tooltips.length)];
                showFloatingTooltip(tooltip, this);
            }
        });
    });
    
    // Show Clippy message function
    function showClippyMessage(message) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'clippy-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <span class="message-icon">📎</span>
                    <span class="message-title">Clippy Says:</span>
                </div>
                <div class="message-text">${message}</div>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#clippy-message-styles')) {
            const style = document.createElement('style');
            style.id = 'clippy-message-styles';
            style.textContent = `
                .clippy-message {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #004E8C, #002D5C);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    border: 2px solid #C0C0C0;
                    max-width: 300px;
                    font-family: 'Comic Neue', cursive;
                    font-size: 14px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease-out;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .message-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                    font-weight: bold;
                }
                
                .message-icon {
                    font-size: 16px;
                }
                
                .message-title {
                    color: #FFD700;
                }
                
                .message-text {
                    line-height: 1.4;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // Show floating tooltip
    function showFloatingTooltip(text, element) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.floating-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'floating-tooltip';
        tooltip.textContent = text;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 40) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.zIndex = '10000';
        tooltip.style.background = '#004E8C';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.border = '1px solid #C0C0C0';
        tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        
        // Add to page
        document.body.appendChild(tooltip);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 2000);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+C to show Clippy message
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            showClippyMessage("Keyboard shortcut activated! Hi there! Need help with something?");
        }
        
        // Ctrl+Shift+H for help
        if (e.ctrlKey && e.shiftKey && e.key === 'H') {
            showClippyMessage("Help is on the way! What can I assist you with today?");
        }
    });
    
    // Add page load animation
    window.addEventListener('load', function() {
        // Animate Clippy on load
        if (clippy) {
            clippy.style.opacity = '0';
            clippy.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                clippy.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                clippy.style.opacity = '1';
                clippy.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Show welcome message
        setTimeout(() => {
            showClippyMessage("Welcome to Clippy AI! I'm here to help you build something intelligent!");
        }, 1000);
    });
});