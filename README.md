# Test MCP Website

A simple website project designed to test GitHub Model Context Protocol (MCP) capabilities and demonstrate automated debugging assistance.

## Project Structure

```
test-mcp/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Features

- **Responsive Design**: Mobile-friendly layout
- **Smooth Navigation**: Anchor-based navigation with smooth scrolling
- **Contact Form**: Interactive form with validation
- **Animations**: CSS animations for enhanced user experience
- **Test Bugs**: Intentionally included bugs for MCP debugging tests

## Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. Or serve the files using a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Testing GitHub MCP

This project includes several intentional issues and bugs to test MCP debugging capabilities:

### Intentional Bugs for Testing

1. **JavaScript Errors**: Undefined variables and type errors
2. **Memory Leaks**: Potential memory leaks with event listeners
3. **Missing Error Handling**: Async functions without proper error handling
4. **Performance Issues**: Inefficient code patterns
5. **Accessibility Issues**: Missing ARIA labels and semantic markup

### MCP Test Scenarios

- **Issue Creation**: Test creating GitHub issues for bugs
- **Pull Request Workflow**: Test automated PR creation for fixes
- **Code Review**: Test MCP-assisted code reviews
- **Debugging**: Test automated debugging suggestions
- **Performance Analysis**: Test performance optimization suggestions

## Development

### Local Development

1. Make changes to the files
2. Refresh the browser to see updates
3. Use browser dev tools for debugging

### Testing Bugs

To activate test bugs for MCP debugging:

1. Uncomment the bug code in `script.js`
2. Open browser console to see errors
3. Use MCP tools to identify and fix issues

## Contributing

This project is designed for testing MCP capabilities. Feel free to:

1. Add more test scenarios
2. Introduce different types of bugs
3. Improve the codebase for better testing
4. Document MCP testing results

## License

MIT License - This is a test project for educational purposes.
