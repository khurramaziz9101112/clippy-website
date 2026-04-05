// Clippy-style Tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Classic Clippy tooltip messages
    const clippyTooltips = [
        "It looks like you're reading this! Need help understanding?",
        "Hi there! I see you're exploring the website.",
        "Would you like some assistance with that?",
        "Let me know if you need help navigating!",
        "I'm here to help you find what you need!",
        "Looking for something specific? I can point you in the right direction!",
        "Need guidance? I'm your friendly paperclip assistant!",
        "Don't worry, I won't pop up uninvited like the old days!",
        "Just hovering around, ready to help if needed!",
        "Remember the good old Office days? I'm back and better than ever!"
    ];
    
    // Add tooltips to various elements
    function addClippyTooltips() {
        // Add tooltips to buttons
        const buttons = document.querySelectorAll('.btn, button, a[href]');
        buttons.forEach((button, index) => {
            if (index < clippyTooltips.length) {
                button.setAttribute('title', clippyTooltips[index]);
                button.setAttribute('data-clippy-tooltip', 'true');
                
                // Add hover effect
                button.addEventListener('mouseenter', function() {
                    if (Math.random() > 0.7) { // 30% chance to show tooltip
                        showFloatingTooltip(clippyTooltips[Math.floor(Math.random() * clippyTooltips.length)], this);
                    }
                });
            }
        });
        
        // Add tooltips to section headings
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach((heading, index) => {
            const tooltipIndex = (index + 3) % clippyTooltips.length;
            heading.setAttribute('title', clippyTooltips[tooltipIndex]);
            heading.setAttribute('data-clippy-tooltip', 'true');
        });
        
        // Add tooltips to value cards
        const cards = document.querySelectorAll('.value-card, .service-card, .portfolio-item');
        cards.forEach((card, index) => {
            const tooltipIndex = (index + 5) % clippyTooltips.length;
            card.setAttribute('title', clippyTooltips[tooltipIndex]);
            card.setAttribute('data-clippy-tooltip', 'true');
        });
    }
    
    // Show floating tooltip
    function showFloatingTooltip(text, element) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.floating-clippy-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'floating-clippy-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <div class="tooltip-header">
                    <span class="tooltip-icon">📎</span>
                    <span class="tooltip-title">Clippy Says:</span>
                </div>
                <div class="tooltip-text">${text}</div>
            </div>
        `;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = (rect.top - 100) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - 150) + 'px';
        tooltip.style.zIndex = '10000';
        
        // Add to page
        document.body.appendChild(tooltip);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }
    
    // Initialize tooltips
    addClippyTooltips();
    
    // Add CSS for floating tooltips
    const style = document.createElement('style');
    style.textContent = `
        .floating-clippy-tooltip {
            background: linear-gradient(135deg, #004E8C, #002D5C);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border: 2px solid #C0C0C0;
            max-width: 300px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            animation: clippyFloat 0.3s ease-out;
        }
        
        @keyframes clippyFloat {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .tooltip-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        .tooltip-icon {
            font-size: 16px;
        }
        
        .tooltip-title {
            color: #FFD700;
        }
        
        .tooltip-text {
            line-height: 1.4;
        }
        
        [data-clippy-tooltip="true"] {
            cursor: help;
            position: relative;
        }
        
        [data-clippy-tooltip="true"]:hover::after {
            content: attr(title);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #004E8C;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            border: 1px solid #C0C0C0;
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
});