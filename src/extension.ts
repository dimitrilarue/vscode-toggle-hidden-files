import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Apply default setting on activation
  applyDefaultSetting();

  const disposable = vscode.commands.registerCommand(
    "toggle-hidden-files.toggle",
    () => {
      // Get the current configuration for files.exclude
      const config = vscode.workspace.getConfiguration();
      const filesExclude = config.get("files.exclude") as Record<
        string,
        boolean
      >;

      // Check if hidden files are currently excluded
      const hiddenFilesAreHidden = filesExclude["**/.??*"] === true;
      const gitIgnoreExcluded =
        config.get("explorer.excludeGitIgnore") === true;
      const allHidden = hiddenFilesAreHidden && gitIgnoreExcluded;

      // Toggle hidden files visibility
      if (allHidden) {
        // Show hidden files by removing the exclusion pattern
        const newExclude = { ...filesExclude };
        delete newExclude["**/.??*"];
        config.update(
          "files.exclude",
          newExclude,
          vscode.ConfigurationTarget.Workspace,
        );

        // Also disable gitignore exclusion
        config.update(
          "explorer.excludeGitIgnore",
          false,
          vscode.ConfigurationTarget.Workspace,
        );

        vscode.window.showInformationMessage("Hidden files are now visible");
      } else {
        // Hide hidden files by adding the exclusion pattern
        const newExclude = { ...filesExclude, "**/.??*": true };
        config.update(
          "files.exclude",
          newExclude,
          vscode.ConfigurationTarget.Workspace,
        );

        // Also enable gitignore exclusion
        config.update(
          "explorer.excludeGitIgnore",
          true,
          vscode.ConfigurationTarget.Workspace,
        );

        vscode.window.showInformationMessage("Hidden files are now hidden");
      }
    },
  );

  // Watch for configuration changes to apply new defaults
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("toggleHiddenFiles.hideByDefault")) {
        applyDefaultSetting();
      }
    }),
  );

  context.subscriptions.push(disposable);
}

/**
 * Apply the default setting for hidden files visibility
 */
function applyDefaultSetting(): void {
  const config = vscode.workspace.getConfiguration();
  const filesExclude = config.get("files.exclude") as Record<string, boolean>;
  const hideByDefault = vscode.workspace
    .getConfiguration("toggleHiddenFiles")
    .get("hideByDefault", true);

  // If hideByDefault is true and **/.??* is not in exclude patterns, add it
  if (hideByDefault) {
    if (!filesExclude["**/.??*"]) {
      const newExclude = { ...filesExclude, "**/.??*": true };
      config.update(
        "files.exclude",
        newExclude,
        vscode.ConfigurationTarget.Workspace,
      );
    }

    // Also enable gitignore exclusion
    config.update(
      "explorer.excludeGitIgnore",
      true,
      vscode.ConfigurationTarget.Workspace,
    );
  }
  // If hideByDefault is false and **/.??* is in exclude patterns, remove it
  else if (!hideByDefault) {
    if (filesExclude["**/.??*"]) {
      const newExclude = { ...filesExclude };
      delete newExclude["**/.??*"];
      config.update(
        "files.exclude",
        newExclude,
        vscode.ConfigurationTarget.Workspace,
      );
    }

    // Also disable gitignore exclusion
    config.update(
      "explorer.excludeGitIgnore",
      false,
      vscode.ConfigurationTarget.Workspace,
    );
  }
}

export function deactivate() {}
