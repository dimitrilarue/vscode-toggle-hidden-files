# Initialize the project
install:
    npm install

vscode:
    npm install -g @vscode/vsce

# Compile the TypeScript code
compile:
    npm run compile

# Watch for changes and recompile
watch:
    npm run watch

# Run ESLint
lint:
    npm run lint

# Package the extension
package:
    vsce package --no-dependencies

# Package the extension with star activation (if needed for testing)
package-allow-star:
    vsce package --no-dependencies --allow-star-activation

# Publish the extension (requires a Personal Access Token)
publish:
    vsce publish

# Clean build artifacts
clean:
    rm -rf out
    rm -rf node_modules
    rm -f *.vsix
