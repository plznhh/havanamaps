(function () {
  "use strict";

  var scope = window.HAVANA_SAVE_SCOPE;
  var keys = ["save_injection_count", "save_version", "save_toast_shown"];

  keys.forEach(function (key) {
    var scopedKey = scope + ":" + key;
    var value = localStorage.getItem(scopedKey);
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  });

  setInterval(function () {
    keys.forEach(function (key) {
      var value = localStorage.getItem(key);
      if (value !== null) {
        localStorage.setItem(scope + ":" + key, value);
      }
    });
  }, 250);
})();
