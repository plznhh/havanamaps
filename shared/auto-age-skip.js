(function () {
  "use strict";

  var REF_WIDTH = 1280;
  var REF_HEIGHT = 720;
  var tutorialTimer = null;
  var sequenceStarted = false;

  function getCanvas() {
    return document.querySelector("canvas") || document.getElementById("canvas");
  }

  function unityRuntimeReady() {
    return !!(
      window.unityGame &&
      window.unityGame.Module &&
      window.unityGame.Module.asm &&
      typeof window.unityGame.Module.asm.stackSave === "function"
    );
  }

  function scaledPoint(canvas, x, y) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: rect.left + (x / REF_WIDTH) * rect.width,
      y: rect.top + (y / REF_HEIGHT) * rect.height
    };
  }

  function fireMouse(canvas, type, x, y) {
    var point = scaledPoint(canvas, x, y);
    var event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: point.x,
      clientY: point.y,
      screenX: point.x,
      screenY: point.y,
      button: 0,
      buttons: type === "mouseup" ? 0 : 1
    });
    canvas.dispatchEvent(event);
  }

  function clickCanvas(canvas, x, y) {
    fireMouse(canvas, "mousemove", x, y);
    fireMouse(canvas, "mousedown", x, y);
    fireMouse(canvas, "mouseup", x, y);
    fireMouse(canvas, "click", x, y);
  }

  function dispatchKey(target, type, key, code, keyCode) {
    var event = new KeyboardEvent(type, {
      key: key,
      code: code,
      keyCode: keyCode,
      which: keyCode,
      bubbles: true,
      cancelable: true
    });

    try {
      Object.defineProperty(event, "keyCode", { get: function () { return keyCode; } });
      Object.defineProperty(event, "which", { get: function () { return keyCode; } });
    } catch (_) {
    }

    target.dispatchEvent(event);
  }

  function pressKey(key, code, keyCode) {
    var canvas = getCanvas();
    var targets = [window, document];
    if (canvas) {
      canvas.tabIndex = canvas.tabIndex || 0;
      try {
        canvas.focus();
      } catch (_) {
      }
      targets.push(canvas);
    }
    if (document.body) targets.push(document.body);

    targets.forEach(function (target) {
      dispatchKey(target, "keydown", key, code, keyCode);
      dispatchKey(target, "keyup", key, code, keyCode);
    });
  }

  function startTutorialSkip() {
    var ticks = 0;
    var tutorialKeys = [
      { key: "ArrowUp", code: "ArrowUp", keyCode: 38 },
      { key: "ArrowDown", code: "ArrowDown", keyCode: 40 }
    ];

    if (tutorialTimer) clearInterval(tutorialTimer);

    tutorialTimer = setInterval(function () {
      var key = tutorialKeys[ticks % tutorialKeys.length];
      ticks += 1;
      pressKey(key.key, key.code, key.keyCode);

      if (ticks === 36) {
        hideCoverSoon(0);
      }

      if (ticks > 140) {
        clearInterval(tutorialTimer);
        tutorialTimer = null;
        hideCoverSoon(1000);
      }
    }, 650);
  }

  function showCover() {
    if (document.querySelector(".age-skip-cover")) return;
    var cover = document.createElement("div");
    cover.className = "age-skip-cover";
    cover.textContent = "Carregando...";
    cover.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#050505;color:#fff;font:700 22px Arial,sans-serif;pointer-events:none";
    (document.body || document.documentElement).appendChild(cover);
  }

  function hideCoverSoon(delay) {
    setTimeout(function () {
      var cover = document.querySelector(".age-skip-cover");
      if (cover) cover.remove();
    }, delay || 3500);
  }

  function runSequence() {
    var canvas = getCanvas();
    if (!canvas) return;

    showCover();
    clickCanvas(canvas, 492, 153);

    for (var i = 0; i < 16; i++) {
      setTimeout(function () {
        var currentCanvas = getCanvas();
        if (currentCanvas) clickCanvas(currentCanvas, 624, 153);
      }, 120 + i * 70);
    }

    setTimeout(function () {
      var currentCanvas = getCanvas();
      if (currentCanvas) clickCanvas(currentCanvas, 640, 628);
      setTimeout(startTutorialSkip, 2500);
    }, 1500);
  }

  function waitForGameThenRun() {
    if (sequenceStarted) return;
    if (!getCanvas() || !unityRuntimeReady()) {
      setTimeout(waitForGameThenRun, 500);
      return;
    }

    sequenceStarted = true;
    setTimeout(runSequence, 5000);
  }

  setTimeout(waitForGameThenRun, 5000);
})();
