// Test MCP Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Test MCP Website loaded successfully');
    
    // Initialize page functionality
    initializeNavigation();
    initializeContactForm();
    initializeCTAButton();
    
    // Add some intentional bugs for testing purposes
    addTestBugs();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
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
        });
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
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(message, form);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// CTA Button functionality
function initializeCTAButton() {
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
}

// Add some intentional bugs for testing MCP debugging capabilities
function addTestBugs() {
    // Bug 1: Undefined variable (uncomment to test)
    // console.log(undefinedVariable);
    
    // Bug 2: Incorrect selector (this will fail silently)
    const nonExistentElement = document.querySelector('.non-existent-class');
    
    // Bug 3: Potential memory leak with event listeners
    setInterval(() => {
        const elements = document.querySelectorAll('.temp-element');
        // This could create memory leaks if not handled properly
    }, 1000);
    
    // Bug 4: Type error simulation
    function buggyFunction(param) {
        // This will throw an error if param is not an object
        return param.nonExistentProperty.value;
    }
    
    // Bug 5: Missing error handling
    function riskyApiCall() {
        fetch('/api/nonexistent')
            .then(response => response.json())
            .then(data => {
                // No error handling for failed requests
                updateUI(data);
            });
    }
    
    // Bug 6: Incorrect async handling
    async function asyncBug() {
        const result = await Promise.resolve('test');
        // Missing try-catch block
        JSON.parse(result.invalidProperty);
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

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
}

// Call performance tracking
trackPerformance();
