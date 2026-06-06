# zjooc-helper

[简体中文](docs/README.zh-CN.md) | [繁體中文](docs/README.zh-TW.md) | [English](docs/README.en.md)

zjooc-helper is a Tampermonkey userscript for the zjooc learning page. It helps stabilize video playback, keeps videos muted at 1x speed, detects stalls, switches video quality when playback is stuck, and reloads the page with auto-resume when quality switching cannot recover playback.

> Please use this project only for personal learning assistance and playback stability improvement. Follow your school, course, and platform rules.

## Highlights

- Auto start and stop buttons on the zjooc page.
- Video muted playback at 1x speed.
- Skip completed learning items when enabled.
- Auto document completion for supported document-style learning items.
- Stall detection for videos whose progress time stops moving.
- Quality rotation among `HD / SD / Ultra HD` options shown as `高清 / 标清 / 超清`.
- Fallback page reload when quality switching fails, then auto-resume without clicking Start again.
- Configurable delays, stall threshold, quality cooldown, and reload fallback.

## Quick Start

1. Install Tampermonkey from the official site: [tampermonkey.net](https://www.tampermonkey.net/).
2. Open `zjooc.user.js` in this repository.
3. Copy the whole script into Tampermonkey, or install it from the raw GitHub link after publishing.
4. Save the script.
5. Open a zjooc course study page and click `开始学习`.

Detailed guides:

- [简体中文安装教程](docs/INSTALL.zh-CN.md)
- [繁體中文安裝教學](docs/INSTALL.zh-TW.md)
- [English installation guide](docs/INSTALL.en.md)

## Sponsor

If this script saves you time or helps with unstable playback, a small sponsorship is appreciated.

<p>
  <img src="assets/sponsor/wechat-pay.jpg" width="260" alt="WeChat Pay sponsor QR code">
  <img src="assets/sponsor/usdt-polygon.jpg" width="220" alt="USDT Polygon sponsor QR code">
</p>

Additional sponsor image:

<p>
  <img src="assets/sponsor/sponsor-extra.jpg" width="220" alt="Additional sponsor QR code">
</p>

## Publish Notes

The userscript metadata is configured for `cjk88866/zjooc-helper`. After publishing the repository under this name, Tampermonkey can use the raw GitHub URL for installation and updates.

## Credits

This project is based on and modified from [4o4E/zjooc-script](https://github.com/4o4E/zjooc-script). The original repository is licensed under GPL-3.0, so this package is also released under GPL-3.0-only.

## Disclaimer

This project is provided as-is for learning assistance and browser automation study. It is not affiliated with zjooc or any school. Use it responsibly and at your own risk.
