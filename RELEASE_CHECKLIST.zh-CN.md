# GitHub 发布清单

发布前建议按顺序检查：

1. 创建 GitHub 仓库，例如 `zjooc-helper`。
2. 把本目录所有文件上传到仓库根目录。
3. 仓库名建议使用 `zjooc-helper`，脚本里的链接已经配置为 `cjk88866/zjooc-helper`。
4. 确认 `README.md` 首页能显示三语说明和赞助码图片。
5. 确认 `assets/sponsor/` 下的赞助码图片可以正常预览。
6. 打开 GitHub 上的 `zjooc.user.js`，点击 `Raw` 测试 Tampermonkey 是否弹出安装页。
7. 安装脚本后进入 zjooc 学习页，确认右侧出现 `开始学习` 和 `停止学习`。
8. 在仓库右侧 About 区域填写简介，例如：
   `zjooc learning assistant userscript with video stall recovery and auto-resume`
9. 给仓库添加 Topics：
   `tampermonkey`, `userscript`, `zjooc`, `javascript`, `learning-assistant`
10. 发布 Release，版本号建议使用 `v1.1.0`。

## 可选：README 顶部徽章

如果仓库地址已经确定，可以在 README 顶部加入：

```md
![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Userscript](https://img.shields.io/badge/Tampermonkey-userscript-green)
```

## 发布后 Raw 安装链接格式

```text
https://raw.githubusercontent.com/cjk88866/zjooc-helper/main/zjooc.user.js
```

如果你修改仓库名，需要同步修改 `zjooc.user.js` 里的 `@homepageURL`、`@supportURL`、`@downloadURL` 和 `@updateURL`。
