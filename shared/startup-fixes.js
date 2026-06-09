(function () {
  "use strict";

  var scope = window.HAVANA_SAVE_SCOPE || "havanamaps";
  var fixVersion = "startup-save-only-v12";
  var resetKey = scope + ":" + fixVersion;

  if (localStorage.getItem(resetKey) === "1") return;

  [
    "save_injection_count",
    "save_version",
    "save_toast_shown"
  ].forEach(function (key) {
    localStorage.removeItem(key);
    localStorage.removeItem(scope + ":" + key);
  });

  [
    "save_preinstall_v9",
    "save_preinstall_v10",
    "save_preinstall_v11",
    "save_preinstall_v12",
    "save_preinstall_v13",
    "save_preinstall_v14",
    "save_preinstall_v15",
    "save_preinstall_v16",
    "save_preinstall_v17",
    "save_preinstall_v18"
  ].forEach(function (key) {
    localStorage.removeItem(scope + ":" + key);
  });

  localStorage.setItem(resetKey, "1");
})();
