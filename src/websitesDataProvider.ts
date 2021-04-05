import * as vscode from "vscode";

export class WebsitesDataProvider
  implements vscode.TreeDataProvider<vscode.TreeItem> {
  onDidChangeTreeData?:
    | vscode.Event<void | vscode.TreeItem | null | undefined>
    | undefined;

  getTreeItem(
    element: vscode.TreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(
    element?: vscode.TreeItem
  ): vscode.ProviderResult<vscode.TreeItem[]> {
    const list: vscode.ProviderResult<vscode.TreeItem[]> = [];
    list.push(
      new vscode.TreeItem({
        label: "ehllo",
      })
    );
    return list;
  }
}
