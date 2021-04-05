import * as vscode from "vscode";
import * as https from "https";

interface Item {
  name: string;
  url: string;
  description: string;
}
interface List {
  label: string;
  items: Item[];
}
interface UrlsData {
  [key: string]: any;
  list?: List[];
  updateTime?: string;
  github?: string;
  author?: string;
}

export class WebsitesDataProvider
  implements vscode.TreeDataProvider<WebsiteItem> {
  private urlsData: UrlsData = {};

  onDidChangeTreeData?:
    | vscode.Event<void | WebsiteItem | null | undefined>
    | undefined;

  getTreeItem(element: WebsiteItem): WebsiteItem | Thenable<WebsiteItem> {
    return element;
  }

  async requestURL(url: string) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let body = "";
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          resolve(body);
        });
        res.on("error", (error) => {
          reject(error);
        });
      });
    });
  }

  async getJson() {
    const repository = vscode.workspace
      .getConfiguration("websiteNavigation")
      .get("repository");

    const promises = [];
    promises.push(
      this.requestURL(
        `https://raw.githubusercontent.com/${repository}/master/api/urls.json`
      )
    );
    promises.push(
      this.requestURL(`https://cdn.jsdelivr.net/gh/${repository}/api/urls.json`)
    );
    // [Promise.allSettled() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
    const results = await Promise.allSettled(promises);
    const successRes = results.filter((p) => p.status === "fulfilled");

    switch (successRes.length) {
      case 0:
        vscode.window.showErrorMessage("接口访问错误！请检查您的网络");
        break;
      case 1:
        this.urlsData = JSON.parse(
          (successRes[0] as PromiseFulfilledResult<any>).value
        );
        break;
      default:
        // 根据updateTime逆序排列
        const sortRes = successRes.sort((a, b) => {
          return (
            Number(
              new Date((b as PromiseFulfilledResult<any>).value.updateTime)
            ) -
            Number(
              new Date((a as PromiseFulfilledResult<any>).value.updateTime)
            )
          );
        });
        // 将最新更新的数据进行分配
        this.urlsData = JSON.parse(
          (successRes[0] as PromiseFulfilledResult<any>).value
        );
    }
  }

  async getChildren(element?: WebsiteItem): Promise<WebsiteItem[]> {
    if (Object.keys(this.urlsData).length === 0) {
      await this.getJson();
    }

    if (!element) {
      const list: WebsiteItem[] = [];

      Object.keys(this.urlsData).forEach((key) => {
        if (key !== "list") {
          const value = this.urlsData[key];
          if (value.indexOf("http") !== -1) {
            list.push(
              new WebsiteItem(
                "🎉" + key + ": " + value,
                vscode.TreeItemCollapsibleState.None,
                "",
                {
                  command: "websites.openUrl",
                  title: "",
                  arguments: [value],
                }
              )
            );
          } else {
            list.push(
              new WebsiteItem(
                "👉" + key + ": " + value,
                vscode.TreeItemCollapsibleState.None
              )
            );
          }
        } else {
          this.urlsData[key]?.forEach((item) =>
            list.push(
              new WebsiteItem(
                item.label,
                vscode.TreeItemCollapsibleState.Collapsed
              )
            )
          );
        }
      });

      return Promise.resolve(list || []);
    } else {
      const arrItem = this.urlsData?.list?.filter(({ label }) => {
        return label === element.label;
      });

      if (arrItem === undefined) {
        return [];
      }

      return arrItem[0].items.map(
        (item) =>
          new WebsiteItem(
            `${item.name} \n ${item.url
              .replace(/https?:\/\//, "")
              .replace(/\/$/g, "")}`,
            vscode.TreeItemCollapsibleState.None,
            item.description,
            {
              command: "websites.openUrl",
              title: "",
              arguments: [item.url],
            }
          )
      );
    }
  }
}

class WebsiteItem extends vscode.TreeItem {
  constructor(
    public readonly lable: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly tooltip?: string,
    public readonly command?: vscode.Command
  ) {
    super(lable, collapsibleState);
    this.tooltip = tooltip;
  }
}
