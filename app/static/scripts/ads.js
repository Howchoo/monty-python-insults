var Ads = (function() {

  var googleSlots = [],
    mobileWidth = 728,
    mobileAds = false,
    slotConfig = {
      leaderboard: ["/59049904/MPI_Home_Header", [728, 90], "leaderboard"],
      mobileLeaderboard: ["/59049904/MPI_Home_Header_Mobile", [320, 50], "mobileLeaderboard"],
    };

  function setPlatform() {
    if ($(window).width() < mobileWidth) {
      mobileAds = true;
      configureMobile();
    } else {
      mobileAds = false;
      configureDesktop();
    }
  }

  function checkPlatformChange() {
    if (!mobileAds && $(window).width() < mobileWidth) {
      mobileAds = true;
      configureMobile();
    } else if (mobileAds && $(window).width() >= mobileWidth) {
      mobileAds = false;
      configureDesktop();
    }
  }

  function onResize() {
    checkPlatformChange();
  }

  function configureMobile() {
    $("#leaderboard").hide();
    $("#mobileLeaderboard").show();

    if (!googleSlots['mobileLeaderboard']) {
      defineSlotByType('mobileLeaderboard');
    }

    refresh(['mobileLeaderboard']);
  }

  function configureDesktop() {
    $("#leaderboard").show();
    $("#mobileLeaderboard").hide();

    if (!googleSlots['leaderboard']) {
      defineSlotByType('leaderboard', true);
    }

    refresh(['leaderboard']);
  }

  function setListeners() {
    $(window).resize(onResize);
  }

  function defineSlotByType(type, display) {
    if (!slotConfig[type]) throw "slot config doesn't exist " + type;
    defineSlot(slotConfig[type], display);
  }

  function defineSlot(conf, display) {
    var adUnitPath = conf[0],
      size = conf[1],
      id = conf[2];
    if (typeof googletag !== 'undefined') {
      googletag.cmd.push(function() {
        googleSlots[id] = googletag.defineSlot(adUnitPath, size, id).addService(googletag.pubads());
        if (display) googletag.display(id);
      });
    }
  }

  /**
   * Refresh slots by id.
   *
   * @param array slotArray - ['leaderboard']
   */
  function refresh(slotArray) {
    var slotObjArray = [];

    for (var i=0; i<slotArray.length; i++) {
      if (googleSlots[slotArray[i]]) {
        slotObjArray.push(googleSlots[slotArray[i]]);
      }
    }

    if (slotObjArray.length) {
      googletag.pubads().refresh(slotObjArray);
    }
  }

  return {
    init: function() {
      setPlatform();
      setListeners();
    }
  }

})();
