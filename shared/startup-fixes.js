(function () {
  "use strict";

  var scope = window.HAVANA_SAVE_SCOPE || "havanamaps";
  var fixVersion = "startup-fix-v10";
  var resetKey = scope + ":" + fixVersion;
  var installKeys = ["save_injection_count", "save_version", "save_toast_shown"];

  if (localStorage.getItem(resetKey) !== "1") {
    installKeys.forEach(function (key) {
      localStorage.removeItem(key);
      localStorage.removeItem(scope + ":" + key);
    });
    localStorage.removeItem(scope + ":save_preinstall_v9");
    localStorage.removeItem(scope + ":save_preinstall_v10");
    localStorage.removeItem(scope + ":save_preinstall_v11");
    localStorage.removeItem(scope + ":save_preinstall_v12");
    localStorage.removeItem(scope + ":save_preinstall_v13");
    localStorage.removeItem(scope + ":save_preinstall_v14");
    localStorage.setItem(resetKey, "1");
  }

  var values = {
    ageRestrictionInputVersion: "9999",
    ageRestrictionInputMonth: "1",
    ageRestrictionInputYear: "2015",
    AgeRestrictionInputVersion: "9999",
    AgeRestrictionInputMonth: "1",
    AgeRestrictionInputYear: "2015",
    behavioralAdsAllowed: "0",
    BehavioralAdsAllowed: "0",
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
    shouldShowMissionIntroPopup: "0",
    shouldShowMissionIntroductionPopup: "0",
    shouldShowEndGameMissionPopup: "0",
    tutorialCompleted: "1",
    TutorialCompleted: "1",
    HasShownMission1Popup: "1",
    HasShownMission2Popup: "1",
    ShouldShowMission1Popup: "0",
    ShouldShowMission2Popup: "0"
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
