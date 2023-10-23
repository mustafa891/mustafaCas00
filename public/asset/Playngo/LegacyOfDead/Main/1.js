var Asccw_url = "/asset/Playngo/LegacyOfDead/playngoAsccw";
var site_url = "http://localhost:4000/api";
var tempValue = 2500000;
var originalValue = 0;
var changingValue = 0;
var nomoney = false;
var moneyMessage = false;
var freespinFlg = 0;
var freespinFlg1 = 0;
var freespinMoney = 0;
var gameName = "LegacyOfDead";
var saveData = "";
var freespinFlg2 = false;
var PngPreloader = {
  progressBar: null,
  wrapper: null,
  background: null,
  spinnerWrapper: null,
  reconnectText: null,
  loaderMessageText: null,
  loaderMessage: null,

  showLoaderMessageImplementation: function () {},
  onProgressImplementation: function () {},
  initImplementation: function () {},
  setSplasModeImplementation: function () {},
  onCompleteImplementation: function () {},
  showReconnectInfoImplementation: function () {},
  onLoaderStartImplementation: function () {},
  onSplashShowImplementation: function () {},
  loaderMinShowDuration: 0,
  loaderStartLoadStamp: null,

  init: function () {
    this.wrapper = document.getElementById("pngPreloaderWrapper");
    this.background = document.getElementById("pngPreloaderBG");
    this.reconnectText = document.getElementById("pngReconnectText");
    this.loaderMessage = document.getElementById("pngLoaderMessage");
    var cssPath =
      Asccw_url +
      "/Content/css/preloader/preloader?v=mwkf9h8L--BP7RhC3gPsOK0KwIHwP4bEalzVqW27Vm01";
    this.loadCss(cssPath);

    this.initImplementation();
    this.setupPreventDefaultEvents();
  },

  setLoaderMessage: function (loaderMessage) {

    // get user balance from db
      const token = localStorage.getItem("access_token"); 
      $.ajax({
              url: site_url + '/user/balance',
              data: {
              'method': 'get_balance',
            },
            headers : {
               'authorization' : `Bearer ${token}`,
            },
            type: 'POST',
            success: function (data) {
            const balance = data.data.balance
            originalValue = changingValue = 0
        }
      });

    this.loaderMessageText = loaderMessage;
    this.showLoaderMessage();
  },
  setLoaderMinShowDuration: function (loaderMinShowDuration) {
    this.loaderMinShowDuration = loaderMinShowDuration;
  },

  showLoaderMessage: function () {
    this.showLoaderMessageImplementation();
    if (this.loaderMessage !== "") {
      this.loaderMessage.textContent = this.loaderMessageText;
      this.loaderMessage.classList.remove("pngRemove");
      this.loaderMessage.classList.add("pngShow");
    }
  },

  onProgress: function (progress) {
    this.onProgressImplementation(progress);
  },

  setSplashMode: function (splashMode) {
    this.splashMode = splashMode;
  },

  onComplete: function () {
    this.onCompleteImplementation();
  },

  showReconnectInfo: function () {
    this.showReconnectInfoImplementation();
    this.reconnectText.textContent = "Please Wait - Resuming";
    this.reconnectText.classList.remove("pngHide");
    this.reconnectText.classList.add("pngFadeInInstant");
    this.loaderMessage.classList.remove("pngShow");
    this.loaderMessage.classList.add("pngFadeOutQuick");
    this.showBackground();
  },

  showBackground: function () {
    this.background.classList.add("pngNoOpacity");
    this.background.classList.add("pngFadeInInstant");
  },

  hideReconnectInfo: function () {
    if (this.hideReconnectInfoImplementation) {
      this.hideReconnectInfoImplementation();
    }
    this.reconnectText.classList.remove("pngFadeInSlow");
    this.reconnectText.classList.add("pngRemove");
  },

  onReconnectEnd: function () {
    this.hideReconnectInfo();
  },

  onReconnectStart: function () {
    var remainingDisplayTime = this.getRemainingDisplayTime();
    if (remainingDisplayTime && remainingDisplayTime > 0) {
      setTimeout(
        function () {
          if (this.wrapper != null) this.showReconnectInfo();
        }.bind(this),
        remainingDisplayTime
      );
    } else {
      if (this.wrapper != null) this.showReconnectInfo();
    }
  },

  onLoaderStart: function () {
    if (this.loaderMinShowDuration !== null && this.loaderMinShowDuration > 0)
      this.loaderStartLoadStamp = new Date();

    this.onLoaderStartImplementation();
  },

  getRemainingDisplayTime: function () {
    if (
      this.loaderStartLoadStamp === null ||
      this.loaderMinShowDuration === null ||
      this.loaderMinShowDuration <= 0
    )
      return 0;

    // Calculate elapsed time since onLoaderStart
    var elapsedTimeSinceStartLoad = new Date() - this.loaderStartLoadStamp;
    if (elapsedTimeSinceStartLoad >= this.loaderMinShowDuration) return 0;

    return this.loaderMinShowDuration - elapsedTimeSinceStartLoad;
  },

  destroy: function () {
    if (this.wrapper != null) {
      this.wrapper.parentElement.removeChild(this.wrapper);
      this.removePreventDefaultEvents();
    }
    this.wrapper = null;
  },

  onSplashShow: function () {
    this.removePreventDefaultEvents();
    this.onSplashShowImplementation();
    this.background.classList.add("pngFadeOutSlow");
    this.removeLoaderMessage();
    this.wrapper.style.pointerEvents = "none";
  },

  onSplashShowAsync: function (callback) {
    var remainingDisplayTime = this.getRemainingDisplayTime();
    if (remainingDisplayTime && remainingDisplayTime > 0) {
      setTimeout(function () {
        callback();
      }, remainingDisplayTime);
    } else {
      callback();
    }
  },

  onSplashHide: function () {
    var remainingDisplayTime = this.getRemainingDisplayTime();
    if (remainingDisplayTime && remainingDisplayTime > 0) {
      setTimeout(
        function () {
          this.destroy();
        }.bind(this),
        remainingDisplayTime
      );
    } else {
      this.destroy();
    }
  },

  removeLoaderMessage: function () {
    if (this.loaderMessage !== "") {
      if (this.loaderMessage) {
        this.loaderMessage.classList.remove("pngShow");
        this.loaderMessage.classList.remove("pngFadeOutSlow2");
        this.loaderMessage.classList.add("pngRemove");
      }
    }
  },

  loadCss: function (path) {
    var cssfileref = document.createElement("link");
    cssfileref.setAttribute("rel", "stylesheet");
    cssfileref.setAttribute("type", "text/css");
    cssfileref.setAttribute("href", path);
    document.head.appendChild(cssfileref);
  },

  setupPreventDefaultEvents: function () {
    document.documentElement.addEventListener(
      "touchstart",
      this.preventDefaultFunction
    );
    document.documentElement.addEventListener(
      "touchmove",
      this.preventDefaultFunction
    );
  },

  removePreventDefaultEvents: function () {
    document.documentElement.removeEventListener(
      "touchstart",
      this.preventDefaultFunction
    );
    document.documentElement.removeEventListener(
      "touchmove",
      this.preventDefaultFunction
    );
  },

  preventDefaultFunction: function (e) {
    e.preventDefault();
  },

  onLauncherMessage: function (display) {
    if (display) {
      this.showSpinner(false);
      document.documentElement.removeEventListener(
        "touchstart",
        this.preventDefaultFunction
      );
    } else {
      this.showSpinner(true);
      document.documentElement.addEventListener(
        "touchstart",
        this.preventDefaultFunction
      );
    }
  },

  showSpinner: function (display) {
    if (display) {
      this.spinnerWrapper.classList.remove("pngFadeOutQuick");
      this.spinnerWrapper.classList.add("pngShow");
    } else {
      this.spinnerWrapper.classList.remove("pngShow");
      this.spinnerWrapper.classList.add("pngFadeOutQuick");
    }
  },
};

PngPreloader.initImplementation = function () {
  this.logoWrapper = document.getElementById("pngLogoWrapper");
  this.spinnerWrapper = document.getElementById("pngSpinnerWrapper");
  this.progressBar = document.getElementById("pngProgressBar");
  this.progressContainer = document.getElementById("pngProgressContainer");
  var cssPath =
    Asccw_url +
    "/Content/css/preloader/pngpreloader?v=2cWCqosHzwc1eYMTgN7Kyzk_7eE7RyspMRXRnys7Ju81";

  if ("True" === "False") {
    this.logoWrapper.classList.add("pngHide");
  }

  this.loadCss(cssPath);
};
PngPreloader.onLoaderStartImplementation = function () {
  this.progressContainer.classList.remove("pngHide");
};
PngPreloader.onProgressImplementation = function (progress) {
  var val = progress * 100;
  if (val !== NaN && val !== 0) {
    if (val > this.progressBar.attributes.rawvalue.value) {
      this.progressBar.style.width = val + "%";
      this.progressBar.attributes.rawvalue.value = val;
    }
  }
};
PngPreloader.showReconnectInfoImplementation = function () {
  this.progressBar.attributes.rawvalue.value = 0;
  this.progressBar.classList.remove("pngConnecting");
  this.progressBar.classList.add("pngReconnect");
};
PngPreloader.hideReconnectInfoImplementation = function () {
  this.progressContainer.classList.add("pngRemove");
};
PngPreloader.onSplashShowImplementation = function () {
  this.showSpinner(false);
};

PngPreloader.init();

GameLauncher = {
  loadGame: function () {
    var src =
      Asccw_url +
      "/Casino/GameLoader?div=pngCasinoGame&pid=2&gid=legacyofdead&lang=en_US&practice=1&demo=2&width=100%&height=100%&isbally=False&fullscreenmode=False&rccurrentsessiontime=0&rcintervaltime=0&autoplaylimits=0&autoplayreset=0&channel=desktop&callback=flashCallback&coreWebUrl=https://asccw.playngonetwork.com/&resourcelevel=0&hasJackpots=False&defaultsound=False&showPoweredBy=True";
    var script = document.createElement("script");
    script.setAttribute("src", src);
    document.head.appendChild(script);
  },
};

GameLauncher.loadGame();

