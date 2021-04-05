import * as vscode from "vscode";

export class WebsitesDataProvider
  implements vscode.TreeDataProvider<WebsiteItem> {
  onDidChangeTreeData?:
    | vscode.Event<void | WebsiteItem | null | undefined>
    | undefined;

  getTreeItem(element: WebsiteItem): WebsiteItem | Thenable<WebsiteItem> {
    return element;
  }
  getChildren(element?: WebsiteItem): vscode.ProviderResult<WebsiteItem[]> {
    if (!element) {
      return urls.list.map((item) => {
        return new WebsiteItem(
          item.label,
          vscode.TreeItemCollapsibleState.Collapsed
        );
      });
    } else {
      const arrItem = urls.list.filter(({ label }) => {
        return label === element.label;
      });

      return arrItem[0].items.map(
        (item) =>
          new WebsiteItem(
            item.name,
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

const urls = {
  author: "vhxubo",
  github: "https://github.com/vhxubo/websites",
  updateTime: "2021-04-04T23:16:28+08:00",
  list: [
    {
      label: "其他",
      items: [
        {
          name: "XIU2/TrackersListCollection",
          url: "https://trackerslist.com/#/zh",
          description: "每天更新！全网热门 BitTorrent Tracker 列表！",
        },
      ],
    },
    {
      label: "在线工具",
      items: [
        {
          name: "NGINXConfig",
          url:
            "https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN",
          description:
            "NGINX 配置配置高性能、安全、稳定的NGINX服务器的最简单方法。",
        },
        {
          name: "Tailblocks",
          url: "https://tailblocks.cc/",
          description: "Ready-to-use Tailwind CSS blocks",
        },
        {
          name: "一个工具箱",
          url: "http://www.atoolbox.net/",
          description: "一个工具箱 - 好用的在线工具都在这里！",
        },
        {
          name: "jaywcjlove/linux-command",
          url: "https://github.com/jaywcjlove/linux-command",
          description:
            "Linux命令大全搜索工具，内容包含Linux命令手册、详解、学习、搜集。",
        },
        {
          name: "Convert",
          url: "https://www.aconvert.com/",
          description: "Convert document, image, video and audio files online",
        },
        {
          name: "Emoji大全",
          url: "https://www.emojiall.com/zh-hans",
          description: "",
        },
      ],
    },
    {
      label: "学校相关",
      items: [
        {
          name: "教务网络管理系统",
          url: "https://www.lit.edu.cn/jwc/jwwlglxt.htm",
          description: "洛阳理工学院教务网络管理系统登录，可分别选择相应入口",
        },
        {
          name: "毕业设计（论文）管理系统",
          url: "http://lit.co.cnki.net",
          description: "学生账号用户名为学号，密码为身份证号后八位",
        },
        {
          name: "教务处",
          url: "https://www.lit.edu.cn/jwc/",
          description: "洛理教务在线",
        },
      ],
    },
    {
      label: "技术博客",
      items: [
        {
          name: "nginx-tutorial",
          url: "https://dunwu.github.io/nginx-tutorial/#/",
          description: "",
        },
        {
          name: "LINUX-TUTORIAL",
          url: "https://dunwu.github.io/linux-tutorial/",
          description: "",
        },
        {
          name: "张鑫旭的个人主页",
          url: "https://www.zhangxinxu.com/",
          description: "",
        },
        {
          name: "木易杨前端进阶",
          url: "https://muyiy.cn/",
          description: "",
        },
        {
          name: "阮一峰的网络日志",
          url: "http://www.ruanyifeng.com/blog/",
          description: "",
        },
      ],
    },
    {
      label: "技术文档",
      items: [
        {
          name: "深入理解 TypeScript",
          url: "https://jkchao.github.io/typescript-book-chinese/",
          description: "",
        },
        {
          name: "LeCoupa/awesome-cheatsheets",
          url: "https://github.com/LeCoupa/awesome-cheatsheets",
          description:
            "👩‍💻👨‍💻 Awesome cheatsheets for popular programming languages, frameworks and development tools. They include everything you should know in one single file.",
        },
        {
          name: "skywind3000/awesome-cheatsheets",
          url: "https://github.com/skywind3000/awesome-cheatsheets",
          description:
            "超级速查表 - 编程语言、框架和开发工具的速查表，单个文件包含一切你需要知道的东西",
        },
        {
          name: "Tailwind CSS",
          url: "https://www.tailwindcss.cn/docs",
          description: "Tailwind CSS 中文文档",
        },
        {
          name: "现代 JavaScript 教程",
          url: "https://zh.javascript.info/",
          description: "",
        },
        {
          name: "MDN Web Docs",
          url: "https://developer.mozilla.org/zh-CN/",
          description: "",
        },
        {
          name: "ES6 入门教程",
          url: "https://es6.ruanyifeng.com/",
          description: "",
        },
      ],
    },
    {
      label: "文化娱乐",
      items: [
        {
          name: "V2EX",
          url: "https://www.v2ex.com/",
          description: "",
        },
        {
          name: "今日热榜",
          url: "https://www.re-bang.com/",
          description: "",
        },
        {
          name: "知乎",
          url: "https://www.zhihu.com/",
          description: "",
        },
        {
          name: "YouTube",
          url: "https://www.youtube.com/",
          description:
            "在 YouTube 上畅享您喜爱的视频和音乐，上传原创内容并与亲朋好友和全世界观众分享您的视频。",
        },
        {
          name: "哔哩哔哩",
          url: "https://www.bilibili.com/",
          description: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
        },
      ],
    },
    {
      label: "编程相关",
      items: [
        {
          name: "牛客网",
          url: "https://www.nowcoder.com/",
          description: "",
        },
        {
          name: "蓝桥云课",
          url: "https://www.lanqiao.cn/courses/",
          description: "蓝桥收购了实验楼",
        },
        {
          name: "掘金",
          url: "https://juejin.cn/",
          description: "代码不止，掘金不停",
        },
        {
          name: "Stack Overflow",
          url: "https://stackoverflow.com/",
          description: "Where Developers Learn, Share, & Build Careers",
        },
        {
          name: "力扣",
          url: "https://leetcode-cn.com/problemset/all/",
          description: "力扣 (LeetCode) 全球极客挚爱的技术成长平台",
        },
        {
          name: "GitHub",
          url: "https://github.com/",
          description: "交友平台",
        },
      ],
    },
    {
      label: "能力提升",
      items: [
        {
          name: "tiimgreen/github-cheat-sheet",
          url:
            "https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md",
          description:
            "Git 和 Github 秘籍，灵感来自于 Zach Holman 在 2012 年 Aloha Ruby Conference 和 2013 年 WDCNZ 上所做的演讲：Git and GitHub Secrets(slides) 和 More Git and GitHub Secrets(slides)。",
        },
        {
          name: "全栈公开课2020",
          url: "https://fullstackopen.com/zh/",
          description:
            "一站式学习 React, Redux, Node.js, MongoDB, GraphQL 以及 TypeScript！这门课程会向你介绍基于 JavaScript 的现代 Web 编程技术。重点是利用 ReactJS 搭配Node.js开发的REST API，来搭建单页面应用程序（SPA：Single Page Application）",
        },
        {
          name: "Crash Course 中文字幕组",
          url: "https://crashcourse.club/",
          description: "",
        },
        {
          name: "The Missing Semester of Your CS Education",
          url: "https://missing.csail.mit.edu/",
          description: "",
        },
        {
          name: "SQLZOO",
          url: "https://sqlzoo.net/",
          description:
            "A series of practical exercises and quizzes for students of SQL",
        },
        {
          name: "RegexOne",
          url: "https://regexone.com/",
          description: "Learn Regular Expressions",
        },
        {
          name: "Learn Git Branching",
          url: "https://learngitbranching.js.org",
          description:
            "“Learning Git Branching” 可以说是目前为止最好的教程了，在沙盒里你能执行相应的命令，还能看到每个命令的执行情况； 通过一系列刺激的关卡挑战，逐步深入的学习 Git 的强大功能，在这个过程中你可能还会发现一些有意思的事情。",
        },
        {
          name: "labuladong的算法小抄",
          url: "https://labuladong.gitbook.io/algo/",
          description: "",
        },
      ],
    },
  ],
};

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
