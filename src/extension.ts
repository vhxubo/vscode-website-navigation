import * as vscode from "vscode";
import open = require("open");

import { WebsitesDataProvider } from "./websitesDataProvider";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider(
    "websitesTree",
    new WebsitesDataProvider()
  );
  vscode.commands.registerCommand("websites.openUrl", (url) => {
    open(url);
  });

  vscode.commands.registerCommand("websiteNavigation.setRepository", () => {
    vscode.window
      .showInputBox({
        placeHolder: "输入导航仓库地址，形如'vhxubo/websites'",
      })
      .then((repository) => {
        if (repository !== undefined) {
          // 第三个参数需要设置成true才能修改全局设置
          vscode.workspace
            .getConfiguration("websiteNavigation")
            .update("repository", repository, true);
        }
      });
  });
}

export function deactivate() {}
