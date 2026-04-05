// Enhanced Clippy Assistant with Office 97/2000 Features
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the original Clippy to load
    setTimeout(function() {
        enhanceClippyAssistant();
    }, 1000);
    
    function enhanceClippyAssistant() {
        const clippyContainer = document.getElementById('clippy-container');
        if (!clippyContainer) return;
        
        // Add Office 97/2000 style window controls
        addWindowControls();
        
        // Add more interactive features
        addInteractiveFeatures();
        
        // Add sound effects (optional)
        addSoundEffects();
        
        // Add keyboard shortcuts
        addKeyboardShortcuts();
    }
    
    function addWindowControls() {
        const clippyCharacter = document.getElementById('clippy-character');
        if (!clippyCharacter) return;
        
        // Create Office-style title bar
        const titleBar = document.createElement('div');
        titleBar.className = 'clippy-title-bar';
        titleBar.innerHTML = `
            <div class="title-bar-left">
                <span class="title-bar-icon">📎</span>
                <span class="title-bar-text">Clippy Assistant</span>
            </div>
            <div class="title-bar-right">
                <button class="title-bar-btn minimize" title="Minimize">_</button>
                <button class="title-bar-btn maximize" title="Maximize">□</button>
                <button class="title-bar-btn close" title="Close">×</button>
            </div>
        `;
        
        // Insert title bar at the beginning
        clippyCharacter.insertBefore(titleBar, clippyCharacter.firstChild);
        
        // Add styles for title bar
        const style = document.createElement('style');
        style.textContent = `
            .clippy-title-bar {
                background: linear-gradient(to right, #000080, #1084D0);
                color: white;
                padding: 4px 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: 'MS Sans Serif', 'Segoe UI', sans-serif;
                font-size: 12px;
                border-bottom: 2px solid #C0C0C0;
                cursor: move;
                user-select: none;
            }
            
            .title-bar-left {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .title-bar-icon {
                font-size: 14px;
            }
            
            .title-bar-text {
                font-weight: bold;
            }
            
            .title-bar-right {
                display: flex;
                gap: 2px;
            }
            
            .title-bar-btn {
                background: #C0C0C0;
                border: 1px solid #808080;
                color: black;
                width: 18px;
                height: 16px;
                font-size: 10px;
                line-height: 14px;
                text-align: center;
                cursor: pointer;
                font-family: 'MS Sans Serif', sans-serif;
            }
            
            .title-bar-btn:hover {
                background: #D4D4D4;
            }
            
            .title-bar-btn:active {
                background: #A0A0A0;
                border-color: #404040;
            }
            
            .title-bar-btn.close {
                background: #C00000;
                color: white;
                border-color: #800000;
            }
            
            .title-bar-btn.close:hover {
                background: #E00000;
            }
        `;
        document.head.appendChild(style);
        
        // Make draggable
        makeDraggable(titleBar, clippyContainer);
        
        // Add button functionality
        const minimizeBtn = titleBar.querySelector('.minimize');
        const maximizeBtn = titleBar.querySelector('.maximize');
        const closeBtn = titleBar.querySelector('.close');
        
        minimizeBtn.addEventListener('click', function() {
            const minimizeEvent = new Event('clippyMinimize');
            document.dispatchEvent(minimizeEvent);
        });
        
        maximizeBtn.addEventListener('click', function() {
            clippyContainer.classList.toggle('maximized');
            if (clippyContainer.classList.contains('maximized')) {
                clippyContainer.style.width = '300px';
                clippyContainer.style.height = '400px';
                clippyContainer.style.bottom = '50%';
                clippyContainer.style.right = '50%';
                clippyContainer.style.transform = 'translate(50%, 50%)';
            } else {
                clippyContainer.style.width = '';
                clippyContainer.style.height = '';
                clippyContainer.style.bottom = '';
                clippyContainer.style.right = '';
                clippyContainer.style.transform = '';
            }
        });
        
        closeBtn.addEventListener('click', function() {
            clippyContainer.style.display = 'none';
            setTimeout(function() {
                clippyContainer.style.display = 'block';
            }, 5000); // Reappear after 5 seconds
        });
    }
    
    function makeDraggable(titleBar, container) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        titleBar.addEventListener('mousedown', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = container.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            container.style.position = 'fixed';
            container.style.left = (startLeft + deltaX) + 'px';
            container.style.top = (startTop + deltaY) + 'px';
            container.style.bottom = 'auto';
            container.style.right = 'auto';
            container.style.transform = 'none';
        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    }
    
    function addInteractiveFeatures() {
        // Add context menu
        document.addEventListener('contextmenu', function(e) {
            if (e.target.closest('#clippy-container')) {
                e.preventDefault();
                showContextMenu(e.clientX, e.clientY);
            }
        });
        
        // Add double-click to show help
        const clippyCharacter = document.getElementById('clippy-character');
        if (clippyCharacter) {
            clippyCharacter.addEventListener('dblclick', function() {
                showSpeech("You double-clicked me! That's how we did it in the old days! Need help with something?");
            });
        }
        
        // Add Easter eggs
        addEasterEggs();
    }
    
    function showContextMenu(x, y) {
        // Remove existing context menu
        const existingMenu = document.querySelector('.clippy-context-menu');
        if (existingMenu) existingMenu.remove();
        
        // Create context menu
        const menu = document.createElement('div');
        menu.className = 'clippy-context-menu';
        menu.innerHTML = `
            <div class="menu-item" data-action="help">Get Help</div>
            <div class="menu-item" data-action="tips">Show Tips</div>
            <div class="menu-item" data-action="animate">Do a Dance</div>
            <div class="menu-item" data-action="joke">Tell a Joke</div>
            <div class="menu-item" data-action="hide">Hide Clippy</div>
            <div class="menu-item" data-action="options">Options...</div>
        `;
        
        menu.style.position = 'fixed';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.style.zIndex = '10001';
        
        document.body.appendChild(menu);
        
        // Add styles
        if (!document.querySelector('#context-menu-styles')) {
            const style = document.createElement('style');
            style.id = 'context-menu-styles';
            style.textContent = `
                .clippy-context-menu {
                    background: #C0C0C0;
                    border: 2px solid #808080;
                    padding: 2px;
                    font-family: 'MS Sans Serif', sans-serif;
                    font-size: 12px;
                    min-width: 120px;
                    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
                }
                
                .menu-item {
                    padding: 4px 8px;
                    cursor: pointer;
                    color: black;
                }
                
                .menu-item:hover {
                    background: #000080;
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add click handlers
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const action = this.dataset.action;
                handleContextAction(action);
                menu.remove();
            });
        });
        
        // Remove menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                if (menu.parentNode) menu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
    }
    
    function handleContextAction(action) {
        const responses = {
            help: "Looking for help? Check out our Services page or ask me anything!",
            tips: "Tip: You can drag me around by my title bar! Double-click me for fun!",
            animate: "Doing the paperclip boogie! 🕺💃",
            joke: "Why did the paperclip go to school? To get a little bent out of shape!",
            hide: "Hiding... but I'll be back if you need me!",
            options: "Options would go here... if this were a real Office application!"
        };
        
        if (responses[action]) {
            showSpeech(responses[action]);
        }
        
        if (action === 'animate') {
            const clippyCharacter = document.getElementById('clippy-character');
            if (clippyCharacter) {
                clippyCharacter.classList.add('clippy-dancing');
                setTimeout(() => {
                    clippyCharacter.classList.remove('clippy-dancing');
                }, 2000);
            }
        }
        
        if (action === 'hide') {
            const clippyContainer = document.getElementById('clippy-container');
            if (clippyContainer) {
                clippyContainer.style.display = 'none';
                setTimeout(() => {
                    clippyContainer.style.display = 'block';
                    showSpeech("I'm back! Did you miss me?");
                }, 3000);
            }
        }
    }
    
    function addEasterEggs() {
        // Konami code Easter egg
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
                showSpeech("Cheat code activated! You found the secret! 🎮✨");
                konamiCode = [];
                
                // Fun animation
                const clippyCharacter = document.getElementById('clippy-character');
                if (clippyCharacter) {
                    clippyCharacter.classList.add('clippy-celebrate');
                    setTimeout(() => {
                        clippyCharacter.classList.remove('clippy-celebrate');
                    }, 3000);
                }
            }
        });
        
        // Add celebration animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dance {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(-10deg) scale(1.1); }
                50% { transform: rotate(10deg) scale(1.2); }
                75% { transform: rotate(-10deg) scale(1.1); }
            }
            
            .clippy-dancing {
                animation: dance 0.5s ease-in-out infinite;
            }
            
            @keyframes celebrate {
                0% { transform: scale(1); }
                50% { transform: scale(1.5) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            
            .clippy-celebrate {
                animation: celebrate 2s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    function addSoundEffects() {
        // Optional: Add sound effects for interactions
        // This would require audio files or Web Audio API
    }
    
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl+Shift+C to show Clippy
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                const clippyContainer = document.getElementById('clippy-container');
                if (clippyContainer) {
                    clippyContainer.style.display = 'block';
                    showSpeech("Keyboard shortcut activated! Hi there!");
                }
            }
            
            // Ctrl+Shift+H for help
            if (e.ctrlKey && e.shiftKey && e.key === 'H') {
                showSpeech("Help is on the way! What can I assist you with today?");
            }
        });
    }
    
    function showSpeech(text) {
        // Use existing clippy speech function if available
        if (window.showSpeech) {
            window.showSpeech(text);
        } else {
            // Fallback: create speech bubble
            const speech = document.getElementById('clippy-speech');
            if (speech) {
                speech.textContent = text;
                speech.classList.add('show');
                setTimeout(() => {
                    speech.classList.remove('show');
                }, 3000);
            }
        }
    }
});