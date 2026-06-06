// ==UserScript==
// @name         zjooc-helper
// @namespace    https://github.com/cjk88866/zjooc-helper
// @version      1.1.0
// @description  zjooc 学习辅助脚本：视频自动播放、1倍速静音、卡顿切换清晰度、失败自动刷新并继续学习
// @author       404E, contributors
// @match        *://www.zjooc.cn/ucenter/student/course/study/*/plan/detail/*
// @grant        none
// @license      GPL-3.0-only
// @homepageURL  https://github.com/cjk88866/zjooc-helper
// @supportURL   https://github.com/cjk88866/zjooc-helper/issues
// @downloadURL  https://raw.githubusercontent.com/cjk88866/zjooc-helper/main/zjooc.user.js
// @updateURL    https://raw.githubusercontent.com/cjk88866/zjooc-helper/main/zjooc.user.js
// ==/UserScript==

(function () {
  'use strict';

  // 设置, 根据自己的网络状况调整
  const config = {
    // 首次学习开始之前的延迟(等待html加载)
    start: 3000,
    // 点击链接跳转到下一学习后等待加载的时长
    next: 3000,
    // 跳转后开始前的等待时长
    before: 3000,
    // 跳过已完成的视频
    skip: true,
    // 视频连续卡住多少秒后尝试调整清晰度
    stuck: 8,
    // 调整清晰度后的冷却时间, 避免频繁点击
    qualityCooldown: 15000,
    // 同一次卡顿最多尝试切换几次清晰度, 仍不恢复就刷新页面
    maxQualityAttempts: 3,
    // 判断需要刷新后, 延迟多久刷新
    reloadDelay: 1000
  }

  const autoStartKey = "zjooc_auto_start";

  const btnStyle = "color: red; font-size: 20px; line-height: 28px; font-weight: 1000;"

  function getCurrent() {
    let list = $(".plan-detail > .el-header > ul > li").map((_, b) => $(b).text().trim());
    return list[0] + " > " + list[1] + " > " + list[2];
  }

  // 前往下一个学习
  function next() {
    setTimeout(() => {
      if (stop) return;
      // 尝试从当前播放列表中挑选下一个(同一节)
      let next = $(".fr .el-tabs__nav-scroll .el-tabs__nav").find(".is-active + .el-tabs__item.is-top").first();
      if (next.length != 0) {
        console.log("[zjooc] > 跳转至下一项: " + next.find("span > span").text());
        console.log(next[0]);
        next[0].style = "color: green;";
        next.click();
        setTimeout(checkAndStart, config.before);
        return;
      }

      // 尝试从当前节中挑选下一个(同一章)
      next = $(".base-asider .el-submenu.is-active .is-active + li").first();
      if (next.length != 0) {
        console.log("[zjooc] > 跳转至下一节: " + next.text());
        console.log(next[0]);
        next[0].style = "color: green;";
        next.click();
        setTimeout(checkAndStart, config.before);
        return;
      }

      // 尝试从下一章中挑选第一个
      next = $(".base-asider .el-submenu.is-active + li").find("ul > li").first();
      if (next.length != 0) {
        console.log("[zjooc] > 跳转至下一章: " + next.text());
        console.log(next[0]);
        next[0].style = "color: green;";
        next.click();
        setTimeout(checkAndStart, config.before);
        return;
      }
      alert("已完成所有学习");
      stop = true;
      setAutoStart(false);
    }, 1000);
  }

  // 尝试完成文档类型的学习
  function tryDoc() {
    if (stop) return;
    console.log("[zjooc] > 开始文档学习: " + getCurrent());
    // 点击完成学习按钮
    $(".el-main .el-button")[0].click();
    // 等待跳转
    setTimeout(() => {
      // 学习完成
      console.log("[zjooc] > 完成文档学习: " + getCurrent());
      next();
    }, config.next);
  }

  // 视频设置点击
  function configVideo() {
    let video = $("video")[0];
    if (!video) return;

    // 1倍速
    video.playbackRate = 1;
    // 静音
    video.muted = true;
    // 开始播放
    let playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {
      try {
        video.parentElement.children[2].children[0].click();
      } catch (e) {
        console.warn("[zjooc] > 尝试播放失败", e);
      }
    });
  }

  function isVisible(element) {
    if (!element) return false;
    let rect = element.getBoundingClientRect();
    let style = window.getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
  }

  function getCleanText(element) {
    return (element.innerText || element.textContent || "").replace(/\s+/g, "").trim();
  }

  function findVisibleElementByText(root, texts) {
    let elements = $(root).find("*").toArray();
    for (let text of texts) {
      let target = elements.find((element) => {
        let current = getCleanText(element);
        return isVisible(element) && current.length > 0 && current.length <= 20 && current.includes(text);
      });
      if (target) return target;
    }
    return null;
  }

  function mouseEvent(element, type) {
    if (!element) return;
    let rect = element.getBoundingClientRect();
    element.dispatchEvent(new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    }));
  }

  function wakeVideoControls() {
    let video = $("video")[0];
    if (!video) return;
    let root = video.parentElement;
    ["mouseenter", "mouseover", "mousemove"].forEach((type) => {
      mouseEvent(video, type);
      mouseEvent(root, type);
    });
  }

  function clickElement(element) {
    if (!element) return false;

    let target = element;
    for (let i = 0; i < 5 && target; i++) {
      let style = window.getComputedStyle(target);
      let className = String(target.className || "");
      if (
        target.onclick ||
        target.tagName === "BUTTON" ||
        target.tagName === "LI" ||
        target.tagName === "A" ||
        target.getAttribute("role") === "button" ||
        style.cursor === "pointer" ||
        /quality|definition|clarity|control|setting|item|menu|select/i.test(className)
      ) {
        break;
      }
      target = target.parentElement;
    }

    target = target || element;
    ["mousedown", "mouseup", "click"].forEach((type) => mouseEvent(target, type));
    try {
      target.click();
    } catch (e) {
      console.warn("[zjooc] > 点击元素失败", e);
    }
    return true;
  }

  function clickQualityArea() {
    let video = $("video")[0];
    if (!video) return false;

    let rect = video.getBoundingClientRect();
    let points = [
      [rect.right - 110, rect.bottom - 35],
      [rect.right - 85, rect.bottom - 35],
      [rect.right - 130, rect.bottom - 35],
      [rect.right - 160, rect.bottom - 35]
    ];

    for (let point of points) {
      let element = document.elementFromPoint(point[0], point[1]);
      if (element && clickElement(element)) return true;
    }

    return false;
  }

  function findVisibleQualityElements(texts) {
    return $("body *").toArray()
      .map((element) => {
        let current = getCleanText(element);
        let quality = texts.find((text) => current === text) || "";
        return { element, text: current, quality };
      })
      .filter((item) => {
        return isVisible(item.element) && item.quality;
      })
      .sort((a, b) => a.text.length - b.text.length);
  }

  let qualityCursor = -1;

  function getNextQuality(currentQuality, qualityTexts) {
    let currentIndex = qualityTexts.indexOf(currentQuality);
    if (currentIndex !== -1) {
      qualityCursor = currentIndex;
    } else if (qualityCursor === -1) {
      qualityCursor = 0;
    }

    qualityCursor = (qualityCursor + 1) % qualityTexts.length;
    return qualityTexts[qualityCursor];
  }

  function pickQualityOption(options, quality) {
    let candidates = options.filter((item) => item.quality === quality);
    return candidates[candidates.length - 1] || null;
  }

  // 视频卡住时尝试切换到不同清晰度
  function adjustQuality(done) {
    let video = $("video")[0];
    if (!video) {
      if (done) done(false);
      return false;
    }

    let qualityTexts = ["高清", "标清", "超清"];
    wakeVideoControls();

    let beforeOptions = findVisibleQualityElements(qualityTexts);
    let currentQuality = beforeOptions.length > 0 ? beforeOptions[0].quality : "";
    let nextQuality = getNextQuality(currentQuality, qualityTexts);

    console.log("[zjooc] > 视频卡住, 准备切换清晰度: " + (currentQuality || "未知") + " -> " + nextQuality);

    let currentButton = pickQualityOption(beforeOptions, currentQuality);
    if (currentButton) clickElement(currentButton.element);
    else clickQualityArea();

    let chooseOption = (retry) => {
      wakeVideoControls();

      let afterOptions = findVisibleQualityElements(qualityTexts);
      let nextOption = pickQualityOption(afterOptions, nextQuality) || afterOptions.find((item) => {
        return item.quality !== currentQuality;
      });

      if (nextOption) {
        console.log("[zjooc] > 切换清晰度: " + (currentQuality || "未知") + " -> " + nextOption.quality);
        clickElement(nextOption.element);
        configVideo();
        if (done) done(true);
        return;
      }

      if (retry) {
        console.warn("[zjooc] > 第一次没有找到清晰度选项, 再尝试打开一次菜单");
        clickQualityArea();
        setTimeout(() => chooseOption(false), 800);
      } else {
        console.warn("[zjooc] > 没有找到可切换的其他清晰度选项");
        configVideo();
        if (done) done(false);
      }
    };

    setTimeout(() => chooseOption(true), 800);
    return true;
  }

  function setAutoStart(enabled) {
    if (enabled) sessionStorage.setItem(autoStartKey, "1");
    else sessionStorage.removeItem(autoStartKey);
  }

  function reloadAndAutoStart(reason) {
    if (reloading) return;
    reloading = true;
    setAutoStart(true);
    console.warn("[zjooc] > " + reason + ", 即将刷新页面并自动继续学习");
    setTimeout(() => location.reload(), config.reloadDelay);
  }

  let lastTime;
  let stuckCount = 0;
  let lastQualityChange = 0;
  let qualityAttempts = 0;
  let recovering = false;
  let reloading = false;

  // 尝试完成视频学习
  function tryVideo() {
    if (stop) return;
    console.log("[zjooc] > 开始视频学习: " + getCurrent());
    configVideo();
    lastTime = "-1";
    stuckCount = 0;
    qualityAttempts = 0;
    recovering = false;
    // let b = false;
    // 循环检测是否结束
    let id = setInterval(() => {
      if (reloading) return;
      // 错误的检测
      if ($("video").length == 0) {
        clearInterval(id);
        tryDoc();
        return;
      }
      // 已完成
      if (config.skip && $(".fr .el-tabs__nav-scroll .el-tabs__nav .is-active span > i")[0].classList.contains("complete")) {
        console.log("[zjooc] > 跳过学习过的内容: " + getCurrent());
        // 取消定时器
        clearInterval(id);
        next();
        return;
      }
      let arr = $("video")[0].parentElement.children[2].children[7].innerHTML.split(' / ');
      // 若视频未开始播放则修复
      if (arr[0] === "00:00" || arr[0] === lastTime) {
        stuckCount++;
        configVideo();
        if (stuckCount >= config.stuck && Date.now() - lastQualityChange > config.qualityCooldown) {
          lastQualityChange = Date.now();
          stuckCount = 0;
          if (qualityAttempts >= config.maxQualityAttempts) {
            reloadAndAutoStart("多次切换清晰度后视频仍然卡住");
            return;
          }

          if (recovering) return;
          recovering = true;
          adjustQuality((switched) => {
            recovering = false;
            if (!switched) {
              reloadAndAutoStart("无法切换清晰度");
              return;
            }
            qualityAttempts++;
          });
        }
      } else {
        stuckCount = 0;
        qualityAttempts = 0;
        recovering = false;
      }
      lastTime = arr[0];
      if (arr[0] === arr[1] && arr[0] != "00:00") {
        // 播放完成
        console.log("[zjooc] > 完成视频学习: " + getCurrent());
        // 取消定时器
        clearInterval(id);
        if (stop) return;
        // 等待跳转
        setTimeout(next, config.next);
        return;
      }
    }, 1000);
  }

  // 检测学习类型并开始学习
  function checkAndStart() {
    if (stop) return;
    // 已完成
    if (config.skip && $(".fr .el-tabs__nav-scroll .el-tabs__nav .is-active span > i")[0].classList.contains("complete")) {
      console.log("[zjooc] > 跳过学习过的内容: " + getCurrent());
      next();
      return;
    }
    if ($("video").length != 0) tryVideo();
    else tryDoc();
  }

  // 修复所在的位置和左侧导航栏位置不同的bug
  function fix() {
    let list = $(".plan-detail > .el-header > ul > li").map((_, b) => $(b).text().trim());
    $(".base-asider .el-submenu")
      .filter((_, obj) => $(obj).find(".of_eno")[0].innerHTML.trim() === list[0])
      .find("ul > li")
      .filter((_, obj) => $(obj).find(".of_eno")[0].innerHTML.trim() === list[1])
      .first()
      .click();
  }

  let stop = false;

  // 添加事件监听
  function bind(element, func) {
    try {
      // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
      element.addEventListener("click", func, false);
    } catch (e) {
      try {
        // IE8.0及其以下版本
        element.attachEvent('onclick', func);
      } catch (e) {
        // 早期浏览器
        console.warn("[zjooc] > 绑定事件失败", e)
      }
    }
  }

  // 创建按钮
  function createBtn() {
    let li2 = document.createElement("li");
    li2.setAttribute("class", "li_second");
    let span2 = document.createElement("span");
    span2.innerHTML = "停止学习";
    span2.style = btnStyle
    // 添加事件监听
    bind(li2, () => {
      stop = true;
      setAutoStart(false);
    });
    li2.appendChild(span2);
    $(".online_service")[0].insertBefore(li2, $(".online_service > li")[0]);

    let li1 = document.createElement("li");
    li1.setAttribute("class", "li_second");
    let span1 = document.createElement("span");
    span1.innerHTML = "开始学习";
    span1.style = btnStyle
    // 添加事件监听
    bind(li1, start);
    li1.appendChild(span1);
    $(".online_service")[0].insertBefore(li1, $(".online_service > li")[0]);
  }

  function start() {
    stop = false;
    reloading = false;
    setAutoStart(true);
    fix();
    checkAndStart();
  }

  window.onload = () => {
    createBtn();
    if (sessionStorage.getItem(autoStartKey) === "1") {
      console.log("[zjooc] > 页面加载完成, 自动继续学习");
      setTimeout(start, config.start);
    }
  };
})();
