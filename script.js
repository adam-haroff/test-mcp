// Test MCP Website JavaScript
// DOM Cache for performance optimization
const DOMCache = {
    navLinks: null,
    contactForm: null,
    ctaButton: null,
    header: null,
    
    // Initialize DOM cache
    init() {
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.contactForm = document.getElementById('contact-form');
        this.ctaButton = document.getElementById('cta-button');
        this.header = document.querySelector('header');
    },
    
    // Clear cache for cleanup
    clear() {
        this.navLinks = null;
        this.contactForm = null;
        this.ctaButton = null;
        this.header = null;
    }
};

// Resource management for cleanup
const ResourceManager = {
    intervals: new Set(),
    listeners: new Map(),
    
    addInterval(intervalId) {
        this.intervals.add(intervalId);
    },
    
    addListener(element, event, handler) {
        const key = `${element}-${event}`;
        this.listeners.set(key, { element, event, handler });
    },
    
    cleanup() {
        // Clear all intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();
        
        // Remove all event listeners
        this.listeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.listeners.clear();
        
        // Clear DOM cache
        DOMCache.clear();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Test MCP Website loaded successfully');
    
    // Initialize DOM cache first
    DOMCache.init();
    
    // Initialize page functionality
    initializeNavigation();
    initializeContactForm();
    initializeCTAButton();
    
    // Add some intentional bugs for testing purposes (optimized)
    addTestBugs();
    
    // Setup cleanup on page unload
    window.addEventListener('beforeunload', () => {
        ResourceManager.cleanup();
    });
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = DOMCache.navLinks;
    
    navLinks.forEach(link => {
        const clickHandler = function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = DOMCache.header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        };
        
        link.addEventListener('click', clickHandler);
        ResourceManager.addListener(link, 'click', clickHandler);
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = DOMCache.contactForm;
    
    if (form) {
        const submitHandler = function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            if (validateForm(formData)) {
                showMessage('Message sent successfully!', 'success');
                form.reset();
            } else {
                showMessage('Please fill in all fields correctly.', 'error');
            }
        };
        
        form.addEventListener('submit', submitHandler);
        ResourceManager.addListener(form, 'submit', submitHandler);
    }
}

// Form validation
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

// Message display function
function showMessage(text, type) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const form = DOMCache.contactForm;
    if (form && form.parentNode) {
        form.parentNode.insertBefore(message, form);
        
        // Use timeout with cleanup tracking
        const timeoutId = setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
        ResourceManager.addInterval(timeoutId);
    }
}

// CTA Button functionality
function initializeCTAButton() {
    const ctaButton = DOMCache.ctaButton;
    
    if (ctaButton) {
        const clickHandler = function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = DOMCache.header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        };
        
        ctaButton.addEventListener('click', clickHandler);
        ResourceManager.addListener(ctaButton, 'click', clickHandler);
    }
}

// Add some intentional bugs for testing MCP debugging capabilities (optimized)
function addTestBugs() {
    // Bug 1: Undefined variable (uncomment to test)
    // console.log(undefinedVariable);
    
    // Bug 2: Incorrect selector (this will fail silently)
    const nonExistentElement = document.querySelector('.non-existent-class');
    
    // Bug 3: Fixed potential memory leak with proper cleanup
    // Reduced frequency and added to resource manager
    const intervalId = setInterval(() => {
        // Only query if actually needed to reduce performance impact
        if (document.querySelector('.temp-element')) {
            const elements = document.querySelectorAll('.temp-element');
            // Process elements if they exist
        }
    }, 5000); // Reduced frequency from 1000ms to 5000ms
    
    ResourceManager.addInterval(intervalId);
    
    // Bug 4: Type error simulation (wrapped in try-catch for safety)
    function buggyFunction(param) {
        try {
            // This will throw an error if param is not an object
            return param.nonExistentProperty.value;
        } catch (error) {
            console.warn('Bug 4 - Type error caught:', error.message);
            return null;
        }
    }
    
    // Bug 5: Added error handling for API calls
    function riskyApiCall() {
        fetch('/api/nonexistent')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateUI(data);
            })
            .catch(error => {
                console.warn('Bug 5 - API call failed:', error.message);
                // Handle error gracefully
            });
    }
    
    // Bug 6: Added proper async error handling
    async function asyncBug() {
        try {
            const result = await Promise.resolve('test');
            // Added try-catch block
            JSON.parse(result.invalidProperty);
        } catch (error) {
            console.warn('Bug 6 - Async error caught:', error.message);
        }
    }
}

// Utility functions
function updateUI(data) {
    // Placeholder function for UI updates
    console.log('Updating UI with data:', data);
}

// Debug helper functions
function debugInfo() {
    return {
        userAgent: navigator.userAgent,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
}

// Enhanced performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            // More accurate performance measurement
            if (performance.timing.loadEventEnd && performance.timing.navigationStart) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
                
                // Additional performance metrics
                const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
                const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
                const firstContentfulPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');
                
                console.log('DOM Content Loaded:', domContentLoaded + 'ms');
                if (firstPaint) console.log('First Paint:', firstPaint.startTime + 'ms');
                if (firstContentfulPaint) console.log('First Contentful Paint:', firstContentfulPaint.startTime + 'ms');
                
                // Memory usage if available
                if ('memory' in performance) {
                    console.log('Memory usage:', {
                        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB',
                        allocated: Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB',
                        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB'
                    });
                }
            }
        });
        
        // Monitor resource loading
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'measure' || entry.entryType === 'mark') {
                        console.log(`Performance ${entry.entryType}:`, entry.name, entry.duration || entry.startTime);
                    }
                });
            });
            
            try {
                observer.observe({ entryTypes: ['measure', 'mark', 'navigation'] });
            } catch (e) {
                console.warn('Performance observer not fully supported');
            }
        }
    }
}

// Performance markers for critical actions
function markPerformance(name) {
    if ('performance' in window && performance.mark) {
        performance.mark(name);
    }
}

function measurePerformance(name, startMark, endMark) {
    if ('performance' in window && performance.measure) {
        try {
            performance.measure(name, startMark, endMark);
        } catch (e) {
            console.warn('Could not measure performance:', e.message);
        }
    }
}

// Call performance tracking
trackPerformance();
