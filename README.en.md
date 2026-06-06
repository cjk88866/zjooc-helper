# zjooc-helper English README

zjooc-helper is a Tampermonkey userscript for zjooc course study pages. It focuses on playback stability and reduces manual recovery work when the player freezes, a video fails to load after switching lessons, or the page state becomes stale.

## Features

- Adds `Start Learning` and `Stop Learning` buttons to the zjooc page.
- Plays videos muted at `1x` speed.
- Skips completed learning items when enabled.
- Handles supported document-style learning items.
- Detects video stalls when playback time stops moving.
- Rotates video quality among `高清 / 标清 / 超清` when playback is stuck.
- Reloads the whole page when repeated quality switching cannot recover playback.
- Auto-resumes after reload, so you do not need to click Start again.
- Exposes timing, stall, cooldown, and reload options in the top-level `config`.

## When It Helps

- The video progress time stops due to network instability.
- The player gets stuck after moving from one video to the next.
- A specific quality route is broken and switching quality can trigger a fresh stream.
- You need the page to auto-resume after a recovery reload.

## Responsible Use

Please follow your school, course, and zjooc platform rules. This script is provided for personal learning assistance, playback stability improvement, and browser userscript study. Do not use it in ways that violate course or platform requirements.

## Installation

Read the [English installation guide](INSTALL.en.md).

## Sponsor

If this script helps you, sponsorship is appreciated.

<p>
  <img src="wechat-pay.jpg" width="260" alt="WeChat Pay sponsor QR code">
  <img src="usdt-polygon.jpg" width="220" alt="USDT Polygon sponsor QR code">
</p>

<p>
  <img src="sponsor-extra.jpg" width="220" alt="Additional sponsor QR code">
</p>

## Credits and License

This project is based on and modified from [4o4E/zjooc-script](https://github.com/4o4E/zjooc-script). The original project is licensed under GPL-3.0, so this package is released under GPL-3.0-only.
