import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
  getClientSeed,
  getTokenApi,
  updateClientSeed,
} from "../../utils/functions";
import { setAddUserHistory, setPayloadSocket } from "../bets/betSlice";
import { authenticatedFail, setBalance } from "../users/userSlice";

export const crashSlice = createSlice({
  name: "crash",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    gameResult: null,
    isPlaying: false,
    win: null,
    amountBetGlobal: 0,
  },
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    hideAlerts: (state) => {
      state.errors = null;
      state.message = null;
    },
    setGameResult: (state, action) => {
      state.gameResult = action.payload;
      state.isLoading = false;
    },
    resetData: (state) => {
      state.amountBetGlobal = 0;
      state.win = null;
      state.gameResult = null;
      state.message = null;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setAmountBetGlobal: (state, action) => {
      state.amountBetGlobal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  setMessage,
  setError,
  hideAlerts,
  setGameResult,
  resetProfitLoss,
  setIsPlaying,
  setAmountBetGlobal,
  resetData,
} = crashSlice.actions;

export default crashSlice.reducer;

export const sendRequestCrash = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/crash", data);
        dispatch(setAmountBetGlobal(data.bet_amount));

        dispatch(setGameResult(response.data.data.result));

        dispatch(setMessage(response.data.message));
        if (
          response.data.message === "Lose" ||
          response.data.message === "Win"
        ) {
          dispatch(setIsPlaying(false));
          //Socket IO
          dispatch(setPayloadSocket(response.data.data.history));
          //End Socket IO
          dispatch(setAddUserHistory(response.data.data.history));
        } else {
          dispatch(setIsPlaying(true));
        }
        //Socket IO
        //dispatch(setPayloadSocket(response.data.data.history));
        //End Socket IO
        //dispatch(setAddUserHistory(response.data.data.history));
        dispatch(setBalance(response.data.data.result.balance));

        //if (parseFloat(response.data.data.history.profit) > 0) {
        //  dispatch(setProfit(Math.abs(response.data.data.history.profit)));
        //} else {
        //  dispatch(setLoss(Math.abs(response.data.data.history.profit)));
        //}
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
    //Update client seed
    updateClientSeed();
  };
};

export const sendTickGame = (id) => {
  return async (dispatch) => {
    //dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        //data.client_seed = getClientSeed();
        const response = await clientAxios.get("/api/games/crash/tick/" + id);

        dispatch(setGameResult(response.data.data.result));
        dispatch(setMessage(response.data.message));
        //console.log(response.data);
        if (
          response.data.message === "Lose" ||
          response.data.message === "Win"
        ) {
          dispatch(setIsPlaying(false));
          //Socket IO
          dispatch(setPayloadSocket(response.data.data.history));
          //End Socket IO
          dispatch(setAddUserHistory(response.data.data.history));
        }

        dispatch(setBalance(response.data.data.result.balance));

        //if (parseFloat(response.data.data.history.profit) > 0) {
        //  dispatch(setProfit(Math.abs(response.data.data.history.profit)));
        //} else {
        //  dispatch(setLoss(Math.abs(response.data.data.history.profit)));
        //}
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
    //Update client seed
    //updateClientSeed();
  };
};

export const sendCashoutGame = (id) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        //data.client_seed = getClientSeed();
        const response = await clientAxios.post("/api/games/crash/cashout", {
          id,
        });

        dispatch(setGameResult(response.data.data.result));
        dispatch(setMessage(response.data.message));
        if (
          response.data.message === "Lose" ||
          response.data.message === "Win"
        ) {
          dispatch(setIsPlaying(false));
          //Socket IO
          dispatch(setPayloadSocket(response.data.data.history));
          //End Socket IO
          dispatch(setAddUserHistory(response.data.data.history));
        }

        dispatch(setBalance(response.data.data.result.balance));

        //if (parseFloat(response.data.data.history.profit) > 0) {
        //  dispatch(setProfit(Math.abs(response.data.data.history.profit)));
        //} else {
        //  dispatch(setLoss(Math.abs(response.data.data.history.profit)));
        //}
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
    //Update client seed
    //updateClientSeed();
  };
};
