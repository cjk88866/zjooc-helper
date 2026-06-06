# 安装教程（简体中文）

本文适用于 macOS 和 Windows。推荐使用 Chrome 或 Microsoft Edge，也可以使用 Firefox。

## 方式一：从 GitHub Raw 链接安装

适合仓库已经发布后的用户。

1. 安装 Tampermonkey：
   - 官方下载页：[https://www.tampermonkey.net/](https://www.tampermonkey.net/)
   - Chrome 商店：[Tampermonkey - Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox 附加组件：[Tampermonkey - Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. 打开本仓库的 `zjooc.user.js`。
3. 点击 GitHub 文件页面右上方的 `Raw`。
4. Tampermonkey 会自动弹出安装页面。
5. 点击 `安装`。
6. 打开 zjooc 学习页面。
7. 页面右侧出现 `开始学习` 和 `停止学习` 按钮后，点击 `开始学习`。

## 方式二：手动复制脚本安装

适合本地测试或 GitHub Raw 链接还没配置好的情况。

### macOS

1. 在 Chrome、Edge 或 Firefox 中安装 Tampermonkey。
2. 点击浏览器右上角的 Tampermonkey 图标。
3. 选择 `管理面板`。
4. 点击 `+` 新建脚本。
5. 删除编辑器里的默认内容。
6. 打开本仓库的 `zjooc.user.js`，复制全部内容。
7. 粘贴到 Tampermonkey 编辑器。
8. 按 `Command + S` 保存。
9. 刷新 zjooc 学习页面。
10. 点击页面右侧的 `开始学习`。

### Windows

1. 在 Chrome、Edge 或 Firefox 中安装 Tampermonkey。
2. 点击浏览器右上角的 Tampermonkey 图标。
3. 选择 `管理面板`。
4. 点击 `+` 新建脚本。
5. 删除编辑器里的默认内容。
6. 打开本仓库的 `zjooc.user.js`，复制全部内容。
7. 粘贴到 Tampermonkey 编辑器。
8. 按 `Ctrl + S` 保存。
9. 刷新 zjooc 学习页面。
10. 点击页面右侧的 `开始学习`。

## 浏览器注意事项

### Chrome

- 推荐从 Chrome Web Store 安装 Tampermonkey。
- 如果脚本不运行，检查 Tampermonkey 是否启用。
- 如果浏览器提示扩展权限，请允许 Tampermonkey 在 zjooc 页面运行。

### Microsoft Edge

- 可以从 Tampermonkey 官网或 Edge 扩展商店安装。
- 安装后步骤与 Chrome 基本一致。

### Firefox

- 从 Firefox Add-ons 安装 Tampermonkey。
- 安装后打开 Tampermonkey 管理面板，新建脚本并保存。

## 使用说明

1. 进入 zjooc 课程学习页面。
2. 点击右侧 `开始学习`。
3. 脚本会自动播放当前视频或完成文档类学习内容。
4. 视频卡住时，脚本会优先切换 `高清 / 标清 / 超清`。
5. 如果多次切换清晰度仍然卡住，脚本会刷新页面。
6. 因卡顿自动刷新后，脚本会自动继续学习。
7. 如果你手动点击 `停止学习`，自动继续学习状态会被关闭。

## 配置项

可以在 `zjooc.user.js` 顶部修改：

```js
const config = {
  start: 3000,
  next: 3000,
  before: 3000,
  skip: true,
  stuck: 8,
  qualityCooldown: 15000,
  maxQualityAttempts: 3,
  reloadDelay: 1000
}
```

含义：

- `start`：页面加载后自动开始前的等待时间。
- `next`：跳转到下一个学习项后的等待时间。
- `before`：点击章节后开始检测前的等待时间。
- `skip`：是否跳过已完成内容。
- `stuck`：视频连续多少秒不动后判断为卡住。
- `qualityCooldown`：两次清晰度切换之间的最短间隔。
- `maxQualityAttempts`：同一次卡顿最多切换几次清晰度。
- `reloadDelay`：触发刷新后的延迟时间。

## 常见问题

### 保存后没有生效怎么办？

刷新 zjooc 页面。确认 Tampermonkey 中脚本处于启用状态。

### 刷新后为什么会自动开始？

脚本会在你点击 `开始学习` 后记录自动学习状态。如果因为卡顿触发刷新，页面加载后会自动继续。

### 如何关闭自动继续？

点击页面右侧 `停止学习`，或者在 Tampermonkey 管理面板中禁用脚本。

