# Getting Started with Toggle Hidden Files Extension

## Development Setup

1. Install dependencies:

```bash
just init
```

2. Compile the extension:

```bash
just compile
```

3. For development with auto-recompile:

```bash
just watch
```

## Testing the Extension

1. Press F5 in VS Code to launch a new window with your extension loaded
2. Press Ctrl+Shift+H (Windows/Linux) or Cmd+Shift+H (Mac) to toggle hidden files

## Building and Installing

To package the extension:

```bash
just package
```

If you encounter version compatibility issues, you can modify the engine requirements in `package.json` to match your VS Code version.

This will create a .vsix file which can be installed in VS Code by:

1. Opening VS Code
2. Going to Extensions view (Ctrl+Shift+X)
3. Clicking the "..." at the top of the Extensions view
4. Selecting "Install from VSIX..."
5. Navigating to and selecting your .vsix file

## How It Works

The extension works by modifying the `files.exclude` configuration in VS Code:

- It adds a pattern `**/.??*` to hide dotfiles
- It removes this pattern to show dotfiles
- The pattern matches all files starting with a dot and having at least one character after the dot

