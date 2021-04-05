import * as vscode from "vscode";

import { WebsitesDataProvider } from "./websitesDataProvider";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider(
    "websitesTree",
    new WebsitesDataProvider()
  );
}

export function deactivate() {}
