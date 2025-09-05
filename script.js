// Test MCP Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Test MCP Website loaded successfully');
        
        // Initialize page functionality with error handling
        initializeNavigation();
        initializeContactForm();
        initializeCTAButton();
        
        // Add safe test functions for debugging purposes
        addTestBugs();
        
    } catch (error) {
        console.error('Error during page initialization:', error.message);
    }
});

// Navigation functionality
function initializeNavigation() {
    try {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (navLinks.length === 0) {
            console.warn('No navigation links found');
            return;
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                try {
                    e.preventDefault();
                    const targetId = this.getAttribute('href')?.substring(1);
                    
                    if (!targetId) {
                        console.warn('No target ID found for navigation link');
                        return;
                    }
                    
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const header = document.querySelector('header');
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        console.warn(`Target element with ID '${targetId}' not found`);
                    }
                } catch (error) {
                    console.error('Error in navigation click handler:', error.message);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing navigation:', error.message);
    }
}

// Contact form functionality
function initializeContactForm() {
    try {
        const form = document.getElementById('contact-form');
        
        if (!form) {
            console.warn('Contact form not found');
            return;
        }
        
        form.addEventListener('submit', function(e) {
            try {
                e.preventDefault();
                
                const nameElement = document.getElementById('name');
                const emailElement = document.getElementById('email');
                const messageElement = document.getElementById('message');
                
                if (!nameElement || !emailElement || !messageElement) {
                    console.error('One or more form elements not found');
                    showMessage('Form error: Missing form elements.', 'error');
                    return;
                }
                
                const formData = {
                    name: nameElement.value,
                    email: emailElement.value,
                    message: messageElement.value
                };
                
                // Simulate form submission
                if (validateForm(formData)) {
                    showMessage('Message sent successfully!', 'success');
                    form.reset();
                } else {
                    showMessage('Please fill in all fields correctly.', 'error');
                }
            } catch (error) {
                console.error('Error in form submission:', error.message);
                showMessage('An error occurred while processing your message.', 'error');
            }
        });
    } catch (error) {
        console.error('Error initializing contact form:', error.message);
    }
}

// Form validation
function validateForm(data) {
    try {
        if (!data || typeof data !== 'object') {
            console.error('Invalid form data provided to validateForm');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || !data.name.trim() || 
            !data.email || !data.email.trim() || 
            !data.message || !data.message.trim()) {
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error in form validation:', error.message);
        return false;
    }
}

// Message display function
function showMessage(text, type) {
    try {
        if (!text || typeof text !== 'string') {
            console.error('Invalid message text provided');
            return;
        }
        
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `message ${type || 'info'}`;
        message.textContent = text;
        
        const form = document.getElementById('contact-form');
        if (!form || !form.parentNode) {
            console.error('Cannot display message: form or parent not found');
            return;
        }
        
        form.parentNode.insertBefore(message, form);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            try {
                if (message && message.parentNode) {
                    message.remove();
                }
            } catch (error) {
                console.error('Error removing message:', error.message);
            }
        }, 5000);
        
    } catch (error) {
        console.error('Error displaying message:', error.message);
    }
}

// CTA Button functionality
function initializeCTAButton() {
    try {
        const ctaButton = document.getElementById('cta-button');
        
        if (!ctaButton) {
            console.warn('CTA button not found');
            return;
        }
        
        ctaButton.addEventListener('click', function() {
            try {
                const aboutSection = document.getElementById('about');
                
                if (!aboutSection) {
                    console.warn('About section not found');
                    return;
                }
                
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error in CTA button click handler:', error.message);
            }
        });
    } catch (error) {
        console.error('Error initializing CTA button:', error.message);
    }
}

// Test functions for MCP debugging capabilities (now safe and documented)
function addTestBugs() {
    // Initialize test interval storage
    window.testIntervals = window.testIntervals || [];
    
    // Test 1: Safe undefined variable test
    function testUndefinedVariable() {
        try {
            // This is a test function - safely handles undefined variables
            const testVar = typeof undefinedVariable !== 'undefined' ? undefinedVariable : 'undefined variable detected';
            console.log('Test 1 - Undefined variable handling:', testVar);
        } catch (error) {
            console.log('Test 1 - Caught undefined variable error:', error.message);
        }
    }
    
    // Test 2: Safe DOM selector test
    const nonExistentElement = document.querySelector('.non-existent-class');
    if (!nonExistentElement) {
        console.log('Test 2 - Non-existent element handled safely');
    }
    
    // Test 3: Memory leak prevention with proper cleanup
    const testInterval = setInterval(() => {
        const elements = document.querySelectorAll('.temp-element');
        // Test function - safely queries DOM elements
        console.log('Test 3 - DOM query test, found elements:', elements.length);
    }, 5000); // Reduced frequency to 5 seconds
    
    // Store interval ID for cleanup
    window.testIntervals.push(testInterval);
    
    // Auto-cleanup after 30 seconds to prevent memory leaks
    setTimeout(() => {
        clearInterval(testInterval);
        const index = window.testIntervals.indexOf(testInterval);
        if (index > -1) {
            window.testIntervals.splice(index, 1);
        }
        console.log('Test 3 - Interval cleaned up to prevent memory leaks');
    }, 30000);
    
    // Test 4: Safe type error simulation
    function testBuggyFunction(param) {
        try {
            // This is a test function - safely handles type errors
            if (!param || typeof param !== 'object') {
                console.log('Test 4 - Invalid parameter type detected:', typeof param);
                return null;
            }
            
            if (!param.hasOwnProperty('nonExistentProperty')) {
                console.log('Test 4 - Missing property detected safely');
                return null;
            }
            
            return param.nonExistentProperty.value;
        } catch (error) {
            console.log('Test 4 - Caught type error:', error.message);
            return null;
        }
    }
    
    // Test 5: Safe API call with proper error handling
    function testRiskyApiCall() {
        fetch('/api/nonexistent')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Test 5 - API call succeeded:', data);
                updateUI(data);
            })
            .catch(error => {
                console.log('Test 5 - API call failed safely:', error.message);
                // Fallback UI update with safe data
                updateUI({ error: 'API call failed', message: 'Test completed safely' });
            });
    }
    
    // Test 6: Safe async handling with proper try-catch
    async function testAsyncBug() {
        try {
            const result = await Promise.resolve('test');
            console.log('Test 6 - Async operation succeeded:', result);
            
            // Safe JSON parsing test
            const testObject = { test: 'value' };
            const parsed = JSON.parse(JSON.stringify(testObject));
            console.log('Test 6 - JSON parsing succeeded:', parsed);
            
        } catch (error) {
            console.log('Test 6 - Async error caught safely:', error.message);
        }
    }
    
    // Execute safe test functions
    testUndefinedVariable();
    testBuggyFunction(null); // Test with null
    testBuggyFunction({ validProperty: 'test' }); // Test with valid object
    testRiskyApiCall();
    testAsyncBug();
    
    console.log('All test functions executed safely');
}

// Utility functions
function updateUI(data) {
    try {
        // Safe UI update function with error handling
        if (!data) {
            console.log('UpdateUI called with no data');
            return;
        }
        
        if (data.error) {
            console.log('UpdateUI handling error:', data.error);
            return;
        }
        
        console.log('Updating UI with data:', data);
        
        // Add any actual UI update logic here
        // This is a placeholder function for demonstration
        
    } catch (error) {
        console.error('Error in updateUI:', error.message);
    }
}

// Cleanup function for test intervals and event listeners
function cleanupTestResources() {
    try {
        // Clean up any test intervals
        if (window.testIntervals && Array.isArray(window.testIntervals)) {
            window.testIntervals.forEach(interval => {
                clearInterval(interval);
            });
            window.testIntervals = [];
            console.log('Test intervals cleaned up');
        }
        
        // Additional cleanup can be added here
        console.log('Test resources cleanup completed');
        
    } catch (error) {
        console.error('Error during cleanup:', error.message);
    }
}

// Add cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', cleanupTestResources);

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
    try {
        if ('performance' in window && window.performance.timing) {
            window.addEventListener('load', () => {
                try {
                    const timing = window.performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    console.log('Page load time:', loadTime + 'ms');
                } catch (error) {
                    console.error('Error calculating load time:', error.message);
                }
            });
        } else {
            console.warn('Performance API not supported');
        }
    } catch (error) {
        console.error('Error setting up performance tracking:', error.message);
    }
}

// Call performance tracking with error handling
try {
    trackPerformance();
} catch (error) {
    console.error('Error initializing performance tracking:', error.message);
}
