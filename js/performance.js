// Performance Optimization Script
document.addEventListener('DOMContentLoaded', function() {
    // Monitor performance
    monitorPerformance();
    
    // Optimize animations
    optimizeAnimations();
    
    // Add performance hints
    addPerformanceHints();
    
    // Monitor resource loading
    monitorResources();
});

function monitorPerformance() {
    // Use Performance API if available
    if ('performance' in window) {
        // Measure page load time
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        // Log performance metrics (could send to analytics)
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Show performance score to users
        if (loadTime < 1000) {
            console.log('🚀 Excellent performance!');
        } else if (loadTime < 3000) {
            console.log('⚡ Good performance');
        } else {
            console.log('🐢 Performance could be improved');
        }
    }
    
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log(`LCP: ${lastEntry.startTime}ms`);
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            
            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
            
            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            let clsEntries = [];
            
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                        console.log(`CLS increased by ${entry.value} to ${clsValue}`);
                    }
                }
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.log('Performance monitoring not supported:', e);
        }
    }
}

function optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    const animatedElements = document.querySelectorAll('.animated, [class*="animate"], [class*="transition"]');
    
    animatedElements.forEach(element => {
        // Ensure animations are hardware accelerated
        element.style.willChange = 'transform, opacity';
        
        // Use transform for animations instead of top/left
        if (element.classList.contains('move')) {
            element.style.transform = 'translate3d(0, 0, 0)';
        }
    });
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Handle scroll-based animations efficiently
            updateScrollAnimations();
        }, 16); // ~60fps
    });
}

function updateScrollAnimations() {
    // Efficient scroll animation updates
    const animatedOnScroll = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    animatedOnScroll.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementVisible = 150;
        
        if (scrollY > elementTop - windowHeight + elementVisible) {
            element.classList.add('animated');
        }
    });
}

function addPerformanceHints() {
    // Add resource hints
    const hints = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
    ];
    
    hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical CSS
    const nonCriticalCSS = [
        'css/animations.css',
        'css/clippy.css'
    ];
    
    nonCriticalCSS.forEach(cssFile => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        link.media = 'print';
        link.onload = function() {
            link.media = 'all';
        };
        document.head.appendChild(link);
    });
}

function monitorResources() {
    // Monitor resource loading
    const resources = performance.getEntriesByType('resource');
    
    let totalSize = 0;
    resources.forEach(resource => {
        totalSize += resource.transferSize || 0;
        
        if (resource.duration > 1000) {
            console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
        }
    });
    
    console.log(`Total resources size: ${(totalSize / 1024).toFixed(2)} KB`);
    
    // Monitor memory usage (if supported)
    if ('memory' in performance) {
        const memory = performance.memory;
        console.log(`Memory usage: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB / ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
        
        // Warn if memory usage is high
        if (memory.usedJSHeapSize > 50000000) { // 50MB
            console.warn('High memory usage detected');
        }
    }
    
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFrameRate() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) {
                console.warn(`Low frame rate: ${fps} FPS`);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFrameRate);
    }
    
    requestAnimationFrame(checkFrameRate);
}

// Add performance badge for developers
function addPerformanceBadge() {
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        const badge = document.createElement('div');
        badge.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: #004E8C;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            z-index: 99999;
            opacity: 0.8;
        `;
        badge.textContent = 'Perf Monitor';
        badge.title = 'Performance monitoring active';
        document.body.appendChild(badge);
    }
}

// Initialize
setTimeout(addPerformanceBadge, 1000);