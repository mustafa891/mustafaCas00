import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chats/chatSlice";
import fairnessSlice from "./fairness/fairnessSlice";
import faucetSlice from "./games/faucetSlice";
import diceSlice from "./games/diceSlice";
import rouletteSlice from "./games/rouletteSlice";
import limboSlice from "./games/limboSlice";
import hiloSlice from "./games/hiloSlice";
import modalSlice from "./modals/modalSlice";
import usersSlice from "./users/userSlice";
import betsSlice from "./bets/betSlice";
import affiliateSlice from "./affiliates/affiliateSlice";
import supportSlice from "./support/supportSlice";
import walletSlice from "./wallet/walletSlice";
import settingSlice from "./settings/settingSlice";
import crashSlice from "./games/crashSlice";
import casesSlice from "./games/casesSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    modals: modalSlice,
    chats: chatSlice,
    faucet: faucetSlice,
    cases: casesSlice,
    dice: diceSlice,
    roulette: rouletteSlice,
    limbo: limboSlice,
    hilo: hiloSlice,
    crash: crashSlice,
    fairness: fairnessSlice,
    bets: betsSlice,
    affiliates: affiliateSlice,
    support: supportSlice,
    wallet: walletSlice,
    settings: settingSlice,
  },
});
