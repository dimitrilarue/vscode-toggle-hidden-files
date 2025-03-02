# Toggle Hidden Files Extension

A simple VS Code extension that allows toggling the visibility of hidden files (dotfiles) and gitignore-excluded files in the explorer.

## Features

- Toggle hidden files with a keyboard shortcut: `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac) when the file explorer has focus
- Display notification when hidden files visibility is toggled
- Configurable default behavior (hide or show hidden files by default)
- Automatically toggles both dotfiles and gitignore-excluded files

## Configuration

This extension provides the following settings:

- `toggleHiddenFiles.hideByDefault`: Controls whether hidden files are hidden by default when VS Code starts (default: `true`)

## How It Works

When activated, this extension:

1. Toggles dotfiles visibility by adding/removing the pattern `**/.??*` to VS Code's `files.exclude` setting
2. Toggles gitignore-excluded files visibility by enabling/disabling the VS Code `explorer.excludeGitIgnore` setting

This means with a single keyboard shortcut, you can hide or show both dotfiles and files excluded by your .gitignore files.
