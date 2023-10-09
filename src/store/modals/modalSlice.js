import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    authOpen: false,
    authModalForm: "login",
    fairnessOpen: false,
    fairnessGame: "",
    userMenu: false,
    chatOpen: false,
    passwordOpen: false,
    twoFaOpen: false,
    walletOpen: false,
    betOpen: false,
    betModalId: null,
    userOpen: false,
    userModalId: null,
  },
  reducers: {
    setAuthOpen: (state, action) => {
      state.authOpen = action.payload;
    },
    setAuthModalForm: (state, action) => {
      state.authModalForm = action.payload;
    },
    setFairnessOpen: (state, action) => {
      state.fairnessOpen = action.payload.status;
      state.fairnessGame = action.payload.game;
    },
    setUserMenuOpen: (state, action) => {
      state.userMenu = action.payload;
    },
    setChatOpen: (state, action) => {
      state.chatOpen = action.payload;
    },
    setPasswordOpen: (state, action) => {
      state.passwordOpen = action.payload;
    },
    setTwoFaOpen: (state, action) => {
      state.twoFaOpen = action.payload;
    },
    setWalletOpen: (state, action) => {
      state.walletOpen = action.payload;
    },
    setBetOpen: (state, action) => {
      state.betOpen = action.payload;
    },
    setBetId: (state, action) => {
      state.betModalId = action.payload;
    },
    setUserOpen: (state, action) => {
      state.userOpen = action.payload;
    },
    setUserId: (state, action) => {
      state.userModalId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthOpen,
  setAuthModalForm,
  setFairnessOpen,
  setUserMenuOpen,
  setChatOpen,
  setPasswordOpen,
  setTwoFaOpen,
  setWalletOpen,
  setBetOpen,
  setBetId,
  setUserOpen,
  setUserId,
} = modalsSlice.actions;

export default modalsSlice.reducer;
