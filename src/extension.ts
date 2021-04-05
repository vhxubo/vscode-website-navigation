import * as vscode from "vscode";
const open = require('open');

import { WebsitesDataProvider } from "./websitesDataProvider";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider(
    "websitesTree",
    new WebsitesDataProvider()
  );
  vscode.commands.registerCommand("websites.openUrl", (url) => {
    open(url);
  });
}

export function deactivate() {}
