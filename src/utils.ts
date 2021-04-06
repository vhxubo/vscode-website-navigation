import * as https from "https";
import * as vscode from "vscode";

export async function requestURL(url: string) {
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

export async function anyPromises(promises: Promise<any>[]) {
  try {
    const result = await Promise.any(promises);
    console.log("result :>> ", result);
    return result;
  } catch (error) {
    vscode.window.showErrorMessage("接口访问错误！请检查您的网络");
    return {};
  }
}
