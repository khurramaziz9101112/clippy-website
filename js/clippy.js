// Clippy Character JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Create Clippy container
    const clippyContainer = document.createElement('div');
    clippyContainer.className = 'clippy-container';
    clippyContainer.id = 'clippy-container';
    
    // Clippy HTML structure
    clippyContainer.innerHTML = `
        <div class="clippy-character clippy-idle" id="clippy-character">
            <div class="paperclip-body">
                <div class="paperclip-outer"></div>
                <div class="paperclip-inner"></div>
            </div>
            <div class="clippy-eyes">
                <div class="eye">
                    <div class="pupil"></div>
                </div>
                <div class="eye">
                    <div class="pupil"></div>
                </div>
            </div>
            <div class="clippy-controls">
                <button class="clippy-btn clippy-help" title="Get Help">?</button>
                <button class="clippy-btn clippy-minimize" title="Minimize">−</button>
                <button class="clippy-btn clippy-close" title="Close">×</button>
            </div>
            <div class="clippy-speech" id="clippy-speech">
                Hi there! I'm Clippy! Need help?
            </div>
            <div class="clippy-help-topics" id="clippy-help-topics">
                <div class="help-topic" data-help="services">What services do you offer?</div>
                <div class="help-topic" data-help="portfolio">Can I see your work?</div>
                <div class="help-topic" data-help="contact">How do I contact you?</div>
                <div class="help-topic" data-help="about">Tell me about Clippy</div>
            </div>
        </div>
    `;
    
    // Add Clippy to the page
    document.body.appendChild(clippyContainer);
    
    // Get Clippy elements
    const clippyCharacter = document.getElementById('clippy-character');
    const clippySpeech = document.getElementById('clippy-speech');
    const helpTopics = document.getElementById('clippy-help-topics');
    
    // Classic Clippy quotes
    const clippyQuotes = [
        "Hi there! I'm Clippy! Need help?",
        "It looks like you're visiting a website. Would you like assistance?",
        "I'm here to help you navigate!",
        "Welcome to Clippy! Let me know if you need anything.",
        "Looking for something specific? I can help!",
        "Need directions? I'm your paperclip!",
        "Let's make this visit productive!",
        "I see you're exploring. Need guidance?"
    ];
    
    // Help responses
    const helpResponses = {
        services: "We offer AI-powered services including app development, content strategy, and intelligent solutions. Check our Services page for details!",
        portfolio: "You can see our latest projects on the Portfolio page. We build intelligent solutions that think!",
        contact: "Visit our Contact page to get in touch. We'd love to hear about your AI project!",
        about: "Clippy is an AI-first digital agency inspired by the classic Microsoft assistant. We build intelligence, not just software!"
    };
    
    // State management
    let isMinimized = false;
    let isHelpVisible = false;
    let currentQuoteIndex = 0;
    
    // Show speech bubble
    function showSpeech(text, duration = 3000) {
        clippySpeech.textContent = text;
        clippySpeech.classList.add('show');
        
        // Hide after duration
        setTimeout(() => {
            clippySpeech.classList.remove('show');
        }, duration);
    }
    
    // Toggle help topics
    function toggleHelpTopics() {
        isHelpVisible = !isHelpVisible;
        if (isHelpVisible) {
            helpTopics.classList.add('show');
            clippyCharacter.classList.remove('clippy-idle');
            clippyCharacter.classList.add('clippy-thinking');
        } else {
            helpTopics.classList.remove('show');
            clippyCharacter.classList.remove('clippy-thinking');
            clippyCharacter.classList.add('clippy-idle');
        }
    }
    
    // Toggle minimize
    function toggleMinimize() {
        isMinimized = !isMinimized;
        clippyContainer.classList.toggle('minimized', isMinimized);
        
        if (isMinimized) {
            showSpeech("I'll be here if you need me!");
            clippyCharacter.classList.remove('clippy-idle');
        } else {
            showSpeech("I'm back! How can I help?");
            clippyCharacter.classList.add('clippy-idle');
        }
    }
    
    // Close Clippy
    function closeClippy() {
        showSpeech("Goodbye! Click me if you need help later!");
        setTimeout(() => {
            clippyContainer.style.display = 'none';
            
            // Create a small revive button
            const reviveBtn = document.createElement('button');
            reviveBtn.className = 'btn btn-help';
            reviveBtn.textContent = 'Show Clippy';
            reviveBtn.style.position = 'fixed';
            reviveBtn.style.bottom = '10px';
            reviveBtn.style.right = '10px';
            reviveBtn.style.zIndex = '9998';
            reviveBtn.id = 'revive-clippy';
            
            reviveBtn.addEventListener('click', function() {
                clippyContainer.style.display = 'block';
                this.remove();
                showSpeech("I'm back! Missed me?");
            });
            
            document.body.appendChild(reviveBtn);
        }, 1000);
    }
    
    // Handle help topic click
    function handleHelpTopic(topic) {
        const response = helpResponses[topic];
        if (response) {
            showSpeech(response, 5000);
            clippyCharacter.classList.remove('clippy-thinking');
            clippyCharacter.classList.add('clippy-excited');
            
            setTimeout(() => {
                clippyCharacter.classList.remove('clippy-excited');
                clippyCharacter.classList.add('clippy-idle');
            }, 1000);
        }
        
        // Hide help topics
        helpTopics.classList.remove('show');
        isHelpVisible = false;
    }
    
    // Event Listeners
    clippyCharacter.addEventListener('click', function(e) {
        if (e.target.closest('.clippy-controls')) return;
        
        if (isMinimized) {
            toggleMinimize();
        } else {
            // Cycle through quotes
            currentQuoteIndex = (currentQuoteIndex + 1) % clippyQuotes.length;
            showSpeech(clippyQuotes[currentQuoteIndex]);
            
            // Add excited animation
            clippyCharacter.classList.remove('clippy-idle');
            clippyCharacter.classList.add('clippy-excited');
            
            setTimeout(() => {
                clippyCharacter.classList.remove('clippy-excited');
                clippyCharacter.classList.add('clippy-idle');
            }, 1000);
        }
    });
    
    // Control buttons
    document.querySelector('.clippy-help').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleHelpTopics();
    });
    
    document.querySelector('.clippy-minimize').addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMinimize();
    });
    
    document.querySelector('.clippy-close').addEventListener('click', function(e) {
        e.stopPropagation();
        closeClippy();
    });
    
    // Help topics
    document.querySelectorAll('.help-topic').forEach(topic => {
        topic.addEventListener('click', function(e) {
            e.stopPropagation();
            const helpType = this.dataset.help;
            handleHelpTopic(helpType);
        });
    });
    
    // Contextual help based on page
    function provideContextualHelp() {
        const currentPage = window.location.pathname.split('/').pop();
        
        switch(currentPage) {
            case 'services.html':
                setTimeout(() => {
                    showSpeech("Looking for specific AI services? I can help you find what you need!", 4000);
                }, 2000);
                break;
            case 'portfolio.html':
                setTimeout(() => {
                    showSpeech("Check out our latest AI projects! Each one has intelligent features.", 4000);
                }, 2000);
                break;
            case 'contact.html':
                setTimeout(() => {
                    showSpeech("Ready to start your AI journey? Fill out the form and I'll help!", 4000);
                }, 2000);
                break;
            case 'about.html':
                setTimeout(() => {
                    showSpeech("Learn more about our AI-first approach. We're inspired by classic tech!", 4000);
                }, 2000);
                break;
        }
    }
    
    // Form field help
    function setupFormHelp() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                let helpText = '';
                
                if (this.type === 'email') {
                    helpText = "Enter your email address so we can reply to you!";
                } else if (this.name === 'name') {
                    helpText = "What should we call you?";
                } else if (this.name === 'message') {
                    helpText = "Tell us about your AI project or question!";
                } else if (this.type === 'tel') {
                    helpText = "Phone number is optional, but helpful!";
                }
                
                if (helpText) {
                    showSpeech(helpText, 3000);
                }
            });
        });
    }
    
    // Initialize contextual features
    provideContextualHelp();
    setupFormHelp();
    
    // Easter egg: Classic Clippy quote on double-click
    let clickCount = 0;
    let clickTimer;
    
    clippyCharacter.addEventListener('dblclick', function() {
        showSpeech("It looks like you're writing a letter. Would you like help?", 5000);
        clippyCharacter.classList.remove('clippy-idle');
        clippyCharacter.classList.add('clippy-excited');
        
        setTimeout(() => {
            clippyCharacter.classList.remove('clippy-excited');
            clippyCharacter.classList.add('clippy-idle');
        }, 1000);
    });
    
    // Load Clippy CSS
    const clippyCSS = document.createElement('link');
    clippyCSS.rel = 'stylesheet';
    clippyCSS.href = 'css/clippy.css';
    document.head.appendChild(clippyCSS);
    
    console.log('Clippy loaded successfully! 🎉');
});