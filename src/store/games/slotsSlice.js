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

export const slotsSlice = createSlice({
  name: "cases",
  initialState: {
    errors: null,
    message: null,
    isLoading: false,
    isLoadingData: false,
    bet_amount: null,
    roll_numbers: [],
    amountProfit: 0,
    is_double_up_active: false,
    double_up_result: null,
    double_up_history: [],
    allHistory: [],
  },
  reducers: {
    sendRequest: (state) => {
      state.isLoading = true;
    },
    sendRequestData: (state) => {
      state.isLoadingData = true;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
    setBetAmount: (state, action) => {
      state.bet_amount = action.payload;
    },
    setRollNumbers: (state, action) => {
      let rollNumbers = action.payload.roll_numbers;
      if (rollNumbers === null) rollNumbers = [];
      state.roll_numbers = [...rollNumbers];
      state.isLoadingData = false;
    },
    setDoubleUpActive: (state, action) => {
      state.is_double_up_active = action.payload;
    },
    setDoubleUpResult: (state, action) => {
        let doubleUpResult = action.payload.double_up_result;
        if (doubleUpResult === null) doubleUpResult = [];
        state.double_up_result = [...doubleUpResult];
        state.isLoadingData = false;
    },
    setDoubleUpHistory: (state, action) => {
      let doubleUpHistory = action.payload.double_up_history;
      if (doubleUpHistory === null) doubleUpHistory = [];
      state.double_up_history = [...doubleUpHistory];
      state.isLoadingData = false;
    },
    setProfit: (state, action) => {
      state.amountProfit = state.amountProfit + action.payload;
    },
    resetDoubleUpHistory: (state) => {
      state.double_up_history = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sendRequest,
  sendRequestData,
  setIsLoading,
  setMessage,
  setError,
  hideAlerts,
  setBetAmount,
  setDoubleUpActive,
  setRollNumbers,
  setDoubleUpResult,
  setDoubleUpHistory,
  setProfit,
  resetDoubleUpHistory,
} = slotsSlice.actions;

export default slotsSlice.reducer;

export const sendRequestSlotsProbe = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        let client_seed = getClientSeed();
        data.client_seed = client_seed;
        const response = await clientAxios.get(
          "/api/games/slots/", data
        );

        dispatch(setRollNumbers(response.data.data.result));
        dispatch(setDoubleUpHistory(response.data.data.double_up));
        dispatch(setDoubleUpActive(response.data.data.is_playing));

        //dispatch(setNewHistoryCard(response.data.data.result));

        if (response.data.data.bet_amount !== null) {
          dispatch(setBetAmount(response.data.data.bet_amount));
        }
        if (response.data.data.profit !== null) {
          dispatch(setProfit(response.data.data.profit));
        }
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};

export const startSlotGame = (data) => {
  return async (dispatch) => {
    dispatch(sendRequest());
    const token = getTokenApi();
    try {
      if (!token) {
        dispatch(authenticatedFail());
      } else {
        tokenAuth(token);
        data.client_seed = getClientSeed();
        const response = await clientAxios.post(
          "/api/games/slots/startgame",
          data
        );

        dispatch(setBalance(response.data.data.balance));
        dispatch(setIsLoading(false));
        dispatch(setRollNumbers(response.data.data.result));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message));
      //Hide alert after 3 seconds
      setTimeout(() => {
        dispatch(hideAlerts());
      }, 3000);
    }
  };
};
