require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const userRouter = require("./Routes/user.js");
const playngoRouter = require("./Routes/playngo.js");

// Middlware 
app.use(
  cors({
      origin: "*",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(express.json())
// connecting to the database 
mongoose.connect('mongodb+srv://kurdgames90:mustafa2006@mernapp.parznep.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
app.listen(4000, () => {
  console.log("connected to db & Server is runing on port 4000");
});

}). catch(error => {
  console.log(error.message)
})


app.get("/api", (req, res) => {
  const data = {
    hasMysteryJackpot: false,
    multipleFreegamesPerGamesession: false,
    hasGuaranteedJackpot: false,
    jackpots: null,
    disableSwipeToFullscreenPortraitIos: false,
    disableSwipeToFullscreenLandscapeIos: false,
    disableSwipeToFullscreenIos: false,
    swipeToHideIosBlacklist: "{15}",
    defaultHyperSpin: false,
    disableHyperSpin: true,
    disableVideoActivationScreen: false,
    alwaysShowDecimals: false,
    useExternalBalanceOnly: false,
    disableScrollToFullscreenMessage: false,
    bundleMode: 0,
    disableInGameModals: false,
    disableInGameFreeGamesModals: false,
    disableFastplay: false,
    unsupportedDeviceMessage:
      "This game is currently not supported by your device.",
    jackpotNotifications: true,
    bgColor: "green",
    hideExit: true,
    hideHelp: false,
    hideHistory: false,
    hideFastplay: false,
    hideLobby: true,
    hideSound: false,
    hideAutoAdjustBet: false,
    hideSpaceBarToSpin: false,
    disableHistory: false,
    disableHelp: false,
    disableSound: false,
    enforceRoundTime: false,
    spinLimitEnabled: false,
    spinLimitMode: 0,
    spinLimitInterval: 0,
    spinLimitExpectedSpinTime: 0,
    spinLimitMinCooloffTime: 0,
    spinLimitMaxCooloffTime: 0,
    spinLimitFixedCooloffTime: 0,
    spinLimitDisplayCooloff: 0,
    spinLimitDisplayIdleTimeCountdown: 0,
    spinLimitIdleTimeCountdownThreshold: 0,
    spinLimitRoundIdleTimeEnabled: false,
    spinLimitRoundIdleTimeTimerThreshold: 3000,
    regularSpinTime: 2500,
    minQuickRoundTime: -1,
    autoPlayResume: false,
    disableSpacebarToSpin: false,
    resourceLevel: -1,
    videoLevel: "-1",
    fps: 0,
    matchId: "",
    betMaxMode: 0,
    betMaxSpin: false,
    playForRealDelay: -1,
    renderer: "",
    disableExitInRound: false,
    cId: "",
    defaultFastPlay: false,
    defaultSpacebarToSpin: true,
    defaultSound: true,
    disableFastplayQuestion: false,
    disableVideo: "0",
    requiredPlatformFeatureSupport: "StencilBuffer,EnforceHardwareAcceleration",
    customDeviceBlockRegex: "",
    debug: false,
    debugAlert: false,
    fullScreenMode: true,
    defaultAutoAdjustBet: true,
    defaultAutoSpins: "50",
    limits: "",
    autoSpins: "10,20,50,75,100",
    cashierUrl: "",
    lobbyUrl: "",
    mobileGameHistoryUrl: "/CasinoHistoryMobile",
    gameModules:
      '{"bundleconfig":{"script":"","resource":"resources/games/videoslot/legacyofdead/config_${CHANNEL}.json"}, "featurepreview":{"script":"","resource":"resources/games/videoslot/legacyofdead/featurepreview_bundle.json"}, "game":{"script":"","resource":"resources/games/videoslot/legacyofdead/game_bundle.json"}, "ui":{"script":"games/videoslot/legacyofdead/ui/desktop/legacyofdead_viewfactory.js","resource":"resources/games/videoslot/legacyofdead/ui_${CHANNEL}_bundle.json"}, "mysteryjackpot": {"script":"", "resource":"resources/games/videoslot/legacyofdead/mysteryjackpot_bundle.json"}}',
    useBrowserStorage: 0,
    showWinUpTo: true,
    showHelpInPaytable: false,
    isSocial: false,
    availableModules: [],
    uiVersion: "",
    gameURL: "games/videoslot/legacyofdead/legacyofdead_main.js",
    playForRealUrl: "",
    desktopGameHistoryUrl: "/CasinoHistory",
    hasInGameJackpots: false,
    hasFreeInGameJackpots: false,
    enforceShowGameName: false,
    disableMobileBlurHandling: false,
    integrationErrorCodes:
      '{"IDS_IERR_UNKNOWN":"Internal error","IDS_IERR_UNKNOWNUSER":"User unknown","IDS_IERR_INTERNAL":"Internal error","IDS_IERR_INVALIDCURRENCY":"Unknown currency","IDS_IERR_WRONGUSERNAMEPASSWORD":"Unable to authenticate user","IDS_IERR_ACCOUNTLOCKED":"Account is locked","IDS_IERR_ACCOUNTDISABLED":"Account is disabled","IDS_IERR_NOTENOUGHMONEY":"There isn\'t enough funds on the account","IDS_IERR_MAXCONCURRENTCALLS":"The system is currently under heavy load. Please try again later","IDS_IERR_SPENDINGBUDGETEXCEEDED":"Your spending budget has been reached.","IDS_IERR_SESSIONEXPIRED":"Session has expired. Please restart the game","IDS_IERR_TIMEBUDGETEXCEEDED":"Your time budget has been reached","IDS_IERR_SERVICEUNAVAILABLE":"The system is temporarily unavailable. Please try again later","IDS_IERR_INVALIDIPLOCATION":"You are logging in from a restricted location. Your login has been denied.","IDS_IERR_USERISUNDERAGE":"You are blocked from playing these games due to being underage. If you have any questions please contact your customer support","IDS_IERR_SESSIONLIMITEXCEEDED":"Your session limit has been reached. Please exit the game and start a new game session to continue playing."}',
    winValuesUrl:
      "https://asccw.playngonetwork.com//Configuration/GetWinValues",
    autoplayReset: false,
    autoplayLimits: false,
    settings:
      "&settings=%3croot%3e%3csettings%3e%3cDenominations%3e%3cdenom+Value%3d%220.01%22+%2f%3e%3cdenom+Value%3d%220.02%22+%2f%3e%3cdenom+Value%3d%220.03%22+%2f%3e%3cdenom+Value%3d%220.04%22+%2f%3e%3cdenom+Value%3d%220.05%22+%2f%3e%3cdenom+Value%3d%220.1%22+%2f%3e%3cdenom+Value%3d%220.2%22+%2f%3e%3cdenom+Value%3d%220.5%22+%2f%3e%3cdenom+Value%3d%221%22+%2f%3e%3cdenom+Value%3d%222%22+%2f%3e%3c%2fDenominations%3e%3c%2fsettings%3e%3c%2froot%3e",
    // resourceRoot: "https://cdn.playngonetwork.com/8.1.3-legacyofdead.325/",
    resourceRoot:
      "http://localhost:3000/asset/Playngo/LegacyOfDead/playngoCdn/7.0.0-legacyofdead.260/",
    showSplash: true,
    showPoweredBy: true,
    historyFilterGame: false,
    loaderMessage: "",
    loaderMinShowDuration: 0,
    realityCheck: "",
    hasJackpots: false,
    helpUrl:
      "/casino/gamehelp?pid=2&gameid=416&lang=en_US&brand=&jurisdiction=&context=&channel=desktop",
    showClientVersionInHelp: false,
    showFFGamesVersionInHelp: false,
    disableAutoplay: false,
    enforceAutoplayStopAtFreeSpins: false,
    enforceAutoplayStopAtBonus: false,
    betLossPresentation: false,
    waterMark: false,
    displayClock: false,
    disableSpinOnPaytable: false,
    useServerTime: false,
    rCmga: 0,
    minRoundTime: -1,
    detailedFreegameMessage: false,
    minSpinningTime: "",
    creditDisplay: 0,
    defaultCreditDisplay: 0,
    supportedCreditDisplays: "0,1,2,3,4",
    pingIncreaseInterval: 0,
    minPingTime: 0,
    maxPingTime: null,
    baccaratHistory: 7,
    gameRoundBalanceCheck: false,
    quickStopEnabled: true,
    neverGamble: false,
    autoHold: false,
    denom: "20",
    brand: "common",
    defaultLimit: 1,
    freeGameEndLogout: false,
    lines: 10,
    mjDemoText: "",
    mjsupportmessage: "",
    mjcongratulations: ";",
    mjprizes: ",,,",
    mjnames: "Mini,Minor,Major,Grand",
    freeSpinLimit: 0,
    disableVoiceovers: false,
  };
  res.json(data);
});

app.use("/api/user", userRouter);
app.use("/api/Playngo", playngoRouter);

