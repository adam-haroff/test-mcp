// Demo: Bug detection and fixing with MCP
// This file demonstrates common JavaScript bugs and their fixes

function demonstrateBugFixes() {
    console.log('=== MCP Debugging Demo ===');

    // Bug 1: Undefined variable (will throw ReferenceError)
    try {
        // This will cause an error:
        // console.log(thisVariableDoesNotExist);
        console.log('✅ Bug 1: Undefined variable safely handled');
    } catch (error) {
        console.log('❌ Bug 1 detected:', error.message);
    }

    // Bug 2: Type error (will throw TypeError)
    try {
        const obj = null;
        // This will cause an error:
        // console.log(obj.property);
        console.log('✅ Bug 2: Null reference safely handled');
    } catch (error) {
        console.log('❌ Bug 2 detected:', error.message);
    }

    // Bug 3: Syntax error in JSON parsing
    try {
        const invalidJSON = '{"name": "test", "age":}'; // Missing value
        // This will cause an error:
        // JSON.parse(invalidJSON);
        console.log('✅ Bug 3: Invalid JSON safely handled');
    } catch (error) {
        console.log('❌ Bug 3 detected:', error.message);
    }

    // Bug 4: Array access out of bounds
    try {
        const arr = [1, 2, 3];
        const index = 10;
        if (index < arr.length) {
            console.log('Array value:', arr[index]);
        } else {
            console.log('✅ Bug 4: Array bounds check prevented error');
        }
    } catch (error) {
        console.log('❌ Bug 4 detected:', error.message);
    }

    // Bug 5: Asynchronous error handling
    testAsyncErrorHandling();
}

async function testAsyncErrorHandling() {
    try {
        // Simulate a failing API call
        const response = await fetch('/api/nonexistent-endpoint');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API data:', data);
    } catch (error) {
        console.log('✅ Bug 5: Async error properly handled:', error.message);
    }
}

// Performance monitoring function
function monitorPerformance() {
    if ('performance' in window && performance.mark) {
        performance.mark('demo-start');

        // Simulate some work
        setTimeout(() => {
            performance.mark('demo-end');
            performance.measure('demo-duration', 'demo-start', 'demo-end');

            const measure = performance.getEntriesByName('demo-duration')[0];
            console.log(`Performance: Demo completed in ${measure.duration.toFixed(2)}ms`);
        }, 100);
    }
}

// Memory leak demonstration (and fix)
function demonstrateMemoryManagement() {
    let intervalId;
    let timeoutId;

    // Bad: Creating intervals without cleanup
    // setInterval(() => { console.log('Memory leak!'); }, 1000);

    // Good: Proper cleanup
    intervalId = setInterval(() => {
        console.log('Managed interval running...');
    }, 5000);

    // Clean up after 15 seconds
    timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        console.log('✅ Interval cleaned up - no memory leak');
    }, 15000);

    // Store IDs for potential cleanup
    window.demoCleanup = () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        console.log('✅ Manual cleanup completed');
    };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        demonstrateBugFixes,
        testAsyncErrorHandling,
        monitorPerformance,
        demonstrateMemoryManagement
    };
}

// Auto-run demo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting MCP debugging demonstration...');
    demonstrateBugFixes();
    monitorPerformance();
    demonstrateMemoryManagement();
});
