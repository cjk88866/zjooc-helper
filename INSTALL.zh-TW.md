# 安裝教學（繁體中文）

本文適用於 macOS 和 Windows。推薦使用 Chrome 或 Microsoft Edge，也可以使用 Firefox。

## 方法一：從 GitHub Raw 連結安裝

適合倉庫已經發布後的使用者。

1. 安裝 Tampermonkey：
   - 官方下載頁：[https://www.tampermonkey.net/](https://www.tampermonkey.net/)
   - Chrome 商店：[Tampermonkey - Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox 附加元件：[Tampermonkey - Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. 打開本倉庫的 `zjooc.user.js`。
3. 點擊 GitHub 檔案頁面右上方的 `Raw`。
4. Tampermonkey 會自動彈出安裝頁面。
5. 點擊 `安裝`。
6. 打開 zjooc 學習頁面。
7. 頁面右側出現 `開始學習` 和 `停止學習` 按鈕後，點擊 `開始學習`。

## 方法二：手動複製腳本安裝

適合本地測試或 GitHub Raw 連結還沒配置好的情況。

### macOS

1. 在 Chrome、Edge 或 Firefox 中安裝 Tampermonkey。
2. 點擊瀏覽器右上角的 Tampermonkey 圖示。
3. 選擇 `管理面板`。
4. 點擊 `+` 新增腳本。
5. 刪除編輯器裡的預設內容。
6. 打開本倉庫的 `zjooc.user.js`，複製全部內容。
7. 貼到 Tampermonkey 編輯器。
8. 按 `Command + S` 儲存。
9. 重新整理 zjooc 學習頁面。
10. 點擊頁面右側的 `開始學習`。

### Windows

1. 在 Chrome、Edge 或 Firefox 中安裝 Tampermonkey。
2. 點擊瀏覽器右上角的 Tampermonkey 圖示。
3. 選擇 `管理面板`。
4. 點擊 `+` 新增腳本。
5. 刪除編輯器裡的預設內容。
6. 打開本倉庫的 `zjooc.user.js`，複製全部內容。
7. 貼到 Tampermonkey 編輯器。
8. 按 `Ctrl + S` 儲存。
9. 重新整理 zjooc 學習頁面。
10. 點擊頁面右側的 `開始學習`。

## 瀏覽器注意事項

### Chrome

- 推薦從 Chrome Web Store 安裝 Tampermonkey。
- 如果腳本不執行，檢查 Tampermonkey 是否啟用。
- 如果瀏覽器提示擴充功能權限，請允許 Tampermonkey 在 zjooc 頁面執行。

### Microsoft Edge

- 可以從 Tampermonkey 官網或 Edge 擴充功能商店安裝。
- 安裝後步驟與 Chrome 基本一致。

### Firefox

- 從 Firefox Add-ons 安裝 Tampermonkey。
- 安裝後打開 Tampermonkey 管理面板，新增腳本並儲存。

## 使用說明

1. 進入 zjooc 課程學習頁面。
2. 點擊右側 `開始學習`。
3. 腳本會自動播放目前影片或完成文件類學習內容。
4. 影片卡住時，腳本會優先切換 `高清 / 標清 / 超清`。
5. 如果多次切換畫質仍然卡住，腳本會重新整理頁面。
6. 因卡頓自動重新整理後，腳本會自動繼續學習。
7. 如果你手動點擊 `停止學習`，自動繼續學習狀態會被關閉。

## 設定項

可以在 `zjooc.user.js` 頂部修改：

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

含義：

- `start`：頁面載入後自動開始前的等待時間。
- `next`：跳轉到下一個學習項後的等待時間。
- `before`：點擊章節後開始偵測前的等待時間。
- `skip`：是否跳過已完成內容。
- `stuck`：影片連續多少秒不動後判斷為卡住。
- `qualityCooldown`：兩次畫質切換之間的最短間隔。
- `maxQualityAttempts`：同一次卡頓最多切換幾次畫質。
- `reloadDelay`：觸發重新整理後的延遲時間。

## 常見問題

### 儲存後沒有生效怎麼辦？

重新整理 zjooc 頁面。確認 Tampermonkey 中腳本處於啟用狀態。

### 重新整理後為什麼會自動開始？

腳本會在你點擊 `開始學習` 後記錄自動學習狀態。如果因為卡頓觸發重新整理，頁面載入後會自動繼續。

### 如何關閉自動繼續？

點擊頁面右側 `停止學習`，或者在 Tampermonkey 管理面板中停用腳本。

