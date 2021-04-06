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

export async function allSettledPromises(promises: Promise<any>[]) {
  // [Promise.allSettled() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
  const results = await Promise.allSettled(promises);
  const successRes = results.filter((p) => p.status === "fulfilled");

  switch (successRes.length) {
    case 0:
      vscode.window.showErrorMessage("接口访问错误！请检查您的网络");
      return {};
    case 1:
      return (successRes[0] as PromiseFulfilledResult<any>).value;
    default:
      // 根据updateTime逆序排列
      const sortRes = successRes.sort((a, b) => {
        return (
          Number(
            new Date((b as PromiseFulfilledResult<any>).value.updateTime)
          ) -
          Number(new Date((a as PromiseFulfilledResult<any>).value.updateTime))
        );
      });
      // 将最新更新的数据进行分配
      return (sortRes[0] as PromiseFulfilledResult<any>).value;
  }
}
