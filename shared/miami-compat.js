(function () {
  "use strict";

  var expectedTableSize = 108524;

  window.__blockUnityExternalOpenURL = function (value) {
    var raw = String(value || "");
    try {
      var url = new URL(raw, window.location.href);
      return url.hostname === "poki.com" &&
        url.pathname.replace(/\/+$/, "") === "/sitelock";
    } catch (_) {
      return raw.indexOf("poki.com/sitelock") !== -1;
    }
  };

  window.__blockUnityExternalEval = function (value) {
    return String(value || "").indexOf("poki.com/sitelock") !== -1;
  };

  if (!window.WebAssembly ||
      typeof window.WebAssembly.Table !== "function" ||
      window.__miamiWasmTablePatchInstalled) {
    return;
  }

  var OriginalTable = window.WebAssembly.Table;
  function PatchedTable(descriptor) {
    if (descriptor && typeof descriptor.initial === "number") {
      descriptor = Object.assign({}, descriptor, {
        initial: Math.max(descriptor.initial, expectedTableSize)
      });
      if (typeof descriptor.maximum === "number") {
        descriptor.maximum = Math.max(descriptor.maximum, expectedTableSize);
      }
    }
    return new OriginalTable(descriptor);
  }

  PatchedTable.prototype = OriginalTable.prototype;
  window.WebAssembly.Table = PatchedTable;
  window.__miamiWasmTablePatchInstalled = true;
})();
