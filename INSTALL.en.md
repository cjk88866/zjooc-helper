# Installation Guide

This guide works for macOS and Windows. Chrome or Microsoft Edge is recommended. Firefox is also supported.

## Method 1: Install from GitHub Raw

Use this method after the repository is published.

1. Install Tampermonkey:
   - Official download page: [https://www.tampermonkey.net/](https://www.tampermonkey.net/)
   - Chrome Web Store: [Tampermonkey - Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox Add-ons: [Tampermonkey - Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
2. Open `zjooc.user.js` in this repository.
3. Click `Raw` on the GitHub file page.
4. Tampermonkey should open an installation page automatically.
5. Click `Install`.
6. Open a zjooc course study page.
7. When `开始学习` and `停止学习` appear on the right side, click `开始学习`.

## Method 2: Manual Copy and Paste

Use this method for local testing or before the raw GitHub link is configured.

### macOS

1. Install Tampermonkey in Chrome, Edge, or Firefox.
2. Click the Tampermonkey icon in the browser toolbar.
3. Open `Dashboard`.
4. Click `+` to create a new script.
5. Delete the default editor content.
6. Open `zjooc.user.js` in this repository and copy the entire file.
7. Paste it into the Tampermonkey editor.
8. Press `Command + S` to save.
9. Refresh the zjooc study page.
10. Click `开始学习` on the right side of the page.

### Windows

1. Install Tampermonkey in Chrome, Edge, or Firefox.
2. Click the Tampermonkey icon in the browser toolbar.
3. Open `Dashboard`.
4. Click `+` to create a new script.
5. Delete the default editor content.
6. Open `zjooc.user.js` in this repository and copy the entire file.
7. Paste it into the Tampermonkey editor.
8. Press `Ctrl + S` to save.
9. Refresh the zjooc study page.
10. Click `开始学习` on the right side of the page.

## Browser Notes

### Chrome

- Install Tampermonkey from the Chrome Web Store.
- If the script does not run, make sure Tampermonkey is enabled.
- If Chrome asks for extension permissions, allow Tampermonkey to run on the zjooc page.

### Microsoft Edge

- Install Tampermonkey from the official Tampermonkey site or Edge Add-ons.
- The rest of the workflow is nearly the same as Chrome.

### Firefox

- Install Tampermonkey from Firefox Add-ons.
- Open the Tampermonkey dashboard, create a new script, paste, and save.

## Usage

1. Open a zjooc course study page.
2. Click `开始学习`.
3. The script starts the current video or document-style learning item.
4. When the video is stuck, the script first rotates among `高清 / 标清 / 超清`.
5. If repeated quality switching cannot recover playback, it reloads the page.
6. After a recovery reload, it auto-resumes learning.
7. If you click `停止学习`, auto-resume is disabled.

## Configuration

You can edit the top-level `config` in `zjooc.user.js`:

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

Meaning:

- `start`: delay before auto-start after page load.
- `next`: delay after moving to the next learning item.
- `before`: delay before checking after clicking a lesson item.
- `skip`: whether completed items should be skipped.
- `stuck`: seconds of unchanged video time before treating playback as stuck.
- `qualityCooldown`: minimum interval between quality switching attempts.
- `maxQualityAttempts`: maximum quality switching attempts for the same stall.
- `reloadDelay`: delay before page reload.

## FAQ

### The script does not work after saving. What should I do?

Refresh the zjooc page and make sure the script is enabled in Tampermonkey.

### Why does the page auto-start after reload?

After you click `开始学习`, the script stores an auto-learning state. If it reloads the page to recover playback, it resumes automatically after the page loads.

### How do I stop auto-resume?

Click `停止学习` on the right side of the page, or disable the script in Tampermonkey.

