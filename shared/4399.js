(function () {
  "use strict";

  function isSitelockUrl(value) {
    var raw = String(value || "");
    if (!raw) return false;
    try {
      var url = new URL(raw, window.location.href);
      return url.hostname === "poki.com" &&
        url.pathname.replace(/\/+$/, "") === "/sitelock";
    } catch (_) {
      return raw.indexOf("poki.com/sitelock") !== -1;
    }
  }

  window.__blockUnityExternalOpenURL = isSitelockUrl;
  window.__blockUnityExternalEval = function (value) {
    return String(value || "").indexOf("poki.com/sitelock") !== -1;
  };

  if (typeof window.open === "function") {
    var originalOpen = window.open;
    window.open = function (url) {
      if (isSitelockUrl(url)) return null;
      return originalOpen.apply(window, arguments);
    };
  }

  window.my4399UnityModule = function (moduleConfig) {
    if (typeof window.UnityModule === "function") {
      return window.UnityModule(moduleConfig);
    }
    if (typeof window.Module === "function") {
      return window.Module(moduleConfig);
    }
    throw new Error("Unity framework loaded, but UnityModule was not exposed.");
  };
})();

var my4399UnityModule = window.my4399UnityModule;
