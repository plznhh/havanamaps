(function () {
  "use strict";

  var scope = window.HAVANA_SAVE_SCOPE || "havanamaps";
  var fixVersion = "startup-fix-v2";
  var resetKey = scope + ":" + fixVersion;
  var installKeys = ["save_injection_count", "save_version", "save_toast_shown"];

  if (localStorage.getItem(resetKey) !== "1") {
    installKeys.forEach(function (key) {
      localStorage.removeItem(key);
      localStorage.removeItem(scope + ":" + key);
    });
    localStorage.setItem(resetKey, "1");
  }

  var values = {
    ageRestrictionInputVersion: "1",
    ageRestrictionInputMonth: "12",
    ageRestrictionInputYear: "1999",
    isFreshInstall: "0",
    hasUserRunAppBefore: "1",
    isTutorialCompleted: "1",
    hasSeenFrontScreenFirstTime: "1",
    hasShownCollectPopup: "1",
    hasShownFacebookPopup: "1",
    hasShownHoverboardPopup: "1",
    hasShownMissionIntroPopup: "1",
    hasShownEndGameMissionPopup: "1",
    shouldShowCollectPopup: "0",
    shouldShowFacebookPopup: "0",
    shouldShowHoverboardPopup: "0",
    shouldShowMissionIntroductionPopup: "0",
    shouldShowEndGameMissionPopup: "0"
  };

  var prefixes = [
    "",
    "Unity.",
    "Unity.Kiloo Games.Subway Surfers.",
    "Unity.KilooGames.SubwaySurfers.",
    "Kiloo Games.Subway Surfers.",
    "Subway Surfers."
  ];

  Object.keys(values).forEach(function (key) {
    prefixes.forEach(function (prefix) {
      try {
        localStorage.setItem(prefix + key, values[key]);
      } catch (_) {
      }
    });
  });
})();
